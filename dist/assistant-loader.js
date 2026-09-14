(() => {
  const fallback = document.querySelector("#assistant-fallback");
  import("./assistant-view.js")
    .then(({ mountAssistant }) => mountAssistant())
    .catch(() => {
      if (fallback) {
        fallback.hidden = false;
        fallback.firstChild.textContent =
          "No pudimos iniciar el asistente. Podés recargar para reintentar o ";
      }
      const workspace = document.querySelector("#assistant-workspace");
      if (workspace) workspace.hidden = true;
    });
})();
