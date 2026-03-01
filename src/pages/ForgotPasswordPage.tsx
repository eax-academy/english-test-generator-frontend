import { useState } from "react";
import { Link } from "react-router-dom";
import { apiForgotPassword } from "../api/auth.api";

function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState({ type: "", text: "" });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage({ type: "", text: "" });
    setLoading(true);

    try {
      // BEST PRACTICE: Only send the email to request a link
      await apiForgotPassword({ email });
      setMessage({
        type: "success",
        text: "If an account exists with this email, a reset link has been sent. Please check your inbox (and terminal).",
      });
    } catch (err: any) {
      // Security: We usually show the same success message even if email isn't found
      // but for development, we can show the error.
      setMessage({
        type: "error",
        text: "Something went wrong. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center py-12 px-4 bg-black">
      <div className="z-10 w-full max-w-[450px] space-y-8 rounded-2xl bg-black/75 p-12 shadow-2xl border border-gray-800 backdrop-blur-sm">
        <div>
          <h2 className="text-3xl font-bold text-white">Reset Password</h2>
          <p className="mt-2 text-sm text-gray-400">
            Enter your email address and we'll send you a link to reset your
            password.
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <input
            name="email"
            type="email"
            required
            className="w-full rounded-md bg-[#333] py-4 px-4 text-white focus:outline-none"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          {message.text && (
            <div
              className={`text-sm ${
                message.type === "success" ? "text-green-500" : "text-[#e87c03]"
              }`}
            >
              {message.text}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-sm bg-[#E50914] py-3 font-bold text-white hover:bg-[#b00710] disabled:opacity-70"
          >
            {loading ? "Sending..." : "Send Reset Link"}
          </button>

          <div className="text-gray-500">
            Remember your password?{" "}
            <Link to="/login" className="text-white hover:underline">
              Sign in now
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ForgotPasswordPage;
