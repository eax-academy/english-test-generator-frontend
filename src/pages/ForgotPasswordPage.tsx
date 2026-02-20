import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AxiosError } from "axios";
import { apiChangePassword } from "../api/auth.api";

function ForgotPasswordPage() {
    const navigate = useNavigate();
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        if (newPassword !== confirmPassword) {
            setError("New passwords do not match.");
            return;
        }

        if (currentPassword === newPassword) {
            setError("New password must be different from current password.");
            return;
        }

        setLoading(true);
        try {
            await apiChangePassword({ currentPassword, newPassword, confirmPassword });
            // After successful password change, redirect to login
            navigate("/login");
        } catch (err: unknown) {
            const error = err as AxiosError<{ error?: string }>;
            setError(error.response?.data?.error || "Failed to change password. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="relative flex min-h-screen items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="z-10 w-full max-w-[450px] space-y-8 rounded-2xl bg-black/75 p-12 shadow-2xl border border-gray-800 backdrop-blur-sm">
                <div>
                    <h2 className="text-left text-3xl font-bold text-white">
                        Change Password
                    </h2>
                    <p className="mt-2 text-left text-sm text-[#b3b3b3]">
                        Enter your current password and choose a new one.
                    </p>
                </div>

                <form className="mt-8 space-y-4" onSubmit={handleSubmit}>
                    <div>
                        <input
                            name="currentPassword"
                            type="password"
                            autoComplete="current-password"
                            required
                            className="relative block w-full rounded-md border-0 bg-[#333] py-4 px-4 text-white placeholder-gray-400 focus:z-10 focus:bg-[#454545] focus:outline-none focus:ring-0 sm:text-base"
                            placeholder="Current Password"
                            value={currentPassword}
                            onChange={(e) => setCurrentPassword(e.target.value)}
                        />
                    </div>

                    <div>
                        <input
                            name="newPassword"
                            type="password"
                            autoComplete="new-password"
                            required
                            className="relative block w-full rounded-md border-0 bg-[#333] py-4 px-4 text-white placeholder-gray-400 focus:z-10 focus:bg-[#454545] focus:outline-none focus:ring-0 sm:text-base"
                            placeholder="New Password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                        />
                    </div>

                    <div>
                        <input
                            name="confirmPassword"
                            type="password"
                            autoComplete="new-password"
                            required
                            className="relative block w-full rounded-md border-0 bg-[#333] py-4 px-4 text-white placeholder-gray-400 focus:z-10 focus:bg-[#454545] focus:outline-none focus:ring-0 sm:text-base"
                            placeholder="Confirm New Password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                    </div>

                    {error && <div className="text-sm text-[#e87c03]">{error}</div>}

                    <div>
                        <button
                            type="submit"
                            disabled={loading}
                            className="group relative flex w-full justify-center rounded-sm bg-[#E50914] px-4 py-3 text-base font-bold text-white transition hover:bg-[#b00710] focus:outline-none disabled:opacity-70"
                        >
                            {loading ? "Changing..." : "Change Password"}
                        </button>
                    </div>

                    <div className="text-left text-[#737373]">
                        <Link to="/login" className="font-medium text-white hover:underline">
                            Back to sign in
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default ForgotPasswordPage;
