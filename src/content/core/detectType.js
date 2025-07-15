// core/detectType.js
import { $ } from "./utils.js";

export function detectType() {
  const tagList = [
    "radio",
    "group-radio",
    "check-box",
    "grouping-2",
    "drag-drop-2",
    "group-input",
  ];

  for (const tag of tagList) {
    const el = $(`question-type-${tag}`);
    if (el) return { type: tag, el };
  }
  return { type: "unknown", el: null };
}
