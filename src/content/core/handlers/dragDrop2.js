// handlers/dragDrop2.js
import { handleDragCommon } from "../utils.js";

export function handleDragDrop2({ el, question, observerManager, restore }) {
  handleDragCommon(el, question, observerManager, { restore, multiple: false });
}
