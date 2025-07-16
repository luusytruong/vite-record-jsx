// handlers/radio.js
import { handleQuestion } from "../utils.js";

export function handleRadio({ el, question, restore }) {
  handleQuestion({ el, question, restore, isRadio: true });
}
