import { extractMainQuestion } from "./core/extractHead.js";
import { detectType } from "./core/detectType.js";
import { handlers } from "./core/handlers/index.js";
import { $, bindEvents, clean, getStorage, log, sendData } from "./core/utils.js";

(async () => {
  const isLMS = location.hostname === "lms.ictu.edu.vn" || location.protocol === "file:";
  if (!isLMS) return;

  console.clear();
  const app = { lastIdx: 0, obsManager: [], active: true, mode: "cursor" };
  const label = $(".app-version");

  const settings = await getStorage("settings");
  app.active = settings?.toggle !== false;
  app.mode = settings?.mode || "cursor";

  document.body.classList.toggle("cursor", app.mode === "cursor");
  label?.classList?.toggle("on", app.active);

  const handleMainQuestion = async (check = true) => {
    const { type, el } = detectType();
    if (!el) return;

    const restore = app.active ? await getStorage("restore") : [];
    const question = extractMainQuestion();

    if (check && app.lastIdx === question.no) return;
    app.lastIdx = question.no;

    app.obsManager.forEach((obs) => obs.disconnect());
    app.obsManager = [];

    question.type = type;
    handlers[type]?.({ el, question, restore, ...app });

    clean(question);
    log(question);
    await sendData(question);
  };

  bindEvents(app, settings, handleMainQuestion, label);
  setInterval(() => handleMainQuestion(), 800);
  handleMainQuestion();
})();
