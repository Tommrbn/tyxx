(() => {
  const config = window.TYXX_CONFIG;
  if (config && /^\d{8,15}$/.test(config.whatsappNumber)) {
    document.querySelectorAll("[data-contact]").forEach((link) => {
      const service = link.dataset.service;
      const message = service
        ? `Hola, Tomás. Quiero consultar por ${service} para mi negocio.\n\nMi negocio es: \nMe gustaría mejorar: `
        : config.whatsappMessage;
      link.href = `https://wa.me/${config.whatsappNumber}?text=${encodeURIComponent(message)}`;
      link.target = "_blank";
      link.rel = "noopener noreferrer";
    });
  }
  document.querySelectorAll("[data-demo]").forEach((link) => {
    if (config?.demoUrl) link.href = config.demoUrl;
  });
  document.querySelectorAll("[data-year]").forEach((element) => {
    element.textContent = String(new Date().getFullYear());
  });
  const toggle = document.querySelector(".menu-toggle");
  const navigation = document.querySelector("#mobile-nav");
  if (toggle && navigation) {
    const closeMenu = () => {
      toggle.setAttribute("aria-expanded", "false");
      toggle.setAttribute("aria-label", "Abrir menú");
      navigation.hidden = true;
    };
    toggle.addEventListener("click", () => {
      const isOpen = toggle.getAttribute("aria-expanded") === "true";
      toggle.setAttribute("aria-expanded", String(!isOpen));
      toggle.setAttribute("aria-label", isOpen ? "Abrir menú" : "Cerrar menú");
      navigation.hidden = isOpen;
    });
    navigation
      .querySelectorAll("a")
      .forEach((link) => link.addEventListener("click", closeMenu));
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && !navigation.hidden) {
        closeMenu();
        toggle.focus();
      }
    });
    document.addEventListener("click", (event) => {
      if (
        !navigation.hidden &&
        !navigation.contains(event.target) &&
        !toggle.contains(event.target)
      )
        closeMenu();
    });
    matchMedia("(min-width: 761px)").addEventListener("change", (event) => {
      if (event.matches) closeMenu();
    });
  }
  const motionPreference = matchMedia("(prefers-reduced-motion: reduce)");
  if (!motionPreference.matches && "IntersectionObserver" in window) {
    const reveals = document.querySelectorAll(
      ".service-row, .portfolio-intro, .process-steps li, .about-statement",
    );
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08 },
    );
    reveals.forEach((element) => {
      element.classList.add("reveal-ready");
      observer.observe(element);
    });
    const showAll = () => {
      reveals.forEach((element) => element.classList.add("is-visible"));
      observer.disconnect();
    };
    motionPreference.addEventListener("change", (event) => {
      if (event.matches) showAll();
    });
    window.addEventListener("beforeprint", showAll);
  }
})();
