export type Question = {
  _id: string;
  type: string;
  question: string;
  answer: string;
  options?: string[];
  wordId?: { _id: string; word: string; definition: string; translation: string };
}

export type Quiz = {
  _id: string;
  title: string;
  questions: Question[];
};

export interface User {
  _id: string;
  name: string;
  surname?: string;
  email: string;
  role?: string;
  quizCount?: number;
  createdAt: string;
}
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
  createdBy: string | User;
  createdAt: string;
  updatedAt: string;
}
export interface Result {
  _id: string;
  userId: User;
  quizId: Quiz;
  score: number;
  totalQuestions: number;
  completedAt: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  name: string;
  surname: string;
  email: string;
  password: string;
}

export interface ForgotPasswordRequest {
  email: string;
}

export interface ResetPasswordRequest {
  token: string;
  newPassword: string;
}

