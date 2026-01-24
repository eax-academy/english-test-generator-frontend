
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createQuiz } from "../api/quiz.api";
import styles from "./HomePage.module.css";


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
    <div className={styles.homeContainer}>
      <form
        onSubmit={handleSubmit}
        className={styles.homeFormBox}
      >
        <input
          type="text"
          placeholder="Quiz Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className={styles.homeInput}
        />
        <textarea
          rows={10}
          placeholder="Paste your text here..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          className={styles.homeTextarea}
        />
        <select
          value={difficulty}
          onChange={(e) => setDifficulty(e.target.value as "basic" | "intermediate" | "advanced")}
          className={styles.homeSelect}
        >
          <option value="basic">Basic</option>
          <option value="intermediate">Intermediate</option>
          <option value="advanced">Advanced</option>
        </select>
        <button
          type="submit"
          disabled={loading}
          className={styles.homeButton}
        >
          {loading ? "Generating..." : "Generate Quiz"}
        </button>
      </form>
    </div>
  );
}
