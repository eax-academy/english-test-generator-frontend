import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../../config/api.config";
import { getAuthHeader } from "../../api/auth.api";

const AdminSubmissionEdit = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [text, setText] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchSubmission = async () => {
            try {
                const res = await axios.get(`${BASE_URL}/admin/submissions/${id}`, { headers: getAuthHeader() });
                setText(res.data.raw_text);
            } catch (err: any) {
                setError(err.response?.data?.message || "Failed to fetch submission");
            } finally {
                setLoading(false);
            }
        };
        fetchSubmission();
    }, [id]);

    const handleSave = async () => {
        try {
            await axios.put(`${BASE_URL}/admin/submissions/${id}`, { raw_text: text }, { headers: getAuthHeader() });
            alert("Submission updated successfully!");
            navigate("/admin/submissions");
        } catch (err: any) {
            alert(err.response?.data?.message || "Failed to update submission");
        }
    };

    if (loading) return <div className="p-8 text-white">Loading...</div>;
    if (error) return <div className="p-8 text-red-500">{error}</div>;

    return (
        <div className="p-8 text-white w-full max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold mb-6 text-red-500">Edit Submission</h1>
            <div className="bg-neutral-900 p-6 rounded-lg">
                <label className="block mb-2 text-gray-400">Submission Text</label>
                <textarea
                    className="w-full h-64 p-4 bg-neutral-800 text-white rounded border border-neutral-700 focus:border-red-500 outline-none resize-none"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                />
                <div className="mt-6 flex gap-4">
                    <button
                        onClick={handleSave}
                        className="px-6 py-2 bg-red-600 hover:bg-red-700 text-white font-bold rounded transition"
                    >
                        Save Changes
                    </button>
                    <button
                        onClick={() => navigate("/admin/submissions")}
                        className="px-6 py-2 bg-neutral-700 hover:bg-neutral-600 text-white font-bold rounded transition"
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AdminSubmissionEdit;
