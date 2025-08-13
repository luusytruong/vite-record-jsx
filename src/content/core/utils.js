import { cachedImgs } from "./constants.js";

// utils.js
export const log = (...args) =>
  console.log(
    "%cR%cE%cC%cO%cR%cD",
    "color: #03FFFF; font-weight: bold;",
    "color: #56FFAA; font-weight: bold;",
    "color: #AAFF55; font-weight: bold;",
    "color: #FFFF00; font-weight: bold;",
    "color: #FF8080; font-weight: bold;",
    "color: #FF00FF; font-weight: bold;",
    ...args
  );
export const $ = (selector, root = document) => root.querySelector(selector);
export const $$ = (selector, root = document) =>
  Array.from(root.querySelectorAll(selector));
export const normalize = (str) =>
  str.normalize("NFKC").replace(/\s+/g, " ").trim();
export const extractNumber = (str) =>
  str?.match(/\d+/) ? str.match(/\d+/)[0] : "0";
export const isAnswered = (text) => text && !text.startsWith("Kéo và thả");
export const getText = (el) => normalize(el?.innerText || "");

export async function handleQuestion({
  el,
  question,
  restore,
  isRadio = false,
  parentQuestion = null,
  multiple = false,
}) {
  const groups = $$(multiple ? "mat-radio-button" : ".mdc-form-field", el);
  const options = [];

  const restoredQuestion = restore?.find(
    (q) => normalize(q?.text) === question.text && q?.type === question.type
  );
  const restoredAnswers = restoredQuestion?.options || [];
  const debounceSend = debounce(
    async () => await save(parentQuestion || question)
  );

  for (const group of groups) {
    const input = $("input", group);
    const label = $("label", group);
    const img = $("img", group);

    const answer = { is_correct: input?.checked || false };
    const text = getText(label).replace(/^[*]?[A-Z]\.\s*/, "");
    if (text) answer.text = text;
    if (img?.src) answer.img_src = img.src;

    input?.addEventListener("change", () => {
      if (isRadio) options.forEach((opt) => (opt.is_correct = false));
      answer.is_correct = input.checked || false;
      group.classList.remove("vite-record");
      debounceSend();
    });

    const restored = restoredAnswers.find((r) => normalize(r.text) === text);
    if (restored && restored.is_correct && !input.checked) {
      group.classList.add("vite-record");
    } else {
      group.classList.remove("vite-record");
    }

    options.push(answer);
  }

  question.options = options;
}

export function handleDragCommon(
  el,
  question,
  obsManager,
  restore,
  multiple = false
) {
  const dragZones = $$(":scope > :nth-child(2) > div", el);
  const candidates = $$(":scope > div .cdk-drag", el);
  const candidateSet = new Set(question.candidates);
  const debounceSend = debounce(async () => await save(question));

  candidates.forEach((candidate) => {
    const text = getText(candidate);
    if (!candidateSet.has(text)) {
      question.candidates.push(text);
      candidateSet.add(text);
    }
  });

  const restoredQuestion = restore?.find(
    (q) => normalize(q?.text) === question.text
  );

  dragZones.forEach((drag) => {
    const titleText = getText($("h4", drag));
    const answerZone = $(":scope > div", drag);

    const item = {
      text: titleText.replace(/^\d+\)\s*/, ""),
      ...(multiple ? { answers: [] } : { answer: "" }),
    };

    const update = () => {
      if (multiple) {
        item.answers = Array.from(answerZone.children)
          .map(getText)
          .filter(isAnswered);
      } else {
        const updatedAnswer = getText(answerZone);
        item.answer = isAnswered(updatedAnswer) ? updatedAnswer : "";
      }
    };

    update();
    question.drag_map.push(item);

    const observer = createObserver(() => {
      const before = multiple ? item.answers.join(",") : item.answer;
      update();
      const after = multiple ? item.answers.join(",") : item.answer;
      if (before !== after) debounceSend();
    });

    observer.observe(answerZone, { childList: true, subtree: multiple });
    obsManager.push(observer);

    const restoreItem = restoredQuestion?.drag_map?.find(
      (r) => r.text === item.text
    );

    const placeholder = $(":scope >p", answerZone);

    if (restoreItem && placeholder) {
      const answers = restoreItem.answers || [restoreItem.answer];
      placeholder.innerText = answers.join(", ");
    } else if (!restoreItem && placeholder) {
      placeholder.innerText = "Kéo và thả đáp án vào đây";
    }
  });
}

