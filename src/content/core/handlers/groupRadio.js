// handlers/groupRadio.js
import { extractSubQuestion } from "../extractHead.js";
import { $$, handleQuestion } from "../utils.js";

export function handleGroupRadio(el, question) {
  const subQuestions = $$(".question-type-group-radio__element", el);

  for (const subQuestion of subQuestions) {
    const subQuestionSchema = extractSubQuestion(subQuestion);
    handleQuestion(subQuestion, subQuestionSchema, true, question);
    question.sub_questions.push(subQuestionSchema);
  }
}
