import { extractMainQuestion } from "./core/extractHead.js";
import { detectType } from "./core/detectType.js";
import { handlers } from "./core/handlers/index.js";
import {
  $,
  bindEvents,
  clean,
  getStorage,
  log,
  sendData,
} from "./core/utils.js";

(async () => {
  const isLMS =
    location.hostname === "lms.ictu.edu.vn" || location.protocol === "file:";
  if (!isLMS) return;

  console.clear();
  const app = { lastQuestion: {}, obsManager: [], active: true, mode: "cur" };
  const settings = await getStorage("settings");
  const label = $(".app-version");
  const eventManager = new WeakMap();

  app.active = settings?.toggle !== false;
  app.mode = settings?.mode || "cur";

  document.body.classList.toggle("cur", app.mode === "cur");
  label?.classList?.toggle("on", app.active);

  const handleMainQuestion = async (check = true) => {
    const { type, el } = detectType();
    if (!el) return;

    const question = extractMainQuestion();

    if (check && app.lastQuestion?.no === question.no) return;
    app.lastQuestion = question;

    const restore = app.active ? await getStorage("restore") : [];
    const newEl = $("input[type=checkbox]");
    const old = eventManager.get(newEl);

    if (old) newEl?.removeEventListener("change", old);

    const handleChange = async () => {
      app.lastQuestion.is_new = newEl?.checked || false;
      await sendData(app.lastQuestion);
    };

    newEl?.addEventListener("change", handleChange);
    eventManager.set(newEl, handleChange);

    app.obsManager.forEach((obs) => obs.disconnect());
    app.obsManager = [];

    question.type = type;
    handlers[type]?.({ el, question, restore, ...app });

    clean(question);
    log("after clean", question);
    await sendData(question);
  };

  bindEvents(app, settings, handleMainQuestion, label);
  setInterval(() => handleMainQuestion(), 600);
  handleMainQuestion();
})();
