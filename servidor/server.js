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

app.post("/api/salvar", async(req, res) => {
    const {login,senha} = req.body;
    if (!login || !senha){
        return res.status(400).json({message: "Login e senha são obrigatórios."})

    }
    try{
        const docRef = await db.collection("usuario").add({login, senha});
        res.status(200).json({
            message: "Dados salvos com sucesso!", 
            id: docRef.id,
        });
    } catch(error){
        res.status(500).json({message:"Erro ao salvar os dados."});
    }
});

const PORT = 3001;
app.listen(PORT, () => {
    console.log(`servidor rodando em http://localhost:${PORT}`);
});


