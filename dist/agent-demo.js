// Local, illustrative answers only. No storage, network or real actions.
(() => {
  const dock = document.querySelector('#agent-dock');
  if (!dock) return;
  const panel = dock.querySelector('.agent-panel');
  const launch = dock.querySelector('#agent-launch');
  const close = dock.querySelector('#agent-close');
  const suggestions = dock.querySelector('#agent-suggestions');
  const history = dock.querySelector('#agent-history');
  const transcriptBody = dock.querySelector('.agent-transcript-body');
  const contact = dock.querySelector('.agent-actions a');
  const form = dock.querySelector('#agent-form');
  const input = dock.querySelector('#agent-question');
  const error = dock.querySelector('#agent-error');
  const reset = dock.querySelector('#agent-reset');
  const pendingStatus = dock.querySelector('#agent-pending');
  const submit = form.querySelector('[type="submit"]');
  const questions = ['¿Qué servicios ofrece TYXX?', '¿Cómo puede ayudar la IA a mi negocio?', '¿Cuánto cuesta un proyecto de IA?', '¿Cómo empezamos?', '¿En qué proyectos trabajaron?'];
  const facts = {
    services: 'TYXX evalúa agentes de IA, automatizaciones e integraciones, además de sistemas de IA a medida, según los objetivos del negocio. No todo proyecto necesita IA: primero hay que entender el proceso.',
    growth: 'La IA podría ayudar a atender consultas con más contexto, dar seguimiento a oportunidades y reducir tareas repetitivas. Primero evaluamos tu proceso y sus herramientas para decidir qué tiene sentido implementar; no se garantizan ventas ni ahorros.',
    guarantees: 'No se pueden garantizar ventas, crecimiento ni ahorros por usar IA. Evaluamos el alcance y los resultados que tendría sentido medir en cada negocio antes de proponer una solución.',
    budget: 'La consulta inicial con TYXX es sin cargo. El presupuesto se prepara a medida después de acordar el alcance: distingue implementación, herramientas externas y mantenimiento opcional. No hay un precio fijo para confirmar acá.',
    timing: 'El plazo depende del alcance acordado y las etapas del proyecto. TYXX no publica una fecha fija: primero hay que relevar la necesidad y definir los entregables.',
    process: 'Primero conversamos sin cargo para entender tu necesidad. Después TYXX releva el alcance, prepara una propuesta por proyecto y, si se acuerda avanzar, trabaja por etapas con documentación. El mantenimiento es opcional.',
    projects: 'Novartech es cliente de TYXX desde hace varios años: el trabajo informado incluye agentes de IA y visión por computadora para detectar armazones y lentes y obtener medidas para laboratorio. Eso no atribuye a TYXX la autoría de todo el sitio ni de todos los productos de Novartech. Vision Latina también es cliente: desarrollamos MYOPIALATAM (https://www.myopialatam.com/), un proyecto digital del Congreso Latinoamericano de Miopía; no es un caso de IA.',
    contact: 'Podés conversar directamente con TYXX desde la sección Contacto o escribir a tyxxsolve@gmail.com. Abrir el correo no envía automáticamente un mensaje ni reserva una reunión.',
    unknown: 'No tengo información confirmada para responder eso. ¿Qué necesidad concreta de tu negocio querés evaluar? Podés conversarlo directamente con TYXX desde Contacto.',
  };
  let turns = [];
  let pendingTimer = null;
  let pendingQuestion = null;
  function setPending(active) {
    form.setAttribute('aria-busy', String(active));
    input.readOnly = active;
    submit.setAttribute('aria-disabled', String(active));
    suggestions.querySelectorAll('button').forEach((button) => button.setAttribute('aria-disabled', String(active)));
    pendingStatus.hidden = !active;
  }
  const normalize = (text) => text.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
  const matches = (text, pattern) => pattern.test(text);
  function answer(question) {
    const text = normalize(question);
    const budget = matches(text, /\b(presupuesto|cotiz\w*|precio\w*|cost\w*|cuanto (sale|cuesta|cobran|vale)|inversion)\b/);
    const timing = matches(text, /\b(plazo\w*|tiempo|demora\w*|tarda\w*|fecha\w*|cuando (estaria|termina|entregan)|cuanto (tarda|tiempo))\b/);
    if (budget || timing) return [budget && facts.budget, timing && facts.timing].filter(Boolean).join(' ');
    if (matches(text, /\b(garantiz\w*|garantia\w*|asegur\w*|resultados? seguros?|ventas? seguras?|crecimiento seguro)\b/)) return facts.guarantees;
    if (matches(text, /\b(novartech|novar-tech|vision latina|myopialatam|miopia|cliente\w*|experiencia|proyectos? (anteriores|realizados|hicieron|trabajaron)|trabajos? (anteriores|realizados))\b/)) return facts.projects;
    if (matches(text, /\b(contact\w*|correo|email|mail|escrib\w*|hablar|comunic\w*)\b/)) return facts.contact;
    if (matches(text, /\b(empez\w*|comenz\w*|inici\w*|contrat\w*|proceso|trabaj\w* juntos|primer paso|relevamiento|propuesta)\b/)) return facts.process;
    if (matches(text, /\b(mantenimiento|soporte)\b/)) return 'El mantenimiento es opcional y se acuerda según el alcance de cada proyecto. ' + facts.contact;
    if (matches(text, /\b(ia|inteligencia artificial|crec\w*|oportunidad\w*|consultas? de clientes?|seguimiento|tareas? repetitivas?)\b/)) return facts.growth;
    if (matches(text, /\b(servicio\w*|ofrec\w*|hacen|sitio\w* web|pagina\w* web|web\w*|agente\w*|automatiz\w*|integrac\w*|sistema\w* de ia)\b/)) return facts.services;
    return facts.unknown;
  }
  questions.forEach((question) => {
    const button = document.createElement('button');
    button.type = 'button';
    button.textContent = question;
    button.addEventListener('click', () => ask(question));
    suggestions.append(button);
  });
  function render() {
    history.replaceChildren();
    turns.forEach(([question, replyText]) => {
      const item = document.createElement('li');
      const user = document.createElement('strong');
      user.textContent = `Vos: ${question}`;
      const reply = document.createElement('p');
      if (replyText !== null) reply.textContent = `Demo: ${replyText}`;
      item.append(user);
      if (replyText !== null) item.append(reply);
      history.append(item);
    });
  }
  function ask(raw) {
    if (pendingQuestion !== null) return;
    const question = raw.trim();
    if (!question || question.length > 500) {
      error.textContent = question ? 'Usá hasta 500 caracteres.' : 'Escribí una pregunta para probar la demo.';
      input.setAttribute('aria-invalid', 'true');
      input.focus();
      return;
    }
    error.textContent = '';
    input.removeAttribute('aria-invalid');
    turns = [...turns, [question, null]].slice(-8);
    input.value = '';
    pendingQuestion = question;
    setPending(true);
    render();
    transcriptBody.scrollTop = transcriptBody.scrollHeight;
    pendingTimer = setTimeout(() => {
      turns[turns.length - 1][1] = answer(pendingQuestion);
      pendingQuestion = null;
      pendingTimer = null;
      setPending(false);
      render();
      if (!panel.hidden) transcriptBody.scrollTop = transcriptBody.scrollHeight;
    }, 3000);
  }
  function open() {
    panel.hidden = false;
    launch.setAttribute('aria-expanded', 'true');
    close.focus();
  }
  function shut() {
    panel.hidden = true;
    launch.setAttribute('aria-expanded', 'false');
    launch.focus();
  }
  launch.addEventListener('click', open);
  close.addEventListener('click', shut);
  contact.addEventListener('click', () => {
    panel.hidden = true;
    launch.setAttribute('aria-expanded', 'false');
    // Let the native hash link scroll to contact, without returning focus to the launcher.
  });
  dock.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && !panel.hidden) { event.preventDefault(); shut(); }
  });
  reset.addEventListener('click', () => {
    clearTimeout(pendingTimer);
    pendingTimer = null;
    pendingQuestion = null;
    setPending(false);
    turns = []; input.value = ''; error.textContent = ''; input.removeAttribute('aria-invalid'); render(); input.focus();
  });
  form.addEventListener('submit', (event) => { event.preventDefault(); ask(input.value); });
  render();
  document.body.classList.add('agent-enhanced');
  dock.hidden = false;
})();
