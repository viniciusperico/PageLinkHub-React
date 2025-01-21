import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthProvider, useAuth } from "../contexts/AuthContext";
import "../assets/styles/Login.css";


function Login() {
  const [login, setLogin] = useState("");
  const [senha, setSenha] = useState("");
  const [message, setMessage] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();
  const { login: authenticate } = useAuth(); // Função para autenticar o usuário

  const handleSubmit = async (event) => {
    event.preventDefault();

    const usuario = { login, senha };
    const endpoint = isLogin ? "/api/login" : "/api/salvar";

    try {
      const response = await fetch(`http://localhost:3001${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(usuario),
      });

      const data = await response.json();

      if (isLogin && response.ok) {
        authenticate(); // Marca o usuário como autenticado
        navigate("/editar"); // Redireciona para a página de edição
      } else if (!isLogin) {
        setMessage(data.message);
      } else {
        setMessage(data.message || "Erro ao realizar login.");
      }
    } catch (error) {
      setMessage("Erro ao processar a requisição.");
    }
  };

  return (
    <div className="container">
      <div className="formContainer">
        <h2>{isLogin ? "Login" : "Cadastro"}</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Usuário"
            value={login}
            onChange={(e) => setLogin(e.target.value)}
          />
          <input
            type="password"
            placeholder="Senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
          />
          <button type="submit">{isLogin ? "Entrar" : "Cadastrar"}</button>
        </form>
        <button onClick={() => setIsLogin(!isLogin)}>
          {isLogin ? "Ainda não tem uma conta? Cadastre-se" : "Já tem uma conta? Faça login"}
        </button>
        {message && <p>{message}</p>}
      </div>
    </div>
  );
}

export default Login;
