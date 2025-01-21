import React from "react";
import "../assets/styles/TelaInicial.css"

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
      <nav className="navbar">
        <div className="container">
          <h1 className="logo">LinkHub</h1>
          <ul>
            <li><a href="#sobre">Sobre</a></li>
            <li><a href="#recursos">Recursos</a></li>
            <li><a href="#depoimentos">Depoimentos</a></li>
            <li>
              <a
                href="https://wa.me/5543998151440"
                className="btn-main"
              >
                Compre Agora
              </a>
            </li>
          </ul>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="hero">
        <div className="container">
          <h1>
            Centralize seus links em um só lugar e compartilhe de forma prática!
          </h1>
          <p>
            Crie links personalizados de forma fácil e rápida. <br />
            Conecte todas as suas redes, portfólio e mais com um único link.
          </p>
          <a
            href="https://wa.me/5543998151440"
            className="btn-hero"
          >
            Comece Agora
          </a>
        </div>
      </header>

      {/* Sobre o Produto */}
      <section id="sobre" className="section">
        <div className="container">
          <h2>Sobre o LinkHub</h2>
          <p>
            LinkHub é a plataforma ideal para concentrar e organizar todos os
            seus links em um só lugar. Com LinkHub, você aumenta a visibilidade
            das suas páginas e facilita o acesso aos seus conteúdos em redes
            sociais e outros sites.
          </p>
          <img
            src="assets/image/produto.png"
            alt="Imagem de destaque do produto"
            className="hero-image"
            width="250px"
          />
        </div>
      </section>

      {/* Recursos */}
      <section id="recursos" className="section section-dark">
        <div className="container">
          <h2>Recursos do LinkHub</h2>
          <div className="features">
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
              <div key={index} className="feature">
                <h3>{recurso.title}</h3>
                <p>{recurso.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Depoimentos */}
      <section id="depoimentos" className="section">
        <div className="container">
          <h2>O que nossos clientes dizem</h2>
          <div className="testimonials">
            <div className="testimonial">
              <p>Produto excelente!</p>
              <span>- Cliente 1</span>
            </div>
            <div className="testimonial">
              <p>Facilitou minha vida online.</p>
              <span>- Cliente 2</span>
            </div>
          </div>
        </div>
      </section>

      {/* Formulário de Cadastro */}
      <section id="signup" className="signup">
        <div className="container">
          <h2>Cadastre-se e receba novidades!</h2>
          <form onSubmit={handleSignup} className="signup-form">
            <input type="text" name="nome" placeholder="Seu nome" required />
            <input type="email" name="email" placeholder="Seu e-mail" required />
            <button type="submit" className="btn-action">Enviar</button>
          </form>
        </div>
      </section>

      {/* Call to Action */}
      <section id="comprar" className="section section-cta">
        <div className="container">
          <h2>Pronto para otimizar sua presença online?</h2>
          <p>
            Adquira o LinkHub e tenha todos os seus links organizados em um só
            lugar com elegância e eficiência.
          </p>
          <a
            href="https://wa.me/5543998151440"
            className="btn-hero"
          >
            Compre Agora
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <p>&copy; 2024 LinkHub - Todos os direitos reservados.</p>
          <a href="adm.html">
            <img
              src="https://img.icons8.com/?size=30&id=F3EeBAdBwjRf&format=png&color=000000"
              className="adm"
              alt="Admin Icon"
            />
          </a>
        </div>
      </footer>
    </div>
  );
}

export default TelaInicial;
