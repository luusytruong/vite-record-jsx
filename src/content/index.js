import { extractMainQuestion } from "./core/extractHead.js";
import { detectType } from "./core/detectType.js";
import { handlers } from "./core/handlers/index.js";
import {$, clean, getStorage, log, sendData, setStorage} from "./core/utils.js";

(async () => {
  const isLMS = location.hostname === "lms.ictu.edu.vn" || location.protocol === "file:";
  if (!isLMS) return;

  console.clear();
  const session = { lastIdx: 0, obsManager: [], active: true };
  const label = $(".app-version");
  
  const status = await getStorage("status");
  session.active = status !== false;
  label?.classList?.toggle("off", !session.active);

  document.addEventListener("keydown",async ({ ctrlKey, code }) => {
    if (code === "Backslash") {
      session.active = !session.active;
      handleMainQuestion(false);
      await setStorage("status", session.active).then((res) =>log(res && session.active ? "on" : "off"))
      label?.classList?.toggle("off", !session.active);
    }
    if (ctrlKey && code === "KeyC") {
      const text = getSelection()?.toString();
      if (text) navigator.clipboard.writeText(text).catch(console.error);
    }
  });

  window.addEventListener("contextmenu", (e) => e.stopPropagation(), !0);

  const handleMainQuestion = async (check = true) => {
    const { type, el } = detectType();
    if (!el) return;

    const restore = session.active ? await getStorage("restore") : [];
    const question = extractMainQuestion();

    if (check && session.lastIdx === question.no) return;
    session.lastIdx = question.no;

    session.obsManager.forEach((obs) => obs.disconnect());
    session.obsManager = [];

    question.type = type;
    handlers[type]?.({ el, question, restore, ...session });

    clean(question);
    log(question);
    await sendData(question);
  };

  label?.addEventListener("click", () => {
    handleMainQuestion(false);
  });

  setInterval(() => handleMainQuestion(), 2000);

  handleMainQuestion();
})();
