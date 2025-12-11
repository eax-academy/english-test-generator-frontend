import { memo } from "react";
import { type Question } from "../types/types";
interface QuestionCardProps {
    q: Question;
    index: number;
    userAnswers: Record<string, string>;
    setUserAnswers: React.Dispatch<React.SetStateAction<Record<string, string>>>;
    checked: boolean;
    onCheck?: () => void;
}


function QuestionCard({ q, index, userAnswers, setUserAnswers, checked, onCheck }: QuestionCardProps) {
    const handleChange = (value: string) => {
        setUserAnswers(prev => ({ ...prev, [q._id]: value }));
    };

    const isCorrect = checked && (userAnswers[q._id]?.toLowerCase() || "") === q.answer.toLowerCase();
    const isWrong = checked && !isCorrect;

    return (
        <div
            className={`
        p-6 rounded-2xl shadow-lg transition-all duration-500 transform
        ${!checked
                    ? "cursor-pointer hover:shadow-2xl hover:-translate-y-1 hover:scale-[1.02] border border-gray-700 bg-[#1f1f1f] text-white"
                    : isCorrect
                        ? "border-2 border-green-500 bg-green-900 text-white"
                        : "border-2 border-red-600 bg-red-900 text-white animate-shake"
                }`}
        >
            <h3 className="text-xl font-semibold mb-4 text-white drop-shadow-[0_0_6px_rgba(0,0,0,0.8)]">
                {index + 1}. {q.question}
            </h3>

            {q.type === "fill" && (
                <input
                    type="text"
                    value={userAnswers[q._id] || ""}
                    onChange={(e) => handleChange(e.target.value)}
                    disabled={checked}
                    className={`w-full px-4 py-3 border rounded-lg text-white placeholder-neutral-500 focus:outline-none focus:ring-2
            transition-all duration-300
            ${checked ? (isCorrect ? "border-green-500 bg-green-800" : "border-red-600 bg-red-800") : "border-neutral-700 bg-neutral-900"}
          `}
                    placeholder="Your answer..."
                />
            )}

            {(q.type === "definition" || q.type === "translation") &&
                q.options?.map((opt, i) => (
                    <label
                        key={i}
                        className={`flex items-center space-x-3 mt-3 cursor-pointer transition-colors
              ${!checked ? "hover:text-red--500" : isCorrect && userAnswers[q._id] === opt ? "text-green-300 font-semibold" : ""}
            `}
                    >
                        <input
                            type="radio"
                            name={q._id}
                            value={opt}
                            checked={userAnswers[q._id] === opt}
                            onChange={() => handleChange(opt)}
                            disabled={checked}
                            className="accent-red-600 w-5 h-5"
                        />
                        <span className="text-md">{opt.toLowerCase()}</span>
                    </label>
                ))}

            {checked && isCorrect && (
                <p className="text-green-400 mt-3 font-bold text-lg flex items-center">
                    Correct ✔
                </p>
            )}
            {checked && isWrong && (
                <p className="text-red-400 mt-3 text-lg">
                    Correct: <b>{q.answer}</b> ❌
                </p>
            )}

            {!checked && onCheck && (
                <button
                    onClick={onCheck}
                    className="mt-3 px-4 py-1 bg-green-500 text-white rounded hover:bg-green-700 transition cursor-pointer"
                >
                    Check Answer
                </button>
            )}
        </div>
    );
}

export default memo(QuestionCard);
