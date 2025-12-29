import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiAdminLogin } from "../../api/auth.api";
import { useAuth } from "../../store/AuthContext";

function AdminLoginPage() {
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
            const response = await apiAdminLogin({ email, password });

            // Check if user is actually admin
            if (response.user.role !== 'admin') {
                setError("Access denied. You are not an administrator.");
                return;
            }

            // Use AuthContext login to update global state
            login(response.user, response.token);

            // Redirect to admin dashboard
            navigate("/admin");
        } catch (err: any) {
            setError(err.response?.data?.error || "Admin login failed. Please check your credentials.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex min-h-screen w-full items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
            <div className="w-full max-w-2xl space-y-10 rounded-2xl bg-black/60 backdrop-blur-md p-12 shadow-2xl border border-white/10">
                <div>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-white">
                        Admin Portal
                    </h2>
                    <p className="mt-2 text-center text-sm text-gray-400">
                        Authorized personnel only
                    </p>
                </div>
                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    <div className="-space-y-px rounded-md shadow-sm">
                        <div className="mb-4">
                            <label htmlFor="email-address" className="sr-only">
                                Email address
                            </label>
                            <input
                                id="email-address"
                                name="email"
                                type="email"
                                autoComplete="email"
                                required
                                className="relative block w-full rounded-md border-0 py-2.5 px-3 text-white bg-gray-700 ring-1 ring-inset ring-gray-600 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-red-600 sm:text-sm sm:leading-6"
                                placeholder="Admin Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div>
                            <label htmlFor="password" className="sr-only">
                                Password
                            </label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                autoComplete="current-password"
                                required
                                className="relative block w-full rounded-md border-0 py-2.5 px-3 text-white bg-gray-700 ring-1 ring-inset ring-gray-600 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-red-600 sm:text-sm sm:leading-6"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                    </div>

                    {error && <div className="text-sm text-red-500 text-center">{error}</div>}

                    <div>
                        <button
                            type="submit"
                            disabled={loading}
                            className="group relative flex w-full justify-center rounded-md bg-red-600 px-3 py-2.5 text-sm font-semibold text-white hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600 disabled:opacity-70"
                        >
                            {loading ? "Verifying Access..." : "Enter Admin Panel"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default AdminLoginPage;
