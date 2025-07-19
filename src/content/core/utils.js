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
    (q) => normalize(q?.text) === question.text && q?.type === question.type
  );
  const restoredAnswers = restoredQuestion?.options || [];
  const debounceSend = debounce(
    async () => await sendData(parentQuestion || question)
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
      answer.is_correct = input.checked;
      debounceSend();
    });

    const restored = restoredAnswers.find((r) => normalize(r.text) === text);
    if (restored && restored.is_correct && !input.checked) {
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
  obsManager,
  restore,
  multiple = false
) {
  const dragZones = $$(":scope > :nth-child(2) > div", el);
  const candidates = $$(":scope > div .cdk-drag", el);
  const candidateSet = new Set(question.candidates);
  const debounceSend = debounce(async () => await sendData(question));

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
    if (!restoreItem) return;

    const answers = restoreItem.answers || [restoreItem.answer];
    const placeholder = $(":scope >p", answerZone);
    if (placeholder) placeholder.innerText = answers.join(", ");

    // answers?.forEach((answer) => {
    //   const candidate = candidates.find((c) => getText(c) === answer);
    //   if (!candidate) return;
    //   log("Simulate drag and drop", candidate, answerZone);
    //   simulateDragAndDrop(candidate, answerZone);
    //   simulateDragDrop(candidate, answerZone);
    // });
  });
}

export async function simulateDragDrop(draggableElement, targetElement) {
  const getCoords = (el) => {
    const rect = el.getBoundingClientRect();
    return {
      x: rect.left + rect.width / 2,
      y: rect.top + rect.height / 2,
    };
  };

  const draggableCoords = getCoords(draggableElement);
  const targetCoords = getCoords(targetElement);

  // Mousedown
  draggableElement.dispatchEvent(
    new MouseEvent("mousedown", {
      bubbles: true,
      cancelable: true,
      clientX: draggableCoords.x,
      clientY: draggableCoords.y,
    })
  );

  // Mousemove (để bắt đầu kéo)
  document.dispatchEvent(
    new MouseEvent("mousemove", {
      bubbles: true,
      cancelable: true,
      clientX: draggableCoords.x + 10, // Di chuyển một chút để kích hoạt kéo
      clientY: draggableCoords.y + 10,
    })
  );

  // Series of mousemove to target
  const steps = 10;
  for (let i = 1; i <= steps; i++) {
    const clientX =
      draggableCoords.x + (targetCoords.x - draggableCoords.x) * (i / steps);
    const clientY =
      draggableCoords.y + (targetCoords.y - draggableCoords.y) * (i / steps);
    document.dispatchEvent(
      new MouseEvent("mousemove", {
        bubbles: true,
        cancelable: true,
        clientX: clientX,
        clientY: clientY,
      })
    );
    // Optional: Add a small delay for more realistic simulation
    await new Promise((resolve) => setTimeout(resolve, 100));
  }

  // Mouseup
  document.dispatchEvent(
    new MouseEvent("mouseup", {
      bubbles: true,
      cancelable: true,
      clientX: targetCoords.x,
      clientY: targetCoords.y,
    })
  );
}

export function simulateDragAndDrop(sourceEl, targetEl) {
  const rectSource = sourceEl.getBoundingClientRect();
  const rectTarget = targetEl.getBoundingClientRect();
  log("called");
  sourceEl.dispatchEvent(
    new MouseEvent("mousedown", {
      bubbles: true,
      clientX: rectSource.x + rectSource.width / 2,
      clientY: rectSource.y + rectSource.height / 2,
    })
  );

  targetEl.dispatchEvent(
    new MouseEvent("mousemove", {
      bubbles: true,
      clientX: rectTarget.x + rectTarget.width / 2,
      clientY: rectTarget.y + rectTarget.height / 2,
    })
  );

  targetEl.dispatchEvent(
    new MouseEvent("mouseup", {
      bubbles: true,
      clientX: rectTarget.x + rectTarget.width / 2,
      clientY: rectTarget.y + rectTarget.height / 2,
    })
  );
}

export function clean(question) {
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
export async function sendData(question) {
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
