// handlers/grouping2.js
import { handleDragCommon } from "../utils.js";

export function handleGrouping2({ el, question, obsManager, restore }) {
  handleDragCommon(el, question, obsManager, restore, true);
}
