import { useState } from 'react';
import './App.css'; 

function App() {
  const [login, setLogin] = useState("");
  const [senha, setSenha] = useState("");
  const [message, setMessage] = useState(""); 

  const salvar = async (event) => {
    event.preventDefault();
    
    const usuario = { login, senha };

    try {
      const response = await fetch("http://localhost:3001/api/salvar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(usuario),
      });

      const data = await response.json();
      setMessage(data.message); 
    } catch (error) {
      setMessage("Erro ao enviar os dados."); 
    }
  };

  return (
    <div className="container">
      <div className="formContainer">
        <h2>Login</h2>
        <form onSubmit={salvar}>
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
          <button type="submit">Enviar</button>
        </form>

        {message && <p>{message}</p>} {}
      </div>
    </div>
  );
}

export default App;
