export interface CreatedQuizData {
  title: string;
  text: string;
  type: string;
  difficulty: string;
  questions: { question: string; options: string[]; answer: string }[];
  userId: string;
}

export interface ReturnedQuizData {
  _id: string;
  title: string;
  text: string;
  type: string;
  difficulty: string;
  questions: { question: string; options: string[]; answer: string }[];
  keywords: string[];
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}

export type Question = {
    _id: string;
    question: string;
    answer: string;
    type?: string;
    options?: string[];
};

export type Quiz = {
    _id: string;
    title: string;
    questions: Question[];
};
