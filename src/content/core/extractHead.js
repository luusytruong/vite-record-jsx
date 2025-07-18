// extractHead.js
import { $, extractNumber, getText } from "./utils.js";

export function extractMainQuestion() {
  return {
    no: extractNumber(getText($("fieldset legend"))),
    text: getText($("fieldset div")),
    img_src: $("fieldset img")?.src || "",
    sub_questions: [],
    input_answers: [],
    candidates: [],
    drag_map: [],
    options: [],
  };
}

export function extractSubQuestion(el) {
  const text = getText($(":scope > label", el));
  return {
    no: extractNumber(getText($(":scope > label > b", el))),
    text: text.replace(/^\d+\)\s*/, ""),
  };
}
