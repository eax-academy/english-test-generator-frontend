import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { apiRegister } from "../api/auth.api";

function RegisterPage() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: "",
        surname: "",
        email: "",
        password: "",
        confirmPassword: "",
    });
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        if (formData.password !== formData.confirmPassword) {
            setError("Passwords do not match");
            return;
        }

        setLoading(true);

        try {
            await apiRegister({
                name: formData.name,
                surname: formData.surname,
                email: formData.email,
                password: formData.password,
            });
            navigate("/login");
        } catch (err) {
            const error = err as { response?: { data?: { message?: string } } };
            setError(error.response?.data?.message || "Registration failed. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="relative flex min-h-screen items-center justify-center bg-black py-12 px-4 sm:px-6 lg:px-8">
            <div className="z-10 w-full max-w-[450px] space-y-8 rounded-lg bg-black/75 p-12 shadow-2xl border border-gray-800 backdrop-blur-sm">
                <div>
                    <h2 className="text-left text-3xl font-bold text-white">
                        Sign Up
                    </h2>
                </div>
                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    <div className="space-y-4">
                        {/* Name/Surname Grid */}
                        <div className="grid grid-cols-2 gap-4">
                            <input
                                name="name"
                                type="text"
                                required
                                className="block w-full rounded-md border-0 bg-[#333] py-4 px-4 text-white placeholder-gray-400 focus:bg-[#454545] focus:outline-none focus:ring-0 sm:text-base"
                                placeholder="First Name"
                                value={formData.name}
                                onChange={handleChange}
                            />
                            <input
                                name="surname"
                                type="text"
                                required
                                className="block w-full rounded-md border-0 bg-[#333] py-4 px-4 text-white placeholder-gray-400 focus:bg-[#454545] focus:outline-none focus:ring-0 sm:text-base"
                                placeholder="Last Name"
                                value={formData.surname}
                                onChange={handleChange}
                            />
                        </div>

                        <input
                            name="email"
                            type="email"
                            required
                            className="block w-full rounded-md border-0 bg-[#333] py-4 px-4 text-white placeholder-gray-400 focus:bg-[#454545] focus:outline-none focus:ring-0 sm:text-base"
                            placeholder="Email address"
                            value={formData.email}
                            onChange={handleChange}
                        />

                        <input
                            name="password"
                            type="password"
                            required
                            className="block w-full rounded-md border-0 bg-[#333] py-4 px-4 text-white placeholder-gray-400 focus:bg-[#454545] focus:outline-none focus:ring-0 sm:text-base"
                            placeholder="Password"
                            value={formData.password}
                            onChange={handleChange}
                        />

                        <input
                            name="confirmPassword"
                            type="password"
                            required
                            className="block w-full rounded-md border-0 bg-[#333] py-4 px-4 text-white placeholder-gray-400 focus:bg-[#454545] focus:outline-none focus:ring-0 sm:text-base"
                            placeholder="Confirm Password"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                        />
                    </div>

                    {error && <div className="text-sm text-[#e87c03]">{error}</div>}

                    <div>
                        <button
                            type="submit"
                            disabled={loading}
                            className="group relative flex w-full justify-center rounded-sm bg-[#E50914] px-4 py-3 text-base font-bold text-white transition hover:bg-[#b00710] focus:outline-none disabled:opacity-70"
                        >
                            {loading ? "Creating account..." : "Sign Up"}
                        </button>
                    </div>
                </form>

                <div className="mt-8 text-left text-[#737373]">
                    Already have an account?{" "}
                    <Link to="/login" className="font-medium text-white hover:underline">
                        Sign in now
                    </Link>
                    .
                </div>
            </div>
        </div>
    );
}

export default RegisterPage;
