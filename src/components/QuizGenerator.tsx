import { useState } from 'react';
import { createQuiz } from '../services/quizService';
import { useLocation, useNavigate } from 'react-router-dom';
import type { CreatedQuizData } from '../types/types';

import './QuizGenerator.css';

interface QuizGeneratorProps {
    initialDifficulty?: "basic" | "intermediate" | "advanced";
    onClose?: () => void;
}

const QuizGenerator = ({ initialDifficulty, onClose }: QuizGeneratorProps) => {
    const location = useLocation();
    const navigate = useNavigate();
    const stateDifficulty = location.state?.difficulty as "basic" | "intermediate" | "advanced" | undefined;
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [difficulty, setDifficulty] = useState<"basic" | "intermediate" | "advanced">(initialDifficulty || stateDifficulty || "basic");
    const [isLoading, setIsLoading] = useState(false);

    const handleGenerate = async () => {
        if (!title || !content) {
            alert("Please fill in all fields");
            return;
        }

        setIsLoading(true);
        try {
            const quizData: CreatedQuizData = {
                title,
                topic: title, // Mapping title to topic for now
                content,
                difficulty,
                questionCount: 5 // Default
            };
            const result = await createQuiz(quizData);
            console.log("Quiz created:", result);
            navigate(`/quiz/${result.id}`, { state: { quiz: result } });
        } catch (error) {
            console.error(error);
            alert("Failed to generate quiz");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="quiz-generator-overlay">
            <div className="quiz-generator-card">
                <button
                    onClick={onClose || (() => navigate(-1))}
                    className="close-btn"
                >
                    ✕
                </button>

                <div className="space-y-6"> {/* Keep this simple utility or replace with simple style */}
                    {/* Title Input */}
                    <div className="input-group">
                        <input
                            type="text"
                            placeholder="Quiz Title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="quiz-input"
                        />
                    </div>

                    {/* Content Textarea */}
                    <div className="input-group">
                        <textarea
                            placeholder="Paste your text here..."
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            className="quiz-textarea"
                        />
                    </div>

                    {/* Difficulty Selector (Conditional) */}
                    {!stateDifficulty && (
                        <div className="input-group">
                            <select
                                value={difficulty}
                                onChange={(e) => setDifficulty(e.target.value as any)}
                                className="quiz-select"
                            >
                                <option value="basic">Basic</option>
                                <option value="intermediate">Intermediate</option>
                                <option value="advanced">Advanced</option>
                            </select>
                            <div className="select-arrow">
                                ▼
                            </div>
                        </div>
                    )}

                    {/* Generate Button */}
                    <button
                        onClick={handleGenerate}
                        disabled={isLoading}
                        className="generate-btn"
                    >
                        {isLoading ? 'Generating...' : 'Generate Quiz'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default QuizGenerator;
