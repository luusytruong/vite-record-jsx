// handlers/groupRadio.js
import { extractSubQuestion } from "../extractHead.js";
import { $$, handleQuestion } from "../utils.js";

export function handleGroupRadio({ el, question, restore }) {
  const subQuestions = $$(".question-type-group-radio__element", el);
  const restoredSubQuestions =
    restore
      ?.filter(
        (q) => q?.type === "group-radio" && Array.isArray(q.sub_questions)
      )
      .flatMap((q) => q.sub_questions) || [];

  for (const subQuestion of subQuestions) {
    const subQuestionSchema = extractSubQuestion(subQuestion);
    handleQuestion({
      el: subQuestion,
      question: subQuestionSchema,
      isRadio: true,
      parentQuestion: question,
      restore: restoredSubQuestions,
    });
    question.sub_questions.push(subQuestionSchema);
  }
}
