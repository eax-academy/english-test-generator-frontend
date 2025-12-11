import { memo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { X } from "lucide-react";

import { useQuizContext } from "../hooks/useQuizContext";
import { useTimer } from "../hooks/useTimer";
import { type Question } from "../types/types";
import "./QuizPage.css";

function QuizPage() {
    const { state } = useLocation() as { state: { quiz: { _id: string; title: string; questions: Question[]; difficulty: string } } };
    const navigate = useNavigate();
    const { setLastResult } = useQuizContext();
    const { time: elapsedTime, formatTime } = useTimer();

    const [userAnswers, setUserAnswers] = useState<Record<string, string>>({});
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

    if (!state?.quiz) {
        return (
            <div className="text-center mt-20 text-red-600 font-semibold text-lg animate-pulse">
                No quiz loaded. Go back to generate one.
            </div>
        );
    }

    const { quiz } = state;
    const questions = quiz.questions;
    const totalQuestions = questions.length;
    const currentQuestion = questions[currentQuestionIndex];
    const progress = ((currentQuestionIndex + 1) / totalQuestions) * 100;

    const handleAnswerSelect = (answer: string) => {
        setUserAnswers(prev => ({ ...prev, [currentQuestion._id]: answer }));
    };

    const handleNext = () => {
        if (currentQuestionIndex < totalQuestions - 1) {
            setCurrentQuestionIndex(prev => prev + 1);
        } else {
            handleSubmit();
        }
    };

    const handlePrev = () => {
        if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex(prev => prev - 1);
        }
    };

    const jumpToQuestion = (index: number) => {
        setCurrentQuestionIndex(index);
    };

    const handleSubmit = () => {
        const score = questions.filter(
            (q) => (userAnswers[q._id]?.toLowerCase() || "") === q.answer.toLowerCase()
        ).length;

        setLastResult(quiz, score, elapsedTime);
        navigate(`/results/${quiz._id}`);
    };

    const handleExit = () => {
        if (window.confirm("Are you sure you want to exit? Your progress will be lost.")) {
            navigate('/dashboard');
        }
    };

    return (
        <div className="quiz-page-container">
            {/* Header */}
            <div className="quiz-header">
                <div className="quiz-meta-bar">
                    <button onClick={handleExit} className="exit-btn">
                        <X size={20} /> Exit Test
                    </button>
                    <div className="timer-display">
                        🕒 {formatTime(elapsedTime)}
                    </div>
                    <div className="question-counter">
                        Question {currentQuestionIndex + 1} of {totalQuestions}
                    </div>
                </div>
                <div className="progress-track">
                    <div className="progress-bar" style={{ width: `${progress}%` }}></div>
                </div>
            </div>

            {/* Content Area */}
            <div className="question-container">
                <span className="difficulty-badge">{quiz.difficulty || "General"}</span>

                <h2 className="question-text">
                    {currentQuestion.question}
                </h2>

                <div className="options-list">
                    {currentQuestion.type === "fill" ? (
                        <input
                            type="text"
                            value={userAnswers[currentQuestion._id] || ""}
                            onChange={(e) => handleAnswerSelect(e.target.value)}
                            className="quiz-input-field"
                            placeholder="Type your answer here..."
                        />
                    ) : (
                        currentQuestion.options?.map((opt, idx) => (
                            <div
                                key={idx}
                                className={`option-item ${userAnswers[currentQuestion._id] === opt ? "selected" : ""}`}
                                onClick={() => handleAnswerSelect(opt)}
                            >
                                <div className="option-radio"></div>
                                <span className="option-text">{opt}</span>
                            </div>
                        ))
                    )}
                </div>
            </div>

            {/* Navigation Controls */}
            <div className="nav-controls">
                <button
                    onClick={handlePrev}
                    className="nav-btn prev"
                    disabled={currentQuestionIndex === 0}
                    style={{ opacity: currentQuestionIndex === 0 ? 0.5 : 1, cursor: currentQuestionIndex === 0 ? 'default' : 'pointer' }}
                >
                    Previous
                </button>
                <button
                    onClick={handleNext}
                    className="nav-btn next"
                >
                    {currentQuestionIndex === totalQuestions - 1 ? "Submit Quiz" : "Next Question"}
                </button>
            </div>

            {/* Quick Navigation (Pagination Dots) */}
            <div className="quick-nav">
                {questions.map((q, idx) => (
                    <button
                        key={q._id}
                        onClick={() => jumpToQuestion(idx)}
                        className={`nav-dot 
                            ${currentQuestionIndex === idx ? "active" : ""} 
                            ${userAnswers[q._id] && currentQuestionIndex !== idx ? "answered" : ""}
                        `}
                    >
                        {idx + 1}
                    </button>
                ))}
            </div>
        </div>
    );
}

export default memo(QuizPage);