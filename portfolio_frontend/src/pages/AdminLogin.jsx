import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const AdminLogin = () => {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    const correctPassword = import.meta.env.VITE_ADMIN_PASSWORD;

    if (password === correctPassword) {
      localStorage.setItem("isAdmin", "true");
      setError("");
      navigate("/admin");
    } else {
      setError("Wrong password. Try again!");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white">
      <form
        onSubmit={handleLogin}
        className="bg-white/10 p-8 rounded-xl space-y-4 w-[320px]"
      >
        <h2 className="text-2xl font-bold text-center">Admin Login</h2>

        {/* PASSWORD INPUT */}
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 rounded bg-black border border-gray-600 pr-16"
          />

          {/* TOGGLE BUTTON */}
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute right-2 top-1/2 -translate-y-1/2 text-sm text-blue-400 hover:text-blue-300"
          >
            {showPassword ? "Hide" : "Show"}
          </button>
        </div>

        {/* ERROR */}
        {error && (
          <p className="text-red-500 text-sm text-center">{error}</p>
        )}

        {/* LOGIN BUTTON */}
        <button
          type="submit"
          className="w-full bg-blue-500 py-2 rounded hover:bg-blue-600 transition"
        >
          Login
        </button>
      </form>
    </div>
  );
};