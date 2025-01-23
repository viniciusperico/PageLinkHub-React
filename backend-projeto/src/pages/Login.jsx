import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import TelaLogin from "../assets/styles/Login.module.css";

function Login() {
  const [loginValue, setLoginValue] = useState("");
  const [senha, setSenha] = useState("");
  const [message, setMessage] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();
  const { login: authenticate } = useAuth(); // Função para autenticar o usuário

  useEffect(() => {
    // Adiciona a classe do body ao carregar a página
    document.body.classList.add(TelaLogin.body);

    // Remove a classe ao desmontar o componente
    return () => {
      document.body.classList.remove(TelaLogin.body);
    };
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const usuario = { login: loginValue, senha };
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
    <div className={TelaLogin.formContainer}>
      <h2>{isLogin ? "Login" : "Cadastro"}</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Usuário"
          value={loginValue}
          onChange={(e) => setLoginValue(e.target.value)}
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
  );
}

export default Login;
