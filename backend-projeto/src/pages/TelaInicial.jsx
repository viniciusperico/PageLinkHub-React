import React from "react";
import "../assets/styles/TelaInicial.module.css"
import produtoImage from '../assets/images/produto.png';
import home from "../assets/styles/TelaInicial.module.css";


function TelaInicial() {
  const handleSignup = async (e) => {
    e.preventDefault();
    const nome = e.target.nome.value;
    const email = e.target.email.value;

    try {
      alert(`Cadastro realizado com sucesso! Nome: ${nome}, Email: ${email}`);
    } catch (error) {
      alert("Erro ao cadastrar: " + error.message);
    }
  };

  return (
    <div>
      {/* Navbar */}
      <nav className={home.navbar}>
        <div className={home.container}>
          <h1 className={home.logo}>LinkHub</h1>
          <ul>
            <li><a href="#sobre">Sobre</a></li>
            <li><a href="#recursos">Recursos</a></li>
            <li>
              <a
                href="https://wa.me/5543998151440"
                className={home.btnmain}>
                Compre Agora
              </a>
            </li>
          </ul>
        </div>
      </nav>

      {/* Hero Section */}
      <header className={home.hero}>
        <div className={home.container}>
          <h1>
            Centralize seus links em um só lugar e compartilhe de forma prática!
          </h1>
          <p>
            Crie links personalizados de forma fácil e rápida. <br />
            Conecte todas as suas redes, portfólio e mais com um único link.
          </p>
          <a
            href="https://wa.me/5543998151440"
            className={home.btnhero}
          >
            Comece Agora
          </a>
        </div>
      </header>

      {/* Sobre o Produto */}
      <section id="sobre" className={home.section}>
        <div className={home.container}>
          <h2>Sobre o LinkHub</h2>
          <p>
            LinkHub é a plataforma ideal para concentrar e organizar todos os
            seus links em um só lugar. Com LinkHub, você aumenta a visibilidade
            das suas páginas e facilita o acesso aos seus conteúdos em redes
            sociais e outros sites.
          </p>
          <br></br>
          <img
      src={produtoImage}
      alt="Imagem de destaque do produto"
      className={home.heroimage}
      width="250px"
          />
        </div>
      </section>

      {/* Recursos */}
      <section id="recursos" className={(home.sectiondark, home.section)}>
        <div className={home.container}>
          <h2>Recursos do LinkHub</h2>
          <div className={home.features}>
            {[
              { title: "Navegação Inteligente", description: "Sistema sugere links e conteúdos com base nos mais acessados." },
              { title: "Links Agendados", description: "Agende links para serem enviados ou compartilhados em horários específicos." },
              { title: "Enquetes e Votações", description: "Crie enquetes interativas para coletar feedback de forma fácil." },
              { title: "Links com Senha", description: "Proteja conteúdos exclusivos com links que exigem senha para acesso." },
              { title: "Botões Chamativos", description: "Botões de ação que incentivam a compra com destaque visual." },
              { title: "Tela de Avisos", description: "Exiba notificações e avisos importantes." },
              { title: "Personalização", description: "Organize conteúdos com listas ou carrosséis interativos." },
              { title: "Variedade de Cores", description: "Escolha entre diferentes paletas de cores." },
            ].map((recurso, index) => (
              <div key={index} className={home.feature}>
                <h3>{recurso.title}</h3>
                <p>{recurso.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Formulário de Cadastro */}
      <section id="signup" className={home.signup}>
        <div className={home.container}>
          <h2>Cadastre-se e receba novidades!</h2>
          <form onSubmit={handleSignup} className={home.signupform}>
            <input type="text" name="nome" placeholder="Seu nome" required />
            <input type="email" name="email" placeholder="Seu e-mail" required />
            <button type="submit" className={home.btnaction}>Enviar</button>
          </form>
        </div>
      </section>

      {/* Call to Action */}
      <section id="comprar" className={(home.sectioncta, home.section)}>
        <div className={home.container}>
          <h2>Pronto para otimizar sua presença online?</h2>
          <p>
            Adquira o LinkHub e tenha todos os seus links organizados em um só
            lugar com elegância e eficiência.
          </p>
          <br></br>
          <br></br>
          <a
                href="https://wa.me/5543998151440"
                className={home.btnhero}>
                Compre Agora
              </a>
        </div>
      </section>

      {/* Footer */}
      <footer className={home.footer}>
        <div className={home.container}>
          <p>&copy; 2024 LinkHub - Todos os direitos reservados.</p>
          <a href="login">
            <img
              src="https://img.icons8.com/?size=30&id=F3EeBAdBwjRf&format=png&color=000000"
              className={home.adm}
              alt="Admin Icon"
            />
          </a>
        </div>
      </footer>
    </div>
  );
}

export default TelaInicial;
