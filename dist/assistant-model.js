import { simulateTurn } from "./assistant-simulator.js";

export const fields = {
  process: "Proceso actual",
  difficulty: "Dificultad descrita",
  tools: "Herramientas mencionadas",
  frequency: "Frecuencia informada",
  improvement: "Mejora propuesta",
  pending: "Aspectos pendientes",
};
const questions = {
  process: "¿Qué tarea de tu negocio querés mejorar?",
  difficulty: "¿Qué dificultad encontrás al hacer esa tarea?",
  tools: "¿Qué herramientas usás para esa tarea?",
  frequency: "¿Con qué frecuencia hacés esa tarea?",
};
const pendingLabels = {
  process: "Proceso por conocer",
  difficulty: "Dificultad por conocer",
  tools: "Herramientas por conocer",
  frequency: "Frecuencia por conocer",
};
const factKeys = Object.keys(questions);
const maximumLength = 12000;

function validateMessage(message) {
  if (typeof message !== "string" || !message.trim())
    throw new Error("Escribí una respuesta antes de agregarla.");
  if (message.length > maximumLength)
    throw new Error(
      "Usá hasta 12.000 caracteres. Tu texto sigue en el campo para que puedas ajustarlo.",
    );
}

function validatedInterpretation(interpret, input) {
  const result = interpret(structuredClone(input));
  if (
    !result ||
    typeof result.facts !== "object" ||
    result.facts === null ||
    Array.isArray(result.facts) ||
    !Array.isArray(result.unknowns) ||
    Object.entries(result.facts).some(
      ([key, value]) =>
        !factKeys.includes(key) ||
        typeof value !== "string" ||
        value.length > maximumLength,
    ) ||
    result.unknowns.some((key) => !factKeys.includes(key)) ||
    (result.suggestion !== null &&
      (!result.suggestion ||
        typeof result.suggestion.text !== "string" ||
        result.suggestion.text.length > maximumLength ||
        !result.suggestion.basis ||
        typeof result.suggestion.basis.process !== "string" ||
        typeof result.suggestion.basis.difficulty !== "string"))
  ) {
    throw new Error(
      "No pudimos interpretar la respuesta. Tu texto se conserva: reintentá o completá la ficha directamente.",
    );
  }
  return result;
}

