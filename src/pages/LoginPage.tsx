import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { apiLogin } from "../api/auth.api";
import { useAuth } from "../store/AuthContext";

function LoginPage() {
    const navigate = useNavigate();
    const { login } = useAuth();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            const response = await apiLogin({ email, password });
            login(response.user, response.token);
            navigate("/home");
        } catch (err: any) {
            setError(err.response?.data?.message || "Login failed. Please check your credentials.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="relative flex min-h-screen items-center justify-center bg-black py-12 px-4 sm:px-6 lg:px-8">
            <div className="z-10 w-full max-w-[450px] space-y-8 rounded-lg bg-black/75 p-12 shadow-2xl border border-gray-800 backdrop-blur-sm">
                <div>
                    <h2 className="text-left text-3xl font-bold text-white">
                        Sign In
                    </h2>
                </div>
                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    <div className="space-y-4">
                        <div>
                            <input
                                id="email-address"
                                name="email"
                                type="email"
                                autoComplete="email"
                                required
                                className="relative block w-full rounded-md border-0 bg-[#333] py-4 px-4 text-white placeholder-gray-400 focus:z-10 focus:bg-[#454545] focus:outline-none focus:ring-0 sm:text-base"
                                placeholder="Email or phone number"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                autoComplete="current-password"
                                required
                                className="relative block w-full rounded-md border-0 bg-[#333] py-4 px-4 text-white placeholder-gray-400 focus:z-10 focus:bg-[#454545] focus:outline-none focus:ring-0 sm:text-base"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
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
                            {loading ? "Signing in..." : "Sign In"}
                        </button>
                    </div>

                    <div className="flex items-center justify-between text-[#b3b3b3] text-sm">
                        <div className="flex items-center">
                            <input
                                id="remember-me"
                                name="remember-me"
                                type="checkbox"
                                className="h-4 w-4 rounded border-gray-600 bg-[#333] text-gray-500 focus:ring-0 focus:ring-offset-0"
                            />
                            <label htmlFor="remember-me" className="ml-2 block">
                                Remember me
                            </label>
                        </div>
                        <div className="text-sm">
                            <Link to="/forgot-password" className="hover:underline">Forgot Password?</Link>
                        </div>
                    </div>
                </form>

                <div className="mt-16 text-left">
                    <div className="text-[#737373] text-base">
                        New to English Test Generator?{" "}
                        <Link to="/register" className="font-medium text-white hover:underline">
                            Sign up now
                        </Link>
                        .
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LoginPage;