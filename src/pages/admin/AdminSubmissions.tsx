import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../../config/api.config";

interface Submission {
    _id: string;
    user_id: {
        name: string;
        email: string;
    } | null;
    raw_text: string;
    createdAt: string;
}

const AdminSubmissions = () => {
    const [submissions, setSubmissions] = useState<Submission[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        fetchSubmissions();
    }, []);

    const fetchSubmissions = async () => {
        try {
            const res = await axios.get(`${BASE_URL}/admin/submissions`, { withCredentials: true });
            setSubmissions(res.data);
        } catch (err: unknown) {
            setError(err instanceof Error ? err.message : "Failed to fetch submissions");
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!window.confirm("Are you sure you want to delete this submission?")) return;
        try {
            await axios.delete(`${BASE_URL}/admin/submissions/${id}`, { withCredentials: true });
            setSubmissions((prev) => prev.filter((sub) => sub._id !== id));
        } catch (err: unknown) {
            alert(err instanceof Error ? err.message : "Failed to delete submission");
        }
    };

    if (loading) return <div className="p-8 text-white">Loading...</div>;
    if (error) return <div className="p-8 text-red-500">{error}</div>;

    return (
        <div className="p-8 text-white w-full">
            <h1 className="text-3xl font-bold mb-6 text-red-500">User Submissions</h1>
            <div className="overflow-x-auto bg-neutral-900 rounded-lg p-4">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="border-b border-neutral-700 text-gray-400">
                            <th className="p-3">User</th>
                            <th className="p-3">Date</th>
                            <th className="p-3">Snippet</th>
                            <th className="p-3">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {submissions.map((sub) => (
                            <tr key={sub._id} className="border-b border-neutral-800 hover:bg-neutral-800">
                                <td className="p-3">
                                    {sub.user_id ? (
                                        <div>
                                            <div className="font-bold">{sub.user_id.name}</div>
                                            <div className="text-sm text-gray-500">{sub.user_id.email}</div>
                                        </div>
                                    ) : (
                                        <span className="text-gray-500">Unknown User</span>
                                    )}
                                </td>
                                <td className="p-3 text-gray-400">
                                    {new Date(sub.createdAt).toLocaleDateString()}
                                </td>
                                <td className="p-3 text-gray-400 italic">
                                    "{sub.raw_text.substring(0, 50)}..."
                                </td>
                                <td className="p-3 flex gap-3">
                                    <Link
                                        to={`/admin/submissions/${sub._id}`}
                                        className="text-blue-400 hover:text-blue-300"
                                    >
                                        Edit
                                    </Link>
                                    <button
                                        onClick={() => handleDelete(sub._id)}
                                        className="text-red-500 hover:text-red-400"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {submissions.length === 0 && (
                    <div className="text-center p-6 text-gray-500">No submissions found.</div>
                )}
            </div>
        </div>
    );
};

export default AdminSubmissions;
