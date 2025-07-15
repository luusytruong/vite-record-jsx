// handlers/groupInput.js
import { $, $$, getText, sendMessage, debounce } from "../utils.js";

export function handleGroupInput(el, question) {
  const labels = $$("label", el);
  const inputs = $$("input", el);
  const debounceSend = debounce(() => sendMessage(question));

  labels.forEach((label, i) => {
    const input = inputs[i];
    const text = getText(label).replace(/^\d+\)\s*/, "");
    const answer = { text, value: input?.value || "" };
    question.input_answers.push(answer);

    input?.addEventListener("input", () => {
      answer.value = input.value;
      debounceSend();
    });
  });
}
