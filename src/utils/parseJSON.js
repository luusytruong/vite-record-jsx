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
    const questionMatch = line.match(/Question\s+(\d+)\s+\(\s*([^)]+)\s*\)/i);
    if (!questionMatch) {
      i++;
      continue;
    }

    const questionNo = questionMatch[1];
    const questionType = questionMatch[2];

    // Get question text - for group-input, collect all lines until we hit numbered items
    i++;
    let questionText = "";

    if (questionType === "group-input") {
      // For group-input, collect all text lines until we hit numbered items (1), 2), etc.)
      while (i < lines.length && !lines[i].match(/^\d+\)/)) {
        const currentLine = lines[i].trim();
        if (currentLine && !currentLine.startsWith("Question")) {
          questionText += (questionText ? " " : "") + currentLine;
        }
        i++;
      }
    } else {
      // For other types, just get the immediate next line
      questionText = lines[i]?.trim() || "";
      i++;
    }

    const question = {
      no: questionNo,
      text: questionText,
      type: questionType,
    };

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
    } else if (questionType === "check-box") {
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

      // Parse input answers - format: "1) text" followed by "answer"
      while (i < lines.length && lines[i].match(/^\d+\)/)) {
        const inputLine = lines[i].trim();
        const inputText = inputLine.replace(/^\d+\)\s*/, "");

        i++;
        // Get the answer value (next line that's not a question or numbered item)
        if (i < lines.length) {
          const nextLine = lines[i].trim();
          if (
            !nextLine.startsWith("Question") &&
            !nextLine.match(/^\d+\)/) &&
            nextLine !== ""
          ) {
            question.input_answers.push({
              text: inputText,
              value: nextLine,
            });
            i++;
          }
        }
      }
    }

    questions.push(question);
  }

  return questions;
}
