import { useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { apiResetPassword } from "../api/auth.api";

function ResetPasswordPage() {
    const navigate = useNavigate();
    const { token } = useParams<{ token: string }>();
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setMessage("");

        if (!token) {
            setError("Invalid reset token.");
            return;
        }

        if (password !== confirmPassword) {
            setError("Passwords do not match");
            return;
        }

        setLoading(true);

        try {
            await apiResetPassword({ token, newPassword: password });
            setMessage("Your password changed successfully.");
            setTimeout(() => {
                navigate("/login");
            }, 3000);
        } catch (err: any) {
            setError(err.response?.data?.message || "Failed to reset password. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="relative flex min-h-screen items-center justify-center bg-black py-12 px-4 sm:px-6 lg:px-8">
            <div className="z-10 w-full max-w-[450px] space-y-8 rounded-lg bg-black/75 p-12 shadow-2xl border border-gray-800 backdrop-blur-sm">
                <div>
                    <h2 className="text-left text-3xl font-bold text-white">
                        Set New Password
                    </h2>
                </div>

                {message ? (
                    <div className="rounded-md bg-green-500/20 p-4 border border-green-500/50">
                        <p className="text-sm font-medium text-green-400">{message}</p>
                        <p className="mt-2 text-sm text-green-300">Redirecting to login...</p>
                    </div>
                ) : (
                    <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                        <div className="space-y-4">
                            <div>
                                <input
                                    name="password"
                                    type="password"
                                    autoComplete="new-password"
                                    required
                                    className="relative block w-full rounded-md border-0 bg-[#333] py-4 px-4 text-white placeholder-gray-400 focus:z-10 focus:bg-[#454545] focus:outline-none focus:ring-0 sm:text-base"
                                    placeholder="New Password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
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
                        </div>

                        {error && <div className="text-sm text-[#e87c03]">{error}</div>}

                        <div>
                            <button
                                type="submit"
                                disabled={loading}
                                className="group relative flex w-full justify-center rounded-[4px] bg-[#E50914] px-4 py-3 text-base font-bold text-white transition hover:bg-[#b00710] focus:outline-none disabled:opacity-70"
                            >
                                {loading ? "Resetting..." : "Reset Password"}
                            </button>
                        </div>

                        <div className="text-left text-[#737373]">
                            <Link to="/login" className="font-medium text-white hover:underline">
                                Back to sign in
                            </Link>
                        </div>
                    </form>
                )}
            </div>
        </div>
    );
}

export default ResetPasswordPage;
