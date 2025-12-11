export type User = {
    id: string;
    name: string;
    email: string;
};

export type UserData = {
    name: string;
    email: string;
};

export type Question = {
    _id: string;
    type: "multiple-choice" | "fill-blank" | "true-false" | "fill" | "definition" | "translation";
    question: string;
    options?: string[];
    answer: string;
    difficulty: "basic" | "intermediate" | "advanced";
};

export type TestConfig = {
    difficulty: "basic" | "intermediate" | "advanced";
    questionCount: number;
};

export type CreatedQuizData = {
    title: string;
    topic: string; // Keeping topic as it was there, but maybe mapping title to topic?
    content: string; // The text to generate from
    difficulty: "basic" | "intermediate" | "advanced";
    questionCount: number;
};

export type ReturnedQuizData = {
    id: string;
    topic: string;
    difficulty: string;
    questions: Question[];
};

export type Quiz = {
    _id: string;
    title: string;
    questions: Question[];
};