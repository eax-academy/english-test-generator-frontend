import { memo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import QuestionCard from "../components/QuestionCard";

import { useQuizContext } from "../hooks/useQuizContext";
import { useTimer } from "../hooks/useTimer";
import { type Question } from "../types/types";


function QuizPage() {
    const [userAnswers, setUserAnswers] = useState<Record<string, string>>({});

    const { state } = useLocation() as { state: { quiz: { _id: string; title: string; questions: Question[] } } };
    const { setLastResult } = useQuizContext();
    const { time: elapsedTime, formatTime } = useTimer();

    const navigate = useNavigate();

    if (!state?.quiz) {
        return (
            <div className="text-center mt-20 text-red-600 font-semibold text-lg animate-pulse">
                No quiz loaded. Go back to generate one.
            </div>
        );
    }

    const { quiz } = state;
    const questions = quiz.questions;

    const handleSubmit = () => {
        const score = questions.filter(
            (q) => (userAnswers[q._id]?.toLowerCase() || "") === q.answer.toLowerCase()
        ).length;

        setLastResult(quiz, score, elapsedTime);
        navigate(`/results/${quiz._id}`);
    };

    return (
        <div className="max-w-4xl mx-auto p-8 space-y-8 min-h-screen">
            <h2 className="text-4xl font-extrabold text-center text-white mb-4 pt-4">
                Quiz: {quiz.title.charAt(0).toUpperCase() + quiz.title.slice(1)}
            </h2>

            <div className="text-center text-green-300 text-xl font-bold">
                Time spent: <span>{formatTime(elapsedTime)}</span>
            </div>

            <div className="space-y-6">
                {questions.map((q, i) => (
                    <QuestionCard
                        key={q._id}
                        q={q}
                        index={i}
                        userAnswers={userAnswers}
                        setUserAnswers={setUserAnswers}
                        checked={false}
                    />
                ))}
            </div>

            <button
                onClick={handleSubmit}
                className="w-full bg-red-700 hover:bg-red-800 text-white font-bold py-4 rounded-2xl shadow-xl transition-all duration-300 transform hover:-translate-y-1 hover:scale-105 cursor-pointer"
            >
                Submit Quiz
            </button>
        </div>
    );
}

export default memo(QuizPage);