export function cl(question) {
  const keys = [
    "sub_questions",
    "input_answers",
    "candidates",
    "drag_map",
    "img_src",
    "options",
    "text",
  ];

  keys.forEach((key) => {
    if (!question?.[key]?.length) delete question[key];
  });
}

export async function uploadImage(url, blobUrl) {
  const fileName = blobUrl.split("/").pop();
  const cached = cachedImgs.find((image) => image.name === fileName);
  if (cached) return cached.src;

  try {
    const response = await fetch(blobUrl);
    if (!response.ok) throw new Error("Failed to fetch image");

    const blob = await response.blob();
    const formData = new FormData();
    formData.append("blob", blob);

    const uploadResponse = await fetch(url, { method: "POST", body: formData });
    if (!uploadResponse.ok) throw new Error("Failed to upload image");

    const result = await uploadResponse.json();
    if (!result?.src) throw new Error(`Error: ${result}`);

    cachedImgs.push({ name: fileName, src: result.src });
    return result.src;
  } catch (err) {
    return { error: true };
  }
}

const test = [];
export async function save(question) {
  test[question.no - 1] = question;
  const res = await setStorage("test", test);
  log(res ? "Saved" : "Failed");
}

export function createObserver(callback) {
  return new MutationObserver(callback);
}

export function debounce(fn, delay = 400) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
}

export async function setStorage(key, data) {
  if (!chrome?.storage?.local) return false;
  try {
    await chrome.storage.local.set({ [key]: data });
    return true;
  } catch {
    return false;
  }
}

export async function getStorage(key) {
  if (!chrome?.storage?.local) return;
  try {
    const result = await chrome.storage.local.get(key);
    return result[key];
  } catch {
    return null;
  }
}

export function bindE(app, settings, handleMainQuestion, label) {
  label?.addEventListener("click", async () => handleMainQuestion(false));

  const events = [
    "contextmenu",
    "visibilitychange",
    "fullscreenchange",
    "fullscreenerror",
    "pointerlockchange",
    "pointerlockerror",
    "mouseleave",
    "mouseenter",
    "blur",
    "focus",
    "keydown",
  ];

  for (const event of events) {
    for (const type of [document, window]) {
      type.addEventListener(
        event,
        async (e) => {
          if (e.target.tagName === "INPUT") return;
          e.stopImmediatePropagation();
          if (e instanceof KeyboardEvent) {
            const code = e.code || "";

            if (code === "ShiftRight" || code === "") {
              app.active = !app.active;
              handleMainQuestion(false);
              await setStorage("settings", {
                ...settings,
                toggle: app.active,
              }).then((res) => log(res && app.active ? "on" : "off"));
              label?.classList?.toggle("on", app.active);
            }

            if (code === "Slash") {
              app.mode = app.mode === "cur" ? "color" : "cur";
              document.body.classList.toggle("cur", app.mode === "cur");
              await setStorage("settings", {
                ...settings,
                mode: app.mode,
              }).then((res) => log(res ? "mode changed" : "mode not changed"));
            }

            if (e.altKey && code === "KeyF") {
              window.__MODER__ = true;
              if (!document.fullscreenElement) {
                await document.body.requestFullscreen();
              } else {
                await document.exitFullscreen();
              }
              window.__MODER__ = false;
            }
          }
        },
        true
      );
    }
  }
}

export function bindFS() {
  const _reqFS = Element.prototype.requestFullscreen;
  const _exitFS = Document.prototype.exitFullscreen;
  window.__MODER__ = false;

  Document.prototype.exitFullscreen = function (...args) {
    window.__MODER__ ? _exitFS.apply(this, args) : Promise.resolve();
  };

  Element.prototype.requestFullscreen = function (...args) {
    window.__MODER__ ? _reqFS.apply(this, args) : Promise.resolve();
  };

  Object.defineProperty(Document.prototype, "fullscreenElement", {
    get() {
      return document.documentElement;
    },
    configurable: true,
  });

  Object.defineProperty(Document.prototype, "fullscreen", {
    get() {
      return true;
    },
    configurable: true,
  });

  Object.defineProperty(Document.prototype, "pointerLockElement", {
    get() {
      return document.documentElement;
    },
    configurable: true,
  });

  Object.defineProperty(window, "innerHeight", {
    get() {
      return screen.height;
    },
    configurable: true,
  });

  Object.defineProperty(window, "innerWidth", {
    get() {
      return screen.width;
    },
    configurable: true,
  });
}
