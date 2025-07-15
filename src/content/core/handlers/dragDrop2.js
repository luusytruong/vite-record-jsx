// handlers/dragDrop2.js
import {
  $,
  $$,
  createObserver,
  isAnswered,
  getText,
  sendMessage,
} from "../utils.js";

export function handleDragDrop2(el, question, observerManager) {
  const dragZones = $$(":scope > :nth-child(2) > div", el);

  for (const drag of dragZones) {
    const item = { text: getText($("h4", drag)), answer: "" };
    const answerZone = $(":scope > div", drag);

    const updateAnswer = () => {
      const updatedAnswer = getText(answerZone);
      item.answer = isAnswered(updatedAnswer) ? updatedAnswer : "";
    };

    updateAnswer();
    question.drag_map.push(item);

    const observer = createObserver(() => {
      const before = item.answer;
      updateAnswer();
      const after = item.answer;

      if (before !== after) sendMessage(question);
    });

    observer.observe(answerZone, { childList: true });
    observerManager.push(observer);
  }
}
