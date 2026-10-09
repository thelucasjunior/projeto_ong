(function () {
  "use strict";
  var so = function (v) { return v.replace(/\D/g, ""); };
  var mascaras = {
    cpf: function (v) {
      v = so(v).slice(0, 11);
      return v.replace(/(\d{3})(\d)/, "$1.$2").replace(/(\d{3})(\d)/, "$1.$2").replace(/(\d{3})(\d{1,2})$/, "$1-$2");
    },
    telefone: function (v) {
      v = so(v).slice(0, 11);
      if (v.length > 10) { return v.replace(/(\d{2})(\d{5})(\d{1,4})/, "($1) $2-$3"); }
      return v.replace(/(\d{2})(\d)/, "($1) $2").replace(/(\d{4})(\d{1,4})$/, "$1-$2");
    },
    cep: function (v) {
      return so(v).slice(0, 8).replace(/(\d{5})(\d{1,3})/, "$1-$2");
    }
  };
  document.querySelectorAll("[data-mask]").forEach(function (el) {
    el.addEventListener("input", function () {
      el.value = mascaras[el.dataset.mask](el.value);
    });
  });
  var form = document.getElementById("form-cadastro");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (form.checkValidity()) {
        document.getElementById("msg-ok").hidden = false;
        form.reset();
      } else { form.reportValidity(); }
    });
  }
})();

document.addEventListener("DOMContentLoaded", () => {
  
  const observerOptions = {
    threshold: 0.15
  };

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("revealed");
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);


  const elementsToAnimate = document.querySelectorAll(
    ".about-card, .project-card, .blog-card, .hero-content, .hero-image"
  );
  
  elementsToAnimate.forEach(el => {
    el.classList.add("hidden-element");
    revealObserver.observe(el);
  });

  /* ==========================================================
     FEEDBACK NO FORMULÁRIO DE CADASTRO
     ========================================================== */
  const customForm = document.querySelector(".custom-form");
  if (customForm) {
    customForm.addEventListener("submit", (e) => {
      e.preventDefault();
      
      const btnSubmit = customForm.querySelector("button[type='submit']");
      const originalText = btnSubmit.textContent;
      
      // Simula o envio
      btnSubmit.textContent = "Enviando cadastro...";
      btnSubmit.disabled = true;

      setTimeout(() => {
        alert("🎉 Cadastro realizado com sucesso! O Instituto Elo Verde agradece seu apoio.");
        customForm.reset();
        btnSubmit.textContent = originalText;
        btnSubmit.disabled = false;
      }, 1500);
    });
  }

  /* ==========================================================
    MENU DE NAVEGAÇÃO
     ========================================================== */
  const currentPage = window.location.pathname.split("/").pop();
  const navLinks = document.querySelectorAll(".nav-links a");

  navLinks.forEach(link => {
    const linkPage = link.getAttribute("href");
    if (linkPage === currentPage || (currentPage === "" && linkPage === "index.html")) {
      link.classList.add("active");
    }
  });

});