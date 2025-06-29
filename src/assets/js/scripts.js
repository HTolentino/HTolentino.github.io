
// TEMA
function initTheme() {
  const toggleTheme = document.getElementById("toggleTheme");
  const rootHtml = document.documentElement;

  const savedTheme = localStorage.getItem("theme") || "dark";
  rootHtml.setAttribute("data-theme", savedTheme);

  if (savedTheme === "light") {
    toggleTheme.classList.remove("bi-sun");
    toggleTheme.classList.add("bi-moon-stars");
  } else {
    toggleTheme.classList.remove("bi-moon-stars");
    toggleTheme.classList.add("bi-sun");
  }

  function changeTheme() {
    const currentTheme = rootHtml.getAttribute("data-theme");
    const newTheme = currentTheme === "dark" ? "light" : "dark";

    rootHtml.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);

    toggleTheme.classList.toggle("bi-sun");
    toggleTheme.classList.toggle("bi-moon-stars");
  }

  toggleTheme.addEventListener("click", changeTheme);
}

// MENU
function initMenuLinks() {
  const menuLinks = document.querySelectorAll(".menu__link");

  menuLinks.forEach(item => {
    item.addEventListener("click", () => {
      menuLinks.forEach(i => i.classList.remove("active"));
      item.classList.add("active");
    });
  });
}

// ACCORDION
function initAccordion() {
  const accordionHeaders = document.querySelectorAll(".accordion__header");
  accordionHeaders.forEach(header => {
    header.addEventListener("click", () => {
      const accordionItem = header.parentElement;
      const accordionActive = accordionItem.classList.contains("active");
      accordionActive ? accordionItem.classList.remove("active") : accordionItem.classList.add("active");
    });
  });
}

// ADICIONANCO CONTEÚDOS DINÂMICAMENTE
function loadContent() {
  fetch('src/assets/data/content.json')
    .then(response => response.json())
    .then(data => {
      // PROJETOS
      const container = document.querySelector('.projects__container');
      data.projetos.forEach((projeto, index) => {
        const reverseClass = index % 2 !== 0 ? ' card--reverse' : '';

        const cardHTML = `
          <div class="projects__card${reverseClass}">
            <img class="card__cover" src="${projeto.imagem}" alt="Capa ${projeto.titulo}">
            <div class="card__body">
              <h3 class="card__title">${projeto.titulo}</h3>
              <p class="card__description">${projeto.descricao}</p>
              <ul class="card__list">
                ${projeto.itens.map(item => `<li class="card__item">${item}</li>`).join('')}
              </ul>
              <ul class="technologies__list">
                ${projeto.tecnologias.map(tec => `
                  <li class="technologies__item">
                    <img class="technologies__logo" src="src/assets/images/technologies/logo-${tec}.png" alt="Logo ${tec.toUpperCase()}">
                  </li>`).join('')}
              </ul>
              <div class="card__buttons">
                <a href="${projeto.preview}" target="_blank">
                  <button class="btn btn--primary">
                    <span>Prévia</span>
                    <i class="bi bi-arrow-up-right"></i>
                  </button>
                </a>
                <a href="${projeto.repositorio}" target="_blank">
                  <button class="btn">
                    <span>Repositório</span>
                  </button>
                </a>
              </div>
            </div>
          </div>`;
        container.insertAdjacentHTML('beforeend', cardHTML);
      });

      // CURSOS
      const accordion = document.getElementById('accordion');
      accordion.innerHTML = ''; // Limpa cursos estáticos

      data.cursos.forEach((curso, index) => {
        const activeClass = index === 0 ? ' active' : '';
        const headerClass = index === 0 ? ' start' : index === data.cursos.length - 1 ? ' end' : '';

        const cursoHTML = `
          <div class="accordion__item${activeClass}">
            <button class="accordion__header ${headerClass}">
              <span>${curso.titulo}</span>
              <i class="bi bi-caret-down-fill"></i>
            </button>
            <div class="accordion__body">
              <p>${curso.instituicao}. ${curso.data}. ${curso.duracao}.</p>
              <p>Competências: ${curso.competencias}</p>
            </div>
          </div>`;
        accordion.insertAdjacentHTML('beforeend', cursoHTML);
      });

      // Após adicionar dinamicamente, reativa o accordion
      initAccordion();
    })
    .catch(error => console.error('Erro ao carregar os projetos e cursos:', error));
}

// INICIALIZAÇÃO
document.addEventListener("DOMContentLoaded", () => {
  initTheme();
  initMenuLinks();
  initAccordion();
  loadContent();
});
