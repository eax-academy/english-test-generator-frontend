import { createContext, useState } from "react";
import type { Question } from "../components/QuestionCard";

export type Quiz = {
  _id: string;
  title: string;
  questions: Question[];
};

export type QuizContextType = {
  lastQuiz?: Quiz;
  lastScore?: number;
  lastElapsedTime?: number;
  setLastResult: (quiz: Quiz, score: number, elapsedTime: number) => void;
};

// Create the context with an undefined default value
const QuizContext = createContext<QuizContextType | undefined>(undefined);

// Create a provider component
export const QuizContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [lastQuiz, setLastQuiz] = useState<Quiz>();
  const [lastScore, setLastScore] = useState<number>();
  const [lastElapsedTime, setLastElapsedTime] = useState<number>();

  const setLastResult = (quiz: Quiz, score: number, elapsedTime: number) => {
    setLastQuiz(quiz);
    setLastScore(score);
    setLastElapsedTime(elapsedTime);  
  };

  return (
    <QuizContext.Provider value={{ lastQuiz, lastScore, lastElapsedTime, setLastResult }}>
      {children}
    </QuizContext.Provider>
  );
};

export { QuizContext };  