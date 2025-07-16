export default function parseJSON(text) {
  const questions = [];
  const lines = text.split("\n").filter((line) => line.trim());

  let i = 0;
  while (i < lines.length) {
    const line = lines[i].trim();

    // Skip empty lines and non-question lines
    if (!line.startsWith("Question")) {
      i++;
      continue;
    }

    // Parse question header
    const questionMatch = line.match(/Question (\d+) \(([^)]+)\)/);
    if (!questionMatch) {
      i++;
      continue;
    }

    const questionNo = questionMatch[1];
    const questionType = questionMatch[2];

    // Get question text
    i++;
    const questionText = lines[i]?.trim() || "";

    const question = {
      no: questionNo,
      text: questionText,
      type: questionType,
    };

    i++;

    // Parse based on question type
    if (questionType === "radio") {
      question.options = [];

      // Parse options (A, B, C, D)
      while (i < lines.length && lines[i].match(/^[*]?[A-Z]\./)) {
        const optionLine = lines[i].trim();
        const isCorrect = optionLine.startsWith("*");
        const optionText = optionLine.replace(/^[*]?[A-Z]\.\s*/, "");

        question.options.push({
          text: optionText,
          is_correct: isCorrect,
        });
        i++;
      }
    } else if (questionType === "checkbox") {
      question.options = [];

      // Parse options with multiple correct answers
      while (i < lines.length && lines[i].match(/^[*]?[A-Z]\./)) {
        const optionLine = lines[i].trim();
        const isCorrect = optionLine.startsWith("*");
        const optionText = optionLine.replace(/^[*]?[A-Z]\.\s*/, "");

        question.options.push({
          text: optionText,
          is_correct: isCorrect,
        });
        i++;
      }
    } else if (questionType === "drag-drop-2") {
      question.candidates = [];
      question.drag_map = [];

      // Parse candidates
      while (i < lines.length && !lines[i].match(/^\d+\)/)) {
        const candidateLine = lines[i].trim();
        if (candidateLine && !candidateLine.startsWith("*")) {
          question.candidates.push(candidateLine);
        }
        i++;
      }

      // Parse drag mappings
      while (i < lines.length && lines[i].match(/^\d+\)/)) {
        const itemLine = lines[i].trim();
        const itemText = itemLine.replace(/^\d+\)\s*/, "");

        i++;
        if (i < lines.length && lines[i].startsWith("*")) {
          const answerText = lines[i].trim().replace(/^\*/, "");
          question.drag_map.push({
            text: itemText,
            answer: answerText,
          });
          i++;
        }
      }
    } else if (questionType === "grouping-2") {
      question.candidates = [];
      question.drag_map = [];

      // Parse candidates
      while (i < lines.length && !lines[i].match(/^\d+\)/)) {
        const candidateLine = lines[i].trim();
        if (candidateLine && !candidateLine.startsWith("*")) {
          question.candidates.push(candidateLine);
        }
        i++;
      }

      // Parse drag mappings with multiple answers
      while (i < lines.length && lines[i].match(/^\d+\)/)) {
        const itemLine = lines[i].trim();
        const itemText = itemLine.replace(/^\d+\)\s*/, "");

        const answers = [];
        i++;
        while (i < lines.length && lines[i].startsWith("*")) {
          const answerText = lines[i].trim().replace(/^\*/, "");
          answers.push(answerText);
          i++;
        }

        question.drag_map.push({
          text: itemText,
          answers: answers,
        });
      }
    } else if (questionType === "group-radio") {
      question.sub_questions = [];

      // Parse sub-questions
      while (i < lines.length && lines[i].match(/^\d+\)/)) {
        const subQuestionLine = lines[i].trim();
        const subQuestionNo = subQuestionLine.match(/^(\d+)\)/)[1];
        const subQuestionText = subQuestionLine.replace(/^\d+\)\s*/, "");

        const subQuestion = {
          no: subQuestionNo,
          text: subQuestionText,
          options: [],
        };

        i++;

        // Parse options for sub-question
        while (i < lines.length && lines[i].match(/^[*]?[A-Z]\./)) {
          const optionLine = lines[i].trim();
          const isCorrect = optionLine.startsWith("*");
          const optionText = optionLine.replace(/^[*]?[A-Z]\.\s*/, "");

          subQuestion.options.push({
            text: optionText,
            is_correct: isCorrect,
          });
          i++;
        }

        question.sub_questions.push(subQuestion);
      }
    } else if (questionType === "group-input") {
      question.input_answers = [];

      // Parse input answers
      while (i < lines.length && lines[i].match(/^\d+\)/)) {
        const inputLine = lines[i].trim();
        const inputText = inputLine.replace(/^\d+\)\s*/, "");

        i++;
        if (
          i < lines.length &&
          !lines[i].startsWith("Question") &&
          !lines[i].match(/^\d+\)/)
        ) {
          const value = lines[i].trim();
          question.input_answers.push({
            text: inputText,
            value: value,
          });
          i++;
        }
      }
    }

    questions.push(question);
  }

  return questions;
}
