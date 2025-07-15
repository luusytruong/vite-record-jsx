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

export function handleQuestion(
  el,
  question,
  isRadio = false,
  parentQuestion = null
) {
  const groups = $$(".mdc-form-field", el);
  const options = [];

  for (const group of groups) {
    const input = $("input", group);
    const label = $("label", group);
    const img = $("img", group);

    const answer = { is_correct: input?.checked || false };

    const text = getText(label);
    if (text) answer.text = text;
    if (img?.src) answer.img_src = img.src;

    options.push(answer);

    input?.addEventListener("change", () => {
      if (isRadio) options.forEach((opt) => (opt.is_correct = false));
      answer.is_correct = input.checked;
      sendMessage(parentQuestion || question);
    });
  }

  question.options = options;
}

export function cleanQuestion(question) {
  const keys = [
    "options",
    "sub_questions",
    "drag_map",
    "input_answers",
    "img_src",
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
