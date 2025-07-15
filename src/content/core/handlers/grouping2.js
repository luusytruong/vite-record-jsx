// handlers/grouping2.js
import {
  createObserver,
  isAnswered,
  getText,
  $$,
  $,
  sendMessage,
} from "../utils.js";

export function handleGrouping2(el, question, observerManager) {
  const dragZones = $$(":scope > :nth-child(2) > div", el);

  for (const drag of dragZones) {
    const text = getText($("h4", drag));
    const item = { text: text.replace(/^\d+\)\s*/, ""), answers: [] };
    const answerZone = $(":scope > div", drag);

    const collectAnswers = () => {
      item.answers = Array.from(answerZone.children)
        .map(getText)
        .filter(isAnswered);
    };

    collectAnswers();
    question.drag_map.push(item);

    const observer = createObserver(() => {
      const before = item.answers.join(",");
      collectAnswers();
      const after = item.answers.join(",");

      if (before !== after) sendMessage(question);
    });

    observer.observe(answerZone, { childList: true, subtree: true });
    observerManager.push(observer);
  }
}
