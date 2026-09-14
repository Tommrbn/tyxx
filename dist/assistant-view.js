import { createAssistant, fields } from "./assistant-model.js";

function element(tag, text, className) {
  const node = document.createElement(tag);
  if (text !== undefined) node.textContent = text;
  if (className) node.className = className;
  return node;
}

export function mountAssistant() {
  const assistant = createAssistant();
  const form = document.querySelector("#assistant-form");
  const answer = document.querySelector("#assistant-answer");
  const history = document.querySelector("#assistant-history");
  const sheet = document.querySelector("#sheet-fields");
  const question = document.querySelector("#assistant-question");
  const error = document.querySelector("#assistant-error");
  const status = document.querySelector("#assistant-status");
  const finish = document.querySelector("#assistant-finish");
  const rows = new Map();
  const sheetRows = new Map();

  function announce(text) {
    status.textContent = text;
  }

  function createEditor({
    id,
    label,
    saveLabel,
    trigger,
    display,
    readValue,
    save,
  }) {
    const editor = element("form");
    editor.id = id + "-form";
    editor.hidden = true;
    editor.noValidate = true;
    editor.className = "assistant-editor";
    const inputLabel = element("label", label);
    inputLabel.htmlFor = id;
    const input = element("textarea");
    input.id = id;
    input.rows = 4;
    input.setAttribute("aria-describedby", id + "-error");
    const problem = element("p", "", "assistant-error");
    problem.id = id + "-error";
    const actions = element("div", undefined, "assistant-actions");
    const submit = element("button", saveLabel, "assistant-primary");
    submit.type = "submit";
    const dismiss = element("button", "Cancelar");
    dismiss.type = "button";
    trigger.setAttribute("aria-expanded", "false");
    trigger.setAttribute("aria-controls", editor.id);
    const close = () => {
      editor.hidden = true;
      display.hidden = false;
      trigger.setAttribute("aria-expanded", "false");
      trigger.focus({ preventScroll: true });
    };
    dismiss.addEventListener("click", close);
    trigger.addEventListener("click", () => {
      if (!editor.hidden) {
        close();
        return;
      }
      input.value = readValue();
      problem.textContent = "";
      input.removeAttribute("aria-invalid");
      display.hidden = true;
      editor.hidden = false;
      trigger.setAttribute("aria-expanded", "true");
      input.focus();
    });
    actions.append(submit, dismiss);
    editor.append(inputLabel, input, problem, actions);
    editor.addEventListener("submit", (event) => {
      event.preventDefault();
      try {
        save(input.value);
        problem.textContent = "";
        input.removeAttribute("aria-invalid");
        close();
      } catch (failure) {
        problem.textContent = failure.message;
        input.setAttribute("aria-invalid", "true");
        announce(failure.message);
      }
    });
    return editor;
  }

  Object.entries(fields).forEach(([key, label]) => {
    const term = element("dt");
    const heading = element("span", label);
    const edit = element("button", "Editar");
    edit.type = "button";
    edit.setAttribute("aria-label", "Editar " + label);
    term.append(heading, edit);
    const definition = element("dd");
    const text = element("p", undefined, "sheet-value");
    const editor = createEditor({
      id: "sheet-input-" + key,
      label,
      saveLabel: "Guardar " + label,
      trigger: edit,
      display: text,
      readValue: () => assistant.snapshot().editableValues[key],
      save: (value) => {
        assistant.edit(key, value);
        render();
        announce("Ficha actualizada. " + assistant.snapshot().question);
      },
    });
    definition.append(text, editor);
    if (key === "improvement")
      definition.append(
        element(
          "p",
          "Posibilidad a evaluar con Tomás, incluso si editás el texto.",
          "assistant-help",
        ),
      );
    if (key === "pending")
      definition.append(
        element(
          "p",
          "Podés agregar tus dudas. Los datos que falten y los avisos de revisión siguen visibles.",
          "assistant-help",
        ),
      );
    sheet.append(term, definition);
    sheetRows.set(key, text);
  });

  function appendTurn(turn, index, answerNumber) {
    const item = element("li");
    const caption = element("p", undefined, "turn-question");
    const text = element("p");
    item.append(caption, text);
    if (turn.kind === "answer") {
      const edit = element(
        "button",
        "Corregir respuesta " + answerNumber,
        "turn-edit",
      );
      edit.type = "button";
      const editor = createEditor({
        id: "turn-input-" + index,
        label: "Corregir respuesta " + answerNumber,
        saveLabel: "Guardar respuesta " + answerNumber,
        trigger: edit,
        display: text,
        readValue: () => assistant.snapshot().history[index].message,
        save: (value) => {
          assistant.correct(index, value);
          render();
          announce(
            "Respuesta corregida. La ficha muestra la versión vigente. " +
              assistant.snapshot().question,
          );
        },
      });
      item.append(edit, editor);
    } else {
      item.className = "turn-manual-edit";
    }
    history.append(item);
    rows.set(index, { caption, text });
  }

  function render() {
    const state = assistant.snapshot();
    let answerNumber = 0;
    state.history.forEach((turn, index) => {
      if (turn.kind === "answer") answerNumber++;
      if (!rows.has(index)) appendTurn(turn, index, answerNumber);
      const row = rows.get(index);
      row.caption.textContent =
        turn.question + (turn.corrected ? " · Respuesta corregida" : "");
      row.text.textContent = turn.message.trim()
        ? turn.message
        : "Dejaste este dato pendiente.";
    });
    sheetRows.forEach((node, key) => {
      node.textContent = state.values[key].trim()
        ? state.values[key]
        : key === "improvement"
          ? "Pendiente de evaluar con Tomás"
          : "Todavía no informado";
    });
    question.textContent = state.question;
    answer.placeholder =
      {
        process:
          "Por ejemplo: copio pedidos de WhatsApp a Excel todos los días.",
        difficulty: "Por ejemplo: cometo errores al copiar.",
        tools: "Podés nombrar tus herramientas o dejar este dato pendiente.",
        frequency:
          "Por ejemplo: todos los días. También podés dejarlo pendiente.",
      }[state.target] || "";
    form.hidden = !state.target;
    finish.hidden = Boolean(state.target);
    finish.textContent = state.target ? "" : state.question;
    document.querySelector("#sheet-completeness").textContent = state.complete
      ? "Base para conversar"
      : "Ficha incompleta · falta proceso o dificultad";
    document.querySelector(".assistant-starters").hidden =
      state.history.length > 0;
    document.querySelector("#assistant-start-help").hidden =
      state.history.length > 0;
    document.querySelector("#assistant-history-note").hidden =
      !state.history.length;
  }

  function submit(message) {
    try {
      assistant.answer(message);
      error.textContent = "";
      answer.removeAttribute("aria-invalid");
      answer.value = "";
      render();
      announce("Ficha actualizada. " + assistant.snapshot().question);
      if (!form.hidden) answer.focus({ preventScroll: true });
      else finish.focus({ preventScroll: true });
    } catch (failure) {
      error.textContent = failure.message;
      answer.setAttribute("aria-invalid", "true");
      announce(failure.message);
    }
  }
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    submit(answer.value);
  });
  document
    .querySelector("#assistant-skip")
    .addEventListener("click", () => submit("No lo sé"));
  document.querySelectorAll(".assistant-starters button").forEach((button) => {
    button.addEventListener("click", () => submit(button.textContent));
  });
  render();
  document.querySelector("#assistant-fallback").hidden = true;
  document.querySelector("#assistant-workspace").hidden = false;
}
