import { useState, useEffect } from "react";
import editar from "../assets/styles/Editar.module.css";

function Editar() {
  const [loginBusca, setLoginBusca] = useState(""); // Login para busca
  const [id, setId] = useState(""); // ID do usuário encontrado
  const [login, setLogin] = useState(""); // Login do usuário encontrado
  const [senha, setSenha] = useState(""); // Senha do usuário encontrado
  const [message, setMessage] = useState(""); // Mensagem de feedback

  // Função para buscar um usuário pelo login
  const buscarUsuario = async () => {
    if (!loginBusca) {
      setMessage("Informe um login para buscar.");
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:3001/api/buscarPorLogin/${loginBusca}`
      );
      const data = await response.json();

      if (response.ok && data.id && data.login) {
        setId(data.id);
        setLogin(data.login);
        setSenha(data.senha || ""); // Prevenir senha nula
        setMessage(""); // Limpar a mensagem
      } else {
        setMessage(data.message || "Usuário não encontrado.");
      }
    } catch (error) {
      setMessage("Erro ao processar a requisição.");
    }
  };

  // Função para atualizar o usuário
  const atualizarUsuario = async (event) => {
    event.preventDefault();

    if (!login || !senha) {
      setMessage("Login e senha são obrigatórios.");
      return;
    }

    const usuario = { id, login, senha };

    try {
      const response = await fetch("http://localhost:3001/api/atualizar", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(usuario),
      });

      const data = await response.json();
      setMessage(data.message);
    } catch (error) {
      setMessage("Erro ao atualizar as informações.");
    }
  };

  useEffect(() => {
    // Adiciona a classe do body ao carregar a página
    document.body.classList.add(editar.body);

    // Remove a classe ao desmontar o componente
    return () => {
      document.body.classList.remove(editar.body);
    };
  }, []);

  return (
    <div className={editar.container}>
      <div className={editar.formContainer}>
        <h2>Editar Usuário</h2>

        {/* Campo de busca */}
        <div>
          <input
            type="text"
            placeholder="Digite o login do usuário"
            value={loginBusca}
            onChange={(e) => setLoginBusca(e.target.value)}
          />
          <button onClick={buscarUsuario}>Buscar</button>
        </div>

        {/* Formulário de edição */}
        {id && (
          <form onSubmit={atualizarUsuario}>
            <h3>Dados do Usuário</h3>
            <input
              type="text"
              placeholder="Novo Login"
              value={login}
              onChange={(e) => setLogin(e.target.value)}
            />
            <input
              type="password"
              placeholder="Nova Senha"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
            />
            <button type="submit">Atualizar</button>
          </form>
        )}

        {message && (
          <p
            className={
              message.includes("Erro") ? editar.message : editar.success
            }
          >
            {message}
          </p>
        )}
      </div>
    </div>
  );
}

export default Editar;
