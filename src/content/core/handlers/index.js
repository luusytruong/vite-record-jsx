import { handleRadio } from "./radio.js";
import { handleGroupRadio } from "./groupRadio.js";
import { handleCheckBox } from "./checkbox.js";
import { handleGrouping2 } from "./grouping2.js";
import { handleDragDrop2 } from "./dragDrop2.js";
import { handleGroupInput } from "./groupInput.js";

export const handlers = {
  radio: (el, question, ...args) => handleRadio(el, question, ...args),
  "group-radio": (el, question, ...args) =>
    handleGroupRadio(el, question, ...args),
  "check-box": (el, question, ...args) => handleCheckBox(el, question, ...args),
  "grouping-2": (el, question, ...args) =>
    handleGrouping2(el, question, ...args),
  "drag-drop-2": (el, question, ...args) =>
    handleDragDrop2(el, question, ...args),
  "group-input": (el, question) => handleGroupInput(el, question),
};
