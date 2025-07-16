import { cachedImgs } from "./constants.js";

// utils.js
export const $ = (selector, root = document) => root.querySelector(selector);
export const $$ = (selector, root = document) =>
  Array.from(root.querySelectorAll(selector));
export const log = (...args) =>
  true &&
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
export const normalize = (str) =>
  str.normalize("NFKC").replace(/\s+/g, " ").trim();
export const extractNumber = (str) =>
  str.match(/\d+/) ? str.match(/\d+/)[0] : "0";

export const questionSchema = {
  no: 0,
  type: "",
  text: "",
  img_src: "",
  options: [],
  sub_questions: [],
};

export const subQuestionSchema = {
  no: 0,
  text: "",
  img_src: "",
  options: [],
};

export const answerSchema = {
  text: "",
  img_src: "",
  is_correct: false,
};

export function handleQuestion({
  el,
  question,
  restore,
  isRadio = false,
  parentQuestion = null,
}) {
  const groups = $$(".mdc-form-field", el);
  const options = [];

  const restoredQuestion = restore?.find(
    (q) => q?.text === question.text && q?.type === question.type
  );
  const restoredAnswers = restoredQuestion?.options || [];
  const debounceSend = debounce(() => sendMessage(parentQuestion || question));

  for (const group of groups) {
    const input = $("input", group);
    const label = $("label", group);
    const img = $("img", group);

    const answer = { is_correct: input?.checked || false };
    const text = getText(label);
    if (text) answer.text = text;
    if (img?.src) answer.img_src = img.src;

    input?.addEventListener("change", () => {
      if (isRadio) options.forEach((opt) => (opt.is_correct = false));
      answer.is_correct = input.checked;
      debounceSend();
    });

    const restored = restoredAnswers.find((r) => r.text === text);
    if (restored && restored.is_correct) {
      input.click();
      answer.is_correct = input.checked;
      input.dispatchEvent(new Event("change", { bubbles: true }));
    }

    options.push(answer);
  }

  question.options = options;
}

export function handleDragCommon(
  el,
  question,
  observerManager,
  { restore, multiple = false }
) {
  const dragZones = $$(":scope > :nth-child(2) > div", el);
  const candidates = $$(":scope > div .cdk-drag", el);
  const candidateSet = new Set(question.candidates);
  const debounceSend = debounce(() => sendMessage(question));

  candidates.forEach((candidate) => {
    const text = getText(candidate);
    if (!candidateSet.has(text)) {
      question.candidates.push(text);
      candidateSet.add(text);
    }
  });

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
    observerManager.push(observer);

    const restoredList = restore?.filter((q) => q.drag_map?.length > 0) || [];
    restoredList.forEach((q) => {
      const restoreItem = q.drag_map.find((r) => r.text === item.text);
      if (!restoreItem) return;

      // log(answerZone)
      const answer = (restoreItem.answers || [restoreItem.answer]).join(", ");
      const placeholder = $(":scope >p", answerZone);
      if (placeholder) placeholder.innerText = answer;
    });
  });
}

export function cleanQuestion(question) {
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

export function sendMessage(...args) {
  window.postMessage(
    {
      source: "page-script",
      payload: args,
    },
    "*"
  );
}

export async function saveToStorage(key, data) {
  const result = await setStorage(key, data);
  if (result) log("Saved to storage");
  else log("Failed to save to storage");
}

export function createObserver(callback) {
  return new MutationObserver(callback);
}

export const isAnswered = (text) => text && !text.startsWith("Kéo và thả");

export const getText = (el) => el?.innerText?.trim() || "";

export function debounce(fn, delay = 500) {
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
