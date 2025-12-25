import { useState } from "react";
import { Link } from "react-router-dom";
import { apiForgotPassword } from "../api/auth.api";

function ForgotPasswordPage() {
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setMessage("");
        setLoading(true);

        try {
            await apiForgotPassword({ email });
            setMessage("Check your email for the reset link.");
        } catch (err: any) {
            setError(err.response?.data?.message || "Failed to process request. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="relative flex min-h-screen items-center justify-center bg-black py-12 px-4 sm:px-6 lg:px-8">
            <div className="z-10 w-full max-w-[450px] space-y-8 rounded-lg bg-black/75 p-12 shadow-2xl border border-gray-800 backdrop-blur-sm">
                <div>
                    <h2 className="text-left text-3xl font-bold text-white">
                        Forgot Password
                    </h2>
                    <p className="mt-2 text-left text-sm text-[#b3b3b3]">
                        Enter your email and we'll send you a reset link.
                    </p>
                </div>

                {message ? (
                    <div className="rounded-md bg-green-500/20 p-4 border border-green-500/50">
                        <p className="text-sm font-medium text-green-400">{message}</p>
                        <div className="mt-4 text-center">
                            <Link to="/login" className="font-medium text-white hover:underline">
                                Return to sign in
                            </Link>
                        </div>
                    </div>
                ) : (
                    <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                        <div>
                            <input
                                name="email"
                                type="email"
                                autoComplete="email"
                                required
                                className="relative block w-full rounded-md border-0 bg-[#333] py-4 px-4 text-white placeholder-gray-400 focus:z-10 focus:bg-[#454545] focus:outline-none focus:ring-0 sm:text-base"
                                placeholder="Email address"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>

                        {error && <div className="text-sm text-[#e87c03]">{error}</div>}

                        <div>
                            <button
                                type="submit"
                                disabled={loading}
                                className="group relative flex w-full justify-center rounded-[4px] bg-[#E50914] px-4 py-3 text-base font-bold text-white transition hover:bg-[#b00710] focus:outline-none disabled:opacity-70"
                            >
                                {loading ? "Sending..." : "Send Reset Link"}
                            </button>
                        </div>

                        <div className="text-left text-[#737373]">
                            Remember your password?{" "}
                            <Link to="/login" className="font-medium text-white hover:underline">
                                Sign in now
                            </Link>
                            .
                        </div>
                    </form>
                )}
            </div>
        </div>
    );
}

export default ForgotPasswordPage;
