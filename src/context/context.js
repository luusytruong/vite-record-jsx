import { createContext, useContext } from "react";

export const QuestionContext = createContext();
export const useQuestions = () => {
  if (!QuestionContext)
    throw new Error("QuestionContext is not used within a QuestionProvider");
  return useContext(QuestionContext);
};
