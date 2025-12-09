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
    id: number;
    type: "multiple-choice" | "fill-blank" | "true-false";
    question: string;
    options?: string[];
    correctAnswer: string;
    difficulty: "basic" | "intermediate" | "advanced";
};

export type TestConfig = {
    difficulty: "basic" | "intermediate" | "advanced";
    questionCount: number;
};
