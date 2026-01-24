import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createQuiz } from "../api/quiz.api";


export default function HomePage() {
  const [text, setText] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [difficulty, setDifficulty] = useState<"basic" | "intermediate" | "advanced">("basic");

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!text.trim() || !title.trim()) {
      alert("Please enter both title and text.");
      return;
    }

    setLoading(true);

    try {
      const quiz = await createQuiz({
        title,
        text,
        type: "mixed",
        difficulty,
        questions: [],
        userId: "temp-user",
      });

      console.log("Created quiz ID:", quiz._id);
      navigate(`/quiz/${quiz._id}`, { state: { quiz } });

    } catch (error) {
      console.error(error);
      alert("Failed to generate quiz. Check console.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center p-6">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-3xl p-8 rounded-3xl shadow-2xl space-y-6 bg-[#141414] animate-fadeIn"
      >
        <input
          type="text"
          placeholder="Quiz Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full px-5 py-3 border border-gray-700 bg-[#1f1f1f] text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-red-600 transition-all duration-300"
        />

        <textarea
          rows={10}
          placeholder="Paste your text here..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="w-full px-5 py-3 mb-4 border border-gray-700 bg-[#1f1f1f] text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-red-600 transition-all duration-300"
        />

        <select
          value={difficulty}
          onChange={(e) => setDifficulty(e.target.value as "basic" | "intermediate" | "advanced")}
          className="w-full px-5 py-3 border border-gray-700 bg-[#1f1f1f] text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-red-600 transition-all duration-300 mb-4 cursor-pointer"
        >
          <option value="basic">Basic</option>
          <option value="intermediate">Intermediate</option>
          <option value="advanced">Advanced</option>
        </select>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-4 bg-red-600 text-white font-bold rounded-2xl shadow-xl hover:bg-red-700 transition-all duration-300 transform hover:-translate-y-1 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
        >
          {loading ? "Generating..." : "Generate Quiz"}
        </button>
      </form>
    </div>
  );
}
