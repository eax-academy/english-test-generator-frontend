import { useState } from "react";
import { apiChangePassword } from "../../api/auth.api";
import { useAuth } from "../../hooks/useAuth";
import styles from "./AdminPage.module.css"; 

const AdminSettings = () => {
    const { logout } = useAuth();
    const [formData, setFormData] = useState({
        currentPassword: "",
        newPassword: "",
        confirmPassword: ""
    });
    const [status, setStatus] = useState({ type: "", message: "" });
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus({ type: "", message: "" });
        setLoading(true);

        try {
            await apiChangePassword(formData);
            setStatus({ type: "success", message: "Password changed! Logging you out..." });
            setTimeout(() => logout(), 2000);
        } catch (err: any) {
            const errorMsg = err.response?.data?.error || "Failed to change password";
            setStatus({ type: "error", message: errorMsg });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={styles.adminPageContainer}>
            <h1 className="text-3xl font-bold mb-6">Account Settings</h1>
            
            <form onSubmit={handleSubmit} className="w-full max-w-md flex flex-col gap-4">
                <div className="flex flex-col gap-2">
                    <label className="text-gray-400">Current Password</label>
                    <input 
                        type="password"
                        className="p-2 rounded bg-neutral-800 border border-neutral-700 text-white"
                        required
                        value={formData.currentPassword}
                        onChange={(e) => setFormData({...formData, currentPassword: e.target.value})}
                    />
                </div>
                <div className="flex flex-col gap-2">
                    <label className="text-gray-400">New Password</label>
                    <input 
                        type="password"
                        className="p-2 rounded bg-neutral-800 border border-neutral-700 text-white"
                        required
                        value={formData.newPassword}
                        onChange={(e) => setFormData({...formData, newPassword: e.target.value})}
                    />
                </div>
                <div className="flex flex-col gap-2">
                    <label className="text-gray-400">Confirm New Password</label>
                    <input 
                        type="password"
                        className="p-2 rounded bg-neutral-800 border border-neutral-700 text-white"
                        required
                        value={formData.confirmPassword}
                        onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                    />
                </div>

                {status.message && (
                    <p className={status.type === 'error' ? "text-red-500" : "text-green-500"}>
                        {status.message}
                    </p>
                )}

                <button 
                    type="submit" 
                    disabled={loading}
                    className="mt-4 bg-red-600 hover:bg-red-700 text-white font-bold py-2 rounded transition-colors disabled:opacity-50"
                >
                    {loading ? "Updating..." : "Update Password"}
                </button>
            </form>
        </div>
    );
};

// CRITICAL: Make sure this export is here!
export default AdminSettings;