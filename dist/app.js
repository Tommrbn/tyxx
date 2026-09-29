(() => {
  const config = window.TYXX_CONFIG;
  if (config && /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(config.contactEmail)) {
    document.querySelectorAll("[data-email]").forEach((link) => {
      link.href = `mailto:${config.contactEmail}`;
      link.textContent = config.contactEmail;
    });
    document.querySelectorAll("[data-contact]").forEach((link) => {
      link.href = `mailto:${config.contactEmail}?subject=${encodeURIComponent(config.contactSubject)}&body=${encodeURIComponent(config.contactBody)}`;
      link.removeAttribute("target");
      link.removeAttribute("rel");
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
  const disclosure = document.querySelector("#assistant-disclosure");
  if (disclosure) {
    const openAssistant = () => {
      disclosure.open = true;
    };
    document.querySelectorAll('a[href="#asistente"]').forEach((link) => {
      link.addEventListener("click", openAssistant);
    });
    window.addEventListener("hashchange", () => {
      if (window.location.hash === "#asistente") openAssistant();
    });
    if (window.location.hash === "#asistente") openAssistant();
  }
})();
