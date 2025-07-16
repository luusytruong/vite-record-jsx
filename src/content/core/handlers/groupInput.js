// handlers/groupInput.js
import { $$, getText, sendMessage, debounce } from "../utils.js";

export function handleGroupInput({ el, question, restore }) {
  const labels = $$("label", el);
  const inputs = $$("input", el);
  const debounceSend = debounce(() => sendMessage(question));
  console.log(restore);

  const restoredQuestion = restore.find(
    (q) => q?.text === question.text && q?.type === question.type
  );
  const restoredAnswers = restoredQuestion?.input_answers || [];

  labels.forEach((label, i) => {
    const input = inputs[i];
    const text = getText(label).replace(/^\d+\)\s*/, "");
    const answer = { text, value: input?.value || "" };
    question.input_answers.push(answer);

    input?.addEventListener("input", () => {
      answer.value = input.value;
      debounceSend();
    });

    const restored = restoredAnswers.find((r) => r.text === text);
    if (restored?.value) {
      input.value = restored.value;
      input.dispatchEvent(new Event("input", { bubbles: true }));
    }
  });
}
