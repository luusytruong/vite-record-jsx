import { handleRadio } from "./radio.js";
import { handleGroupRadio } from "./groupRadio.js";
import { handleCheckBox } from "./checkbox.js";
import { handleGrouping2 } from "./grouping2.js";
import { handleDragDrop2 } from "./dragDrop2.js";
import { handleGroupInput } from "./groupInput.js";

export const handlers = {
  radio: (...args) => handleRadio(...args),
  "group-radio": (...args) => handleGroupRadio(...args),
  "check-box": (...args) => handleCheckBox(...args),
  "grouping-2": (...args) => handleGrouping2(...args),
  "drag-drop-2": (...args) => handleDragDrop2(...args),
  "group-input": (...args) => handleGroupInput(...args),
};
