const labels = {
  proceso: "process",
  tarea: "process",
  dificultad: "difficulty",
  herramientas: "tools",
  frecuencia: "frequency",
};
const unknownAnswer =
  /^(no (lo )?s[eé]|no estoy segur[oa]|no recuerdo|todav[ií]a no (lo )?s[eé]|prefiero (omitir|no responder)|omitir|no informado)[.!]?$/i;
const negation = /\b(no|nunca|dej[eé]|antes|quiz[aá]s|tal vez)\b/i;

function propose(values) {
  const { process = "", difficulty = "" } = values;
  if (
    !process ||
    !difficulty ||
    negation.test(process) ||
    negation.test(difficulty)
  )
    return null;
  let text;
  if (
    /\b(copio|copiar|cargo|cargar)\b.*\b(pedidos|datos)\b/i.test(process) &&
    /errores|copiar|repet|tiempo/i.test(difficulty)
  ) {
    text =
      "Podría evaluarse pasar los pedidos o datos con reglas y una revisión, sin IA. Primero habría que comprobar cómo entran los datos y si las herramientas permiten conectarse.";
  } else if (
    /consultas/i.test(process) &&
    /incomplet|faltan|falta informaci[oó]n/i.test(difficulty)
  ) {
    text =
      "Podría evaluarse una entrada guiada con los datos necesarios y una revisión antes de continuar, sin IA. Habría que definir qué información necesita cada consulta.";
  } else if (
    /busc|encontr/i.test(process) &&
    /informaci[oó]n|document/i.test(process) &&
    /tiempo|busc|encontr/i.test(difficulty)
  ) {
    text =
      "Podría evaluarse organizar la información y sus criterios de búsqueda antes de considerar IA. Habría que revisar las fuentes, los permisos y cómo comprobar una respuesta.";
  }
  return text ? { text, basis: { process, difficulty } } : null;
}

// Only explicit labels, limited affirmative patterns and answers to one question are recognized.
export function simulateTurn({ message, target, values }) {
  const facts = {};
  const unknowns = [];
  if (message && unknownAnswer.test(message.trim())) {
    unknowns.push(target || "process");
    return { facts, unknowns, suggestion: propose(values) };
  }
  const clauses = message
    .split(/\n|;|(?<=[.!?])\s+/)
    .filter((part) => part.trim());
  const labeled = [
    ...message.matchAll(
      /(?:^|[;\n]|(?<=[.!?])[ \t]+)[ \t]*(proceso|tarea|dificultad|herramientas|frecuencia):[ \t]*/gi,
    ),
  ];
  labeled.forEach((label, index) => {
    const key = labels[label[1].toLowerCase()];
    const value = message
      .slice(
        label.index + label[0].length,
        labeled[index + 1]?.index ?? message.length,
      )
      .trimEnd();
    if (!value.trim() || unknownAnswer.test(value.trim())) unknowns.push(key);
    else facts[key] = value;
  });
  if (!labeled.length && message) {
    if (target) facts[target] = message;
    else {
      const process = clauses.find((part) =>
        /^(copio|cargo|registro|recibo|busco|organizo|gestiono|preparo|me llegan)\b/i.test(
          part.trim(),
        ),
      );
      if (process) facts.process = message;
      const difficulty = clauses
        .filter((part) => !negation.test(part))
        .map(
          (part) =>
            part.match(
              /\b(cometo errores|pierdo tiempo|se pierden|faltan datos|tengo que repetir)\b[\s\S]*/i,
            )?.[0],
        )
        .find(Boolean);
      if (difficulty) facts.difficulty = difficulty;
    }
    if (/^Me llegan consultas incompletas[.!]?$/i.test(message.trim())) {
      facts.process = "Me llegan consultas";
      facts.difficulty = message;
    }
    if (/^Pierdo tiempo buscando información[.!]?$/i.test(message.trim())) {
      facts.process = "Busco información";
      facts.difficulty = message;
    }
    const affirmative = clauses
      .filter((part) => !negation.test(part))
      .join(" ");
    if (!facts.tools) {
      const tools = [
        ...affirmative.matchAll(
          /\b(WhatsApp|Excel|Google Sheets|planilla|papel|correo electr[oó]nico)\b/gi,
        ),
      ].map((match) => match[0]);
      if (tools.length) facts.tools = [...new Set(tools)].join(", ");
    }
    if (!facts.frequency) {
      const frequency = affirmative.match(
        /\b(todos los d[ií]as|cada d[ií]a|a diario|diariamente|cada semana|semanalmente|cada mes|mensualmente|\d+ veces (?:por|al|a la) (?:d[ií]a|semana|mes))\b/i,
      );
      if (frequency) facts.frequency = frequency[0];
    }
    // Separate recognized context from the task so later edits do not leave stale duplicates.
    if (facts.process && !negation.test(facts.process)) {
      let process = facts.process;
      if (facts.difficulty && process !== facts.difficulty) {
        process = process
          .replace(facts.difficulty, "")
          .replace(/[ \t]+(?:y|pero)[ \t]*[.!]?[ \t]*$/i, "");
      }
      if (facts.tools)
        process = process.replace(
          /\b(?:de|desde|a|en|con|por)[ \t]+(?:(?:una?|la|el)[ \t]+)?(?:WhatsApp|Excel|Google Sheets|planilla|papel|correo electr[oó]nico)\b/gi,
          "",
        );
      if (facts.frequency) process = process.replace(facts.frequency, "");
      facts.process = process
        .replace(/[ \t]{2,}/g, " ")
        .replace(/[ \t]+([.,;!?])/g, "$1")
        .trim();
    }
  }
  return { facts, unknowns, suggestion: propose({ ...values, ...facts }) };
}
