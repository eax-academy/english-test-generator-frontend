
import { useEffect, useState } from "react";
import axios from "axios";
import { QUIZ_API, ADMIN_QUIZZES_API } from "../../config/api.config";
import type { ReturnedQuizData, User } from "../../types/types";
import styles from "./AdminPage.module.css";

function AdminQuizzes() {
  const [quizzes, setQuizzes] = useState<ReturnedQuizData[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [difficultyFilter, setDifficultyFilter] = useState("all");
  const [selectedQuiz, setSelectedQuiz] = useState<ReturnedQuizData | null>(null);

  useEffect(() => {
    fetchQuizzes();
  }, []);

  const fetchQuizzes = async () => {
    try {
      const res = await axios.get(QUIZ_API, { withCredentials: true });
      setQuizzes(res.data);
    } catch (error) {
      console.error("Failed to fetch quizzes", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this quiz? This action cannot be undone.")) return;

    try {
      await axios.delete(`${ADMIN_QUIZZES_API}/${id}`, { withCredentials: true });
      setQuizzes(prev => prev.filter(q => q._id !== id));
    } catch (error) {
      console.error("Failed to delete quiz", error);
      alert("Failed to delete quiz");
    }
  };

  const filteredQuizzes = quizzes.filter(quiz => {
    const creator = typeof quiz.createdBy === 'object' ? (quiz.createdBy as User) : null;
    const creatorName = creator ? `${creator.name} ${creator.surname || ''}` : '';

    const matchesSearch = quiz.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      creatorName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDifficulty = difficultyFilter === "all" || quiz.difficulty === difficultyFilter;

    return matchesSearch && matchesDifficulty;
  });

  if (loading) return <div className={styles.adminPageContainer}>Loading quizzes...</div>;

  return (
    <div className={styles.adminPageContainer}>
      {/* MODAL */}
      {selectedQuiz && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-gray-900 rounded-2xl border border-gray-700 shadow-2xl w-full max-w-2xl overflow-hidden relative animate-scale-in">
            {/* Header */}
            <div className="bg-gray-800/50 p-6 border-b border-gray-700 flex justify-between items-center">
              <h3 className="text-xl font-bold text-white">Quiz Details</h3>
              <button
                onClick={() => setSelectedQuiz(null)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Content */}
            <div className="p-6 space-y-6 max-h-[70vh] overflow-y-auto custom-scrollbar">
              <div>
                <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Title</label>
                <p className="text-lg text-white leading-relaxed">{selectedQuiz.title}</p>
              </div>

              {/* Additional details example (if needed) */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Difficulty</label>
                  <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium border ${selectedQuiz.difficulty === 'advanced' ? 'bg-red-500/10 text-red-400 border-red-500/20' :
                    selectedQuiz.difficulty === 'intermediate' ? 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20' :
                      'bg-green-500/10 text-green-400 border-green-500/20'
                    }`}>
                    {selectedQuiz.difficulty.charAt(0).toUpperCase() + selectedQuiz.difficulty.slice(1)}
                  </span>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Date Created</label>
                  <p className="text-gray-300">{new Date(selectedQuiz.createdAt).toLocaleDateString()}</p>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="bg-gray-800/50 p-6 border-t border-gray-700 flex justify-end">
              <button
                onClick={() => setSelectedQuiz(null)}
                className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors font-medium"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      <div className={styles.adminPageSection}>
        <h2 className={styles.adminPageTitle}>All Quizzes</h2>
        <div className="text-sm text-gray-400" style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
          Showing <span style={{ color: '#fff', fontWeight: 700 }}>{filteredQuizzes.length}</span> of {quizzes.length} quizzes
        </div>

        {/* FILTERS TOOLBAR */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.5rem' }}>
          <input
            type="text"
            placeholder="Search by title or creator..."
            style={{ flex: 1, minWidth: 200, padding: '0.7rem 1rem', borderRadius: '0.5rem', border: '1px solid #444', background: '#18181b', color: '#fff' }}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <select
            value={difficultyFilter}
            onChange={(e) => setDifficultyFilter(e.target.value)}
            style={{ padding: '0.7rem 1rem', borderRadius: '0.5rem', border: '1px solid #444', background: '#18181b', color: '#fff' }}
          >
            <option value="all">All Difficulties</option>
            <option value="basic">Basic</option>
            <option value="intermediate">Intermediate</option>
            <option value="advanced">Advanced</option>
          </select>
        </div>

        {/* QUIZ LIST */}
        <div className={styles.adminPageSection}>
          <div style={{ overflowX: "auto", width: "100%", WebkitOverflowScrolling: "touch" }}>
            <table className={styles.adminTable}>
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Difficulty</th>
                  <th>Created By</th>
                  <th>Date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredQuizzes.length > 0 ? (
                  filteredQuizzes.map((quiz) => {
                    const creator = typeof quiz.createdBy === 'object' ? (quiz.createdBy as User) : null;

                    return (
                      <tr key={quiz._id}>
                        <td title={quiz.title}>{quiz.title}</td>
                        <td>{quiz.difficulty.charAt(0).toUpperCase() + quiz.difficulty.slice(1)}</td>
                        <td>{creator ? `${creator.name} ${creator.surname}` : <span style={{ color: '#888' }}>Unknown</span>}</td>
                        <td>{new Date(quiz.createdAt).toLocaleDateString()}</td>
                        <td>
                          <button onClick={() => setSelectedQuiz(quiz)} className={styles.adminActionButton} title="View Full Details">View</button>
                          <button onClick={() => handleDelete(quiz._id)} className={styles.adminActionButton} title="Delete Quiz">Delete</button>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan={5} style={{ textAlign: 'center', color: '#888', padding: '2rem 0' }}>
                      <div>No quizzes found.<br />Try adjusting your search or filters.</div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminQuizzes;