import { extractMainQuestion } from "./core/extractHead.js";
import { detectType } from "./core/detectType.js";
import { handlers } from "./core/handlers/index.js";
import {
  cleanQuestion,
  getStorage,
  log,
  saveToStorage,
  sendMessage,
} from "./core/utils.js";

(() => {
  const isLMS =
    location.hostname === "lms.ictu.edu.vn" || location.href.startsWith("file");
  if (!isLMS) return;

  console.clear();
  const session = { lastIndex: 0, observers: [], restore: [], test: [] };

  window.addEventListener("message", async ({ source, data }) => {
    if (source !== window) return;
    if (data?.source === "page-script") {
      const question = data.payload[0];
      session.test[question.no - 1] = question;
      await saveToStorage("test", session.test);
    }
  });

  setInterval(async () => {
    const { type, el } = detectType();
    if (!el) return;

    session.restore = await getStorage("restore");

    const question = extractMainQuestion();
    if (question.no === session.lastIndex) return;

    session.observers.forEach((obs) => obs.disconnect());
    session.observers = [];

    question.type = type;
    handlers[type]?.({
      el,
      question,
      observerManager: session.observers,
      ...session,
    });
    cleanQuestion(question);
    sendMessage(question);
    log(question);

    session.lastIndex = question.no;
  }, 1000);
})();
