document.addEventListener("DOMContentLoaded", () => {
  // Actualizar año del copyright
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Menú Responsive
  const menuToggle = document.getElementById("menuToggle");
  const navList = document.getElementById("navList");

  if (menuToggle && navList) {
    menuToggle.addEventListener("click", () => {
      menuToggle.classList.toggle("active");
      navList.classList.toggle("active");
    });

    document.querySelectorAll(".nav-link").forEach(link => {
      link.addEventListener("click", () => {
        menuToggle.classList.remove("active");
        navList.classList.remove("active");
      });
    });
  }

  // Copiar Correo al Portapapeles
  const copyBtn = document.getElementById("copyEmailBtn");
  if (copyBtn) {
    copyBtn.addEventListener("click", () => {
      const email = "giovabuchieri@gmail.com";
      navigator.clipboard.writeText(email).then(() => {
        const originalText = copyBtn.innerText;
        copyBtn.innerText = "¡Copiado! ✓";
        copyBtn.style.borderColor = "var(--accent-cyan)";
        copyBtn.style.color = "var(--accent-cyan)";
        setTimeout(() => {
          copyBtn.innerText = originalText;
          copyBtn.style.borderColor = "";
          copyBtn.style.color = "";
        }, 2000);
      });
    });
  }
});