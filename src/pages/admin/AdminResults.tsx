import { useEffect, useState } from "react";
import { fetchAllResults } from "../../api/results.api";
import type { Result } from "../../types/types";
import styles from "./AdminPage.module.css";

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
      <div className={styles.adminPageContainer}>Loading results...</div>
    );

  if (error)
    return (
      <div className={styles.adminPageContainer} style={{color:'#ff4d4d'}}>{error}</div>
    );

  return (
    <div className={styles.adminPageContainer}>
      <div className={styles.adminPageSection}>
        <h1 className={styles.adminPageTitle}>All Results</h1>
        <div style={{overflowX:'auto', width:'100%'}}>
          <table className={styles.adminTable}>
            <thead>
              <tr>
                <th>User</th>
                <th>Email</th>
                <th>Quiz</th>
                <th>Score</th>
                <th>Completed At</th>
              </tr>
            </thead>
            <tbody>
              {results.length === 0 ? (
                <tr>
                  <td colSpan={5} style={{textAlign:'center', color:'#888', padding:'2rem 0'}}>No results found.</td>
                </tr>
              ) : (
                results.map((result: Result) => (
                  <tr key={result._id}>
                    <td>{result.userId?._id || "—"}</td>
                    <td>{result.userId?.email || "—"}</td>
                    <td>{result.quizId?.title || "—"}</td>
                    <td>{result.score} / {result.totalQuestions}</td>
                    <td>{new Date(result.completedAt).toLocaleString()}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default AdminResults;
