import {useContext } from "react";
import { QuizContext, type QuizContextType } from "../store/QuizContext.tsx";

export const useQuizContext = (): QuizContextType => {
  const context = useContext(QuizContext);

  if (!context) {
    throw new Error("useQuizContext must be used within a QuizProvider");
  }
  
  return context;
};