export function createAssistant({ interpret = simulateTurn } = {}) {
  let values = Object.fromEntries(Object.keys(fields).map((key) => [key, ""]));
  let sources = {};
  let skipped = new Set();
  let history = [];
  let improvementNeedsReview = false;
  let descriptionReviews = new Set();

  function snapshot() {
    const target = factKeys.find(
      (key) => !values[key].trim() && !skipped.has(key),
    );
    const requiredPending = factKeys
      .filter((key) => !values[key].trim())
      .map((key) => pendingLabels[key]);
    if (improvementNeedsReview)
      requiredPending.push(
        "Revisar la mejora editada: cambió información de la ficha.",
      );
    descriptionReviews.forEach((key) =>
      requiredPending.push(
        `Revisar ${fields[key].toLowerCase()}: cambiaste herramientas o frecuencia y la descripción todavía menciona un dato anterior. Editá esa descripción para revisarla.`,
      ),
    );
    const displayValues = { ...values };
    displayValues.pending = [
      ...requiredPending,
      values.pending.trim()
        ? values.pending
        : "Alcance y viabilidad por evaluar con TYXX.",
    ].join("\n");
    return structuredClone({
      values: displayValues,
      editableValues: values,
      history,
      target,
      improvementNeedsReview,
      question:
        target === "process" && history.length
          ? "¿Qué tarea concreta hacés hoy, paso a paso?"
          : target
            ? questions[target]
            : "Podés revisar tu ficha y mantener pendientes los datos que todavía no conocés.",
      complete: Boolean(values.process.trim() && values.difficulty.trim()),
    });
  }

  // Compute and validate before committing: an interpretation failure cannot partially change the case.
  function commit(
    nextValues,
    nextSources,
    nextSkipped,
    nextHistory,
    { manual = false, reviewed = [] } = {},
  ) {
    const nextReviews = new Set(descriptionReviews);
    for (const key of ["process", "difficulty"]) {
      if (reviewed.includes(key) || values[key] !== nextValues[key])
        nextReviews.delete(key);
      for (const contextKey of ["tools", "frequency"]) {
        if (
          values[contextKey] === nextValues[contextKey] ||
          !values[contextKey].trim()
        )
          continue;
        const previousTerms = values[contextKey]
          .toLowerCase()
          .split(/,|\s+y\s+/)
          .map((term) => term.trim());
        if (
          previousTerms.some(
            (term) =>
              term.length > 2 &&
              nextValues[key].toLowerCase().includes(term) &&
              !nextValues[contextKey].toLowerCase().includes(term),
          )
        )
          nextReviews.add(key);
      }
    }
    const changedBasis =
      values.process !== nextValues.process ||
      values.difficulty !== nextValues.difficulty;
    let needsReview = improvementNeedsReview;
    if (changedBasis) {
      if (nextSources.improvement === "manual") {
        needsReview = Boolean(nextValues.improvement.trim());
      } else {
        let suggestion = null;
        try {
          suggestion = validatedInterpretation(interpret, {
            message: "",
            target: null,
            values: nextValues,
          }).suggestion;
        } catch (failure) {
          if (!manual) throw failure;
          // Manual facts remain usable even if the interpretation strategy fails.
        }
        nextValues.improvement =
          suggestion &&
          suggestion.basis.process === nextValues.process &&
          suggestion.basis.difficulty === nextValues.difficulty
            ? suggestion.text
            : "";
        needsReview = false;
      }
    }
    if (nextReviews.size) {
      if (nextSources.improvement === "manual")
        needsReview = Boolean(nextValues.improvement.trim());
      else nextValues.improvement = "";
    }
    values = nextValues;
    sources = nextSources;
    skipped = nextSkipped;
    history = nextHistory;
    improvementNeedsReview = needsReview;
    descriptionReviews = nextReviews;
    return snapshot();
  }

  function receive(message, correctionIndex) {
    validateMessage(message);
    const previous =
      correctionIndex === undefined ? null : history[correctionIndex];
    if (correctionIndex !== undefined && previous?.kind !== "answer")
      throw new Error("Elegí una respuesta de la conversación para corregir.");
    const before = snapshot();
    const target = previous
      ? previous.target
      : !history.length && before.target === "process"
        ? null
        : before.target;
    const nextValues = { ...values };
    const nextSources = { ...sources };
    const nextSkipped = new Set(skipped);
    const index = previous ? correctionIndex : history.length;
    const source = "answer:" + index;
    if (previous) {
      factKeys.forEach((key) => {
        if (nextSources[key] === source) {
          nextValues[key] = "";
          delete nextSources[key];
          nextSkipped.delete(key);
        }
      });
    }
    const result = validatedInterpretation(interpret, {
      message,
      target,
      values: nextValues,
    });
    if (
      !previous &&
      history.at(-1)?.message === message &&
      !result.unknowns.length
    ) {
      throw new Error(
        "Esta respuesta ya está agregada. Podés corregirla desde la conversación.",
      );
    }
    for (const [key, value] of Object.entries(result.facts)) {
      if (previous || (!nextValues[key] && !nextSources[key])) {
        nextValues[key] = value;
        nextSources[key] = source;
        nextSkipped.delete(key);
      }
    }
    result.unknowns.forEach((key) => {
      if (previous || (!nextValues[key] && !nextSources[key])) {
        nextValues[key] = "";
        nextSources[key] = source;
        nextSkipped.add(key);
      }
    });
    const entry = {
      kind: "answer",
      message,
      target,
      question: previous?.question || before.question,
      corrected: Boolean(previous),
    };
    const nextHistory = [...history];
    nextHistory[index] = entry;
    return commit(nextValues, nextSources, nextSkipped, nextHistory, {
      reviewed: previous ? Object.keys(result.facts) : [],
    });
  }

  return {
    snapshot,
    answer: (message) => receive(message),
    correct: (index, message) => receive(message, index),
    edit(key, value) {
      if (
        !Object.hasOwn(fields, key) ||
        typeof value !== "string" ||
        value.length > maximumLength
      ) {
        throw new Error(
          "Usá hasta 12.000 caracteres. Tu texto sigue en el campo para que puedas ajustarlo.",
        );
      }
      const nextSkipped = new Set(skipped);
      // Clearing a field is an explicit choice to leave it pending, not a request to ask forever.
      if (value.trim()) nextSkipped.delete(key);
      else nextSkipped.add(key);
      const result = commit(
        { ...values, [key]: value },
        { ...sources, [key]: "manual" },
        nextSkipped,
        [
          ...history,
          {
            kind: "edit",
            key,
            message: value,
            question:
              "Actualizaste " + fields[key].toLowerCase() + " en la ficha.",
          },
        ],
        { manual: true, reviewed: [key] },
      );
      if (key === "improvement") {
        improvementNeedsReview = false;
        return snapshot();
      }
      return result;
    },
  };
}
