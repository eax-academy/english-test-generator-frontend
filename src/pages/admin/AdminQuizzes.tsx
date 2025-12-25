import { useEffect, useState } from "react";
import axios from "axios";
import { QUIZ_API, ADMIN_QUIZZES_API } from "../../config/api.config";
import { getAuthHeader } from "../../api/auth.api";
import type { ReturnedQuizData, User } from "../../types/types";

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
      const res = await axios.get(QUIZ_API, { headers: getAuthHeader() });
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
      await axios.delete(`${ADMIN_QUIZZES_API}/${id}`, { headers: getAuthHeader() });
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

  if (loading) return <div className="text-white p-8 animate-pulse">Loading quizzes...</div>;

  return (
    <div className="space-y-6 animate-fade-in relative">
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

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h2 className="text-3xl font-bold text-white">All Quizzes</h2>
        <div className="text-sm text-gray-400">
          Showing <span className="text-white font-bold">{filteredQuizzes.length}</span> of {quizzes.length} quizzes
        </div>
      </div>

      {/* FILTERS TOOLBAR */}
      <div className="bg-gray-800/50 backdrop-blur-sm p-4 rounded-xl border border-gray-700 flex flex-col sm:flex-row gap-4">
        <div className="flex-1 relative">
          <svg className="w-5 h-5 absolute left-3 top-2.5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            placeholder="Search by title or creator..."
            className="w-full bg-gray-900/50 text-white rounded-lg pl-10 pr-4 py-2 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-500 transition-all"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <select
          value={difficultyFilter}
          onChange={(e) => setDifficultyFilter(e.target.value)}
          className="bg-gray-900/50 text-white rounded-lg px-4 py-2 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
        >
          <option value="all">All Difficulties</option>
          <option value="basic">Basic</option>
          <option value="intermediate">Intermediate</option>
          <option value="advanced">Advanced</option>
        </select>
      </div>

      {/* QUIZ LIST */}
      <div className="overflow-hidden rounded-xl border border-gray-700 shadow-xl bg-gray-800">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-700">
            <thead className="bg-gray-900/80">
              <tr>
                <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">Title</th>
                <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">Difficulty</th>
                <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">Created By</th>
                <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">Date</th>
                <th scope="col" className="px-6 py-4 text-right text-xs font-semibold text-gray-400 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700 bg-gray-800/50">
              {filteredQuizzes.length > 0 ? (
                filteredQuizzes.map((quiz) => {
                  const creator = typeof quiz.createdBy === 'object' ? (quiz.createdBy as User) : null;

                  return (
                    <tr key={quiz._id} className="group hover:bg-gray-700/50 transition-colors duration-150">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-white max-w-[300px] truncate" title={quiz.title}>
                          {quiz.title}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium border ${quiz.difficulty === 'advanced' ? 'bg-red-500/10 text-red-400 border-red-500/20' :
                          quiz.difficulty === 'intermediate' ? 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20' :
                            'bg-green-500/10 text-green-400 border-green-500/20'
                          }`}>
                          {quiz.difficulty.charAt(0).toUpperCase() + quiz.difficulty.slice(1)}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                        {creator ? (
                          <div className="flex items-center gap-2">
                            <div className="w-6 h-6 rounded-full bg-gray-600 flex items-center justify-center text-xs text-white uppercase">
                              {creator.name.charAt(0)}
                            </div>
                            {creator.name} {creator.surname}
                          </div>
                        ) : (
                          <span className="text-gray-500 italic">Unknown</span>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                        {new Date(quiz.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => setSelectedQuiz(quiz)}
                            className="text-gray-400 hover:text-blue-400 transition-colors p-2 rounded-lg hover:bg-blue-500/10"
                            title="View Full Details"
                          >
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                            </svg>
                          </button>
                          <button
                            onClick={() => handleDelete(quiz._id)}
                            className="text-gray-400 hover:text-red-400 transition-colors p-2 rounded-lg hover:bg-red-500/10"
                            title="Delete Quiz"
                          >
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-gray-500">
                    <p className="text-lg">No quizzes found.</p>
                    <p className="text-sm">Try adjusting your search or filters.</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default AdminQuizzes;