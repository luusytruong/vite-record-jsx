// handlers/radio.js
import { handleQuestion } from "../utils.js";

export function handleRadio(el, question) {
  handleQuestion(el, question, true);
}
