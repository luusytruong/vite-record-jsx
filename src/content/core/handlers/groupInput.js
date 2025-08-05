// handlers/groupInput.js
import { $$, getText, sendData, debounce, normalize } from "../utils.js";

const eventManager = new WeakMap();
export async function handleGroupInput({ el, question, restore }) {
  const labels = $$("label", el);
  const inputs = $$("input", el);
  const debounceSend = debounce(async () => await sendData(question));

  const restoredQuestion = restore?.find(
    (q) => normalize(q?.text) === question.text && q?.type === question.type
  );
  const restoredAnswers = restoredQuestion?.input_answers || [];

  for (let i = 0; i < labels.length; i++) {
    const label = labels[i];
    const input = inputs[i];
    const text = getText(label).replace(/^\d+\)\s*/, "");
    const answer = { text, value: input?.value || "" };
    question.input_answers.push(answer);

    input?.addEventListener("input", () => {
      answer.value = input.value;
      debounceSend();
    });

    const restored = restoredAnswers.find((r) => normalize(r?.text) === text);

    const handleFocus = async () => {
      if (restored?.value) {
        await navigator.clipboard.writeText(restored.value);
        input.placeholder = restored.value;
      }
    };

    const old = eventManager.get(input);
    if (old) input?.removeEventListener("focus", old);
    input?.addEventListener("focus", handleFocus);
    eventManager.set(input, handleFocus);

    input?.addEventListener("blur", () => (input.placeholder = ""));
  }
}
