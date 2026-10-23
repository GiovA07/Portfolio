document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("projectsContainer");
  const filterContainer = document.getElementById("tagFilters");
  let allProjects = [];

  // Configuración de los botones de filtro con sus imágenes de Devicon
  const FILTERS = [
    { 
      id: "ALL", 
      label: "Todos", 
      icon: "" 
    },
    { 
      id: "Go", 
      label: "Go", 
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/go/go-original.svg" 
    },
    { 
      id: "C", 
      label: "C", 
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/c/c-original.svg" 
    },
    { 
      id: "Python", 
      label: "Python", 
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" 
    }
  ];

  fetch("./src/json/projects.json")
    .then(response => {
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      return response.json();
    })
    .then(projects => {
      allProjects = projects;
      renderFilters();
      renderProjects(allProjects);
    })
    .catch(err => {
      console.error("Error al cargar proyectos:", err);
      if (container) {
        container.innerHTML = "<p style='color: #f87171; text-align: center;'>Error al cargar los proyectos.</p>";
      }
    });

  function renderFilters() {
    if (!filterContainer) return;

    filterContainer.innerHTML = "";

    FILTERS.forEach(f => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = `filter-btn ${f.id === "ALL" ? "active" : ""}`;
      btn.dataset.tag = f.id;
      btn.setAttribute("aria-label", `Filtrar proyectos por ${f.label}`);

      const imgHtml = f.icon ? `<img src="${f.icon}" alt="" aria-hidden="true" class="filter-icon" />` : "";
      btn.innerHTML = `${imgHtml}<span>${f.label}</span>`;

      filterContainer.appendChild(btn);
    });

    filterContainer.addEventListener("click", (e) => {
      const btn = e.target.closest(".filter-btn");
      if (!btn) return;

      document.querySelectorAll(".filter-btn").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");

      const selectedTag = btn.dataset.tag;

      if (selectedTag === "ALL") {
        renderProjects(allProjects);
      } else {
        const filtered = allProjects.filter(p => {
          const projectTags = p.tags || [];
          return projectTags.some(t => t.toLowerCase() === selectedTag.toLowerCase());
        });
        renderProjects(filtered);
      }
    });
  }

 function renderProjects(projects) {
    if (!container) return;
    container.innerHTML = "";

    projects.forEach(project => {
      const card = document.createElement("article");
      card.className = "tarjeta-proyecto";

      const tagsHtml = (project.tags || []).map(tag => `<span class="etiqueta">${tag}</span>`).join("");

      let mediaHtml = "";
      if (project.image && project.image.trim() !== "") {
        mediaHtml = `
          <div class="proyecto-media">
            <img src="${project.image}" alt="${project.title || ''}" class="imagen-proyecto" loading="lazy">
          </div>
        `;
      }

      const topBadgeHtml = project.top_badge 
        ? `<div class="proyecto-top"><span class="etiqueta etiqueta-mono status-badge">${project.top_badge}</span></div>` 
        : '';

      // Botón de GitHub actualizado con ícono SVG integrado
      const githubLinkHtml = project.github 
        ? `<a href="${project.github}" target="_blank" rel="noopener" class="tarjeta-link github-btn" style="display: inline-flex; align-items: center; gap: 8px; text-decoration: none; font-weight: bold;">
          <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg" class="social-icon filter-white" alt="" aria-hidden="true" />
            Ver código
           </a>` 
        : '';

      card.innerHTML = `
        ${mediaHtml}
        <div class="proyecto-body">
          ${topBadgeHtml}
          <h3>${project.title || ''}</h3>
          <p>${project.description || ''}</p>
          <div class="etiquetas-fila">${tagsHtml}</div>
          <div style="margin-top: 15px;">${githubLinkHtml}</div>
        </div>
      `;

      container.appendChild(card);
    });
  }
});