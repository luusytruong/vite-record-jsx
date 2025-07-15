// handlers/checkbox.js
import { handleQuestion } from "../utils.js";

export function handleCheckBox(el, question) {
  handleQuestion(el, question, false);
}
