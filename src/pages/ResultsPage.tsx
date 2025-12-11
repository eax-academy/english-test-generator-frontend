import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Confetti from "react-confetti";
import { Trophy, Star, Home } from "lucide-react";

import type { Quiz } from "../types/types";
import { useQuizContext } from "../hooks/useQuizContext";
import "./ResultsPage.css";

export default function ResultsPage() {
    const { quizId } = useParams();
    const navigate = useNavigate();
    const { lastQuiz, lastScore } = useQuizContext();

    const [quiz, setQuiz] = useState<Quiz | null>(lastQuiz || null);
    const [score] = useState<number>(lastScore || 0);
    const [loading, setLoading] = useState(!lastQuiz);
    const [showConfetti, setShowConfetti] = useState(false);

    // Fetch quiz logic (backup if context is empty)
    useEffect(() => {
        if (quiz || !quizId) return;

        let isMounted = true;
        // Check if lastQuiz matches quizId, otherwise fetch
        if (lastQuiz && lastQuiz._id === quizId) {
            setQuiz(lastQuiz);
            setLoading(false);
            return;
        }

        // Fetch placeholder logic - since we don't have a backend endpoint guaranteed for this yet
        // We will assume for now we rely on Context. If context is lost, we might need to rely on localStorage or handle error.
        setLoading(false); 
        
        return () => { isMounted = false; };
    }, [quizId, quiz, lastQuiz]);

    useEffect(() => {
        if (quiz) {
            const total = quiz.questions.length;
            const percentage = Math.round((score / total) * 100);
            if (percentage >= 70) {
                setShowConfetti(true);
            }
        }
    }, [quiz, score]);

    if (!quiz) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#f9fafb]">
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">Quiz Data Not Found</h2>
                    <button onClick={() => navigate('/dashboard')} className="home-btn" style={{ maxWidth: '200px', margin: '0 auto' }}>
                        Go to Dashboard
                    </button>
                </div>
            </div>
        );
    }

    const total = quiz.questions.length;
    const percentage = Math.round((score / total) * 100);
    const incorrect = total - score;

    // Determine Logic
    let title = "Keep Practicing!";
    let iconColor = "#ff9800"; // Orange default
    let stars = 0;

    if (percentage === 100) {
        title = "Perfect Score! 🏆";
        stars = 3;
    } else if (percentage >= 80) {
        title = "Excellent Job! 🌟";
        stars = 3;
    } else if (percentage >= 60) {
        title = "Great Effort! 💪";
        stars = 2;
    } else if (percentage >= 40) {
        title = "Good Start! 👍";
        stars = 1;
    }

    // Circular Progress Logic
    const radius = 50;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = circumference - (percentage / 100) * circumference;

    return (
        <div className="results-page-container">
            {showConfetti && <Confetti numberOfPieces={300} recycle={false} />}
            
            <div className="results-card">
                <div className="trophy-container">
                    <Trophy className="trophy-icon" />
                </div>
                
                <div className="results-header">
                    <h2>{title}</h2>
                    <p>You've completed the test</p>
                </div>

                <div className="stars-container">
                    {[1, 2, 3].map((s) => (
                        <Star 
                            key={s} 
                            className={`star - icon ${ s <= stars ? "filled" : "" } `} 
                        />
                    ))}
                </div>

                <div className="score-circle-container">
                    {/* SVG Circular Progress */}
                    <div style={{ position: 'relative', width: '200px', height: '200px' }}>
                        <svg className="circular-chart" viewBox="0 0 120 120" width="200" height="200">
                            <circle 
                                className="circle-bg" 
                                cx="60" 
                                cy="60" 
                                r={radius} 
                            />
                            <circle 
                                className="circle" 
                                strokeDasharray={`${ circumference } ${ circumference } `} 
                                style={{ strokeDashoffset }}
                                cx="60" 
                                cy="60" 
                                r={radius} 
                                transform="rotate(-90 60 60)"
                            />
                        </svg>
                        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', textAlign: 'center' }}>
                            <div className="score-fraction" style={{ fontSize: '2.5rem' }}>
                                {percentage}%
                            </div>
                            <div style={{ color: '#6b7280', fontSize: '0.9rem', fontWeight: 600 }}>Score</div>
                        </div>
                    </div>
                </div>

                <div className="score-fraction" style={{ fontSize: '2rem', marginTop: '-1rem' }}>
                     {score}<span style={{ fontSize: '1.25rem' }}>/{total}</span>
                </div>
                <div className="score-label" style={{ marginTop: '-1.5rem', marginBottom: '1rem' }}>Correct Answers</div>

                <div className="stats-grid">
                    <div className="stat-card correct">
                        <span className="stat-value">{score}</span>
                        <span className="stat-label">Correct</span>
                    </div>
                    <div className="stat-card incorrect">
                        <span className="stat-value">{incorrect}</span>
                        <span className="stat-label">Incorrect</span>
                    </div>
                    <div className="stat-card total">
                        <span className="stat-value">{total}</span>
                        <span className="stat-label">Total</span>
                    </div>
                </div>

                <button onClick={() => navigate('/dashboard')} className="home-btn">
                    <Home size={20} /> Back to Dashboard
                </button>
            </div>
        </div>
    );
}