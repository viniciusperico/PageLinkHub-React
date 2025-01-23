const express = require("express");
const admin = require("firebase-admin");
const serviceAccount = require("./firebase-key.json");
const bodyParser = require("body-parser");
const cors = require("cors");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
});
const db = admin.firestore();

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.post("/api/salvar", async (req, res) => {
    const { login, senha } = req.body;

    if (!login || !senha) {
        return res.status(400).json({ message: "Login e senha são obrigatórios." });
    }

    try {
        const docRef = await db.collection("usuario").add({ login, senha });
        res.status(200).json({
            message: "Dados salvos com sucesso!",
            id: docRef.id,
        });
    } catch (error) {
        res.status(500).json({ message: "Erro ao salvar os dados." });
    }
});

app.post("/api/login", async (req, res) => {
    const { login, senha } = req.body;
    console.log("Recebendo requisição de login:", { login, senha }); 
    if (!login || !senha) {
        console.log("Erro: Login ou senha ausentes");
        return res.status(400).json({ message: "Login e senha são obrigatórios." });
    }

    try {
        const snapshot = await db.collection("usuario").where("login", "==", login).get();
        console.log("Consulta ao Firestore executada");

        if (snapshot.empty) {
            console.log("Erro: Usuário não encontrado");
            return res.status(404).json({ message: "Usuário não encontrado." });
        }

        let userFound = false;
        snapshot.forEach((doc) => {
            const user = doc.data();
            console.log("Verificando usuário:", user);
            if (user.senha === senha) {
                userFound = true;
            }
        });

        if (!userFound) {
            console.log("Erro: Senha incorreta");
            return res.status(401).json({ message: "Senha incorreta." });
        }

        console.log("Login realizado com sucesso");
        res.status(200).json({ message: "Login realizado com sucesso!" });
    } catch (error) {
        console.error("Erro ao fazer login:", error);
        res.status(500).json({ message: "Erro ao fazer login." });
    }
});


app.put("/api/atualizar", async (req, res) => {
    const { id, login, senha } = req.body;

    if (!id || !login || !senha) {
        return res.status(400).json({ message: "ID, login e senha são obrigatórios." });
    }

    try {
        const docRef = db.collection("usuario").doc(id);
        const doc = await docRef.get();

        if (!doc.exists) {
            return res.status(404).json({ message: "Usuário não encontrado." });
        }

        await docRef.update({ login, senha });
        res.status(200).json({ message: "Informações atualizadas com sucesso!" });
    } catch (error) {
        console.error("Erro ao atualizar informações:", error);
        res.status(500).json({ message: "Erro ao atualizar as informações." });
    }
});


app.get("/api/buscar/:id", async (req, res) => {
    const { id } = req.params;

    try {
        const doc = await db.collection("usuario").doc(id).get();

        if (!doc.exists) {
            return res.status(404).json({ message: "Usuário não encontrado." });
        }

        res.status(200).json(doc.data());
    } catch (error) {
        console.error("Erro ao buscar usuário:", error);
        res.status(500).json({ message: "Erro ao buscar usuário." });
    }
});

app.get("/api/buscarPorLogin/:login", async (req, res) => {
    const { login } = req.params;

    try {
        const snapshot = await db.collection("usuario").where("login", "==", login).get();

        if (snapshot.empty) {
            return res.status(404).json({ message: "Usuário não encontrado." });
        }

        const usuario = snapshot.docs[0].data(); 
        res.status(200).json({ id: snapshot.docs[0].id, ...usuario });  
    } catch (error) {
        console.error("Erro ao buscar usuário:", error);
        res.status(500).json({ message: "Erro ao buscar usuário." });
    }
});


const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
