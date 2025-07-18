// handlers/dragDrop2.js
import { handleDragCommon } from "../utils.js";

export function handleDragDrop2({ el, question, obsManager, restore }) {
  handleDragCommon(el, question, obsManager, restore, false);
}
