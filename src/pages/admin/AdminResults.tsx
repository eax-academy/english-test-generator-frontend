import { useEffect, useState } from "react";
import { fetchAllResults } from "../../api/results.api";
import type { Result } from "../../types/types";

function AdminResults() {
  const [results, setResults] = useState<Result[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadResults = async () => {
      try {
        const data = await fetchAllResults();
        setResults(data || []);
      } catch (err) {
        console.error(err);
        setError("Failed to load results");
      } finally {
        setLoading(false);
      }
    };

    loadResults();
  }, []);

  if (loading)
    return (
      <div className="flex items-center justify-center min-h-screen text-white text-lg font-semibold">
        Loading results...
      </div>
    );

  if (error)
    return (
      <div className="flex items-center justify-center min-h-screen text-red-500 text-lg font-semibold">
        {error}
      </div>
    );

  return (
    <div className="flex-1 p-6 flex flex-col items-center min-w-0">
      <h1 className="text-2xl md:text-4xl font-bold text-white mb-6 text-center">
        All Results
      </h1>

      <div className="overflow-x-auto w-full">
        <table className="w-full min-w-[800px] bg-[#1f1f1f] shadow-xl divide-y divide-gray-700 rounded-lg">
          <thead>
            <tr className="text-center text-gray-400 uppercase text-xs md:text-xl">
              <th className="px-6 py-3">User</th>
              <th className="px-6 py-3">Email</th>
              <th className="px-6 py-3">Quiz</th>
              <th className="px-6 py-3">Score</th>
              <th className="px-6 py-3">Completed At</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-700">
            {results.length === 0 ? (
              <tr>
                <td colSpan={5} className="text-center py-6 text-gray-400">
                  No results found.
                </td>
              </tr>
            ) : (
              results.map((result: Result) => (
                <tr key={result._id} className="hover:bg-gray-800 text-center">
                  <td className="px-6 py-4 font-medium text-white">
                    {result.userId?._id || "—"}
                  </td>
                  <td className="px-6 py-4 text-gray-300">
                    {result.userId?.email || "—"}
                  </td>
                  <td className="px-6 py-4 text-gray-300">
                    {result.quizId?.title || "—"}
                  </td>
                  <td className="px-6 py-4 text-white">
                    {result.score} / {result.totalQuestions}
                  </td>
                  <td className="px-6 py-4 text-gray-400">
                    {new Date(result.completedAt).toLocaleString()}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AdminResults;
