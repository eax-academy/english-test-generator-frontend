import { useState } from "react"; // 1. Added missing import
import { useParams, useNavigate } from "react-router-dom";
import { apiResetPassword } from "../api/auth.api";

function ResetPasswordPage() {
  const { token } = useParams<{ token: string }>();
  const navigate = useNavigate();

  // 2. useState will no longer be red
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);
    try {
      // Note: matching the API signature we created: (token, { password })
      await apiResetPassword(token!, { password });
      alert("Success! Your password has been updated.");
      navigate("/login");
    } catch (err: any) {
      setError(err.response?.data?.error || "Link is invalid or has expired.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center py-12 px-4 bg-black">
      <div className="z-10 w-full max-w-[450px] space-y-8 rounded-2xl bg-black/75 p-12 shadow-2xl border border-gray-800 backdrop-blur-sm">
        <h2 className="text-3xl font-bold text-white">New Password</h2>
        <p className="text-gray-400 text-sm">
          Please enter your new secure password.
        </p>

        <form className="mt-8 space-y-4" onSubmit={handleReset}>
          <input
            type="password"
            required
            className="w-full rounded-md bg-[#333] py-4 px-4 text-white focus:outline-none"
            placeholder="New Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <input
            type="password"
            required
            className="w-full rounded-md bg-[#333] py-4 px-4 text-white focus:outline-none"
            placeholder="Confirm New Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />

          {error && <div className="text-sm text-red-500">{error}</div>}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-sm bg-[#E50914] py-3 font-bold text-white hover:bg-[#b00710] disabled:opacity-50"
          >
            {loading ? "Updating..." : "Update Password"}
          </button>
        </form>
      </div>
    </div>
  );
}

// 3. Added missing default export to fix the App.tsx error
export default ResetPasswordPage;
