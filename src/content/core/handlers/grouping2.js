// handlers/grouping2.js
import { handleDragCommon } from "../utils.js";

export function handleGrouping2({ el, question, observerManager, restore }) {
  handleDragCommon(el, question, observerManager, { restore, multiple: true });
}
