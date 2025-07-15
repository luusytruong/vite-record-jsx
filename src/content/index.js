import { extractMainQuestion } from "./core/extractHead.js";
import { detectType } from "./core/detectType.js";
import { handlers } from "./core/handlers/index.js";
import { cleanQuestion, log } from "./core/utils.js";

console.clear();
const data = { lastIndex: 0, observers: [] };

setInterval(() => {
  const { type, el } = detectType();
  if (!el) return;

  const question = extractMainQuestion();
  if (question.no === data.lastIndex) return;

  data.observers.forEach((obs) => obs.disconnect());
  data.observers = [];

  question.type = type;
  handlers[type]?.(el, question, data.observers);
  cleanQuestion(question);
  log(question);

  data.lastIndex = question.no;
}, 1000);
