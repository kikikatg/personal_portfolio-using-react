import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const AdminLogin = () => {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    if (password === import.meta.env.VITE_ADMIN_PASSWORD) {
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
        className="bg-white/10 p-8 rounded-xl space-y-4 w-[300px]"
      >
        <h2 className="text-2xl font-bold text-center">Admin Login</h2>

        <input
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-4 py-2 rounded bg-black border border-gray-600"
        />

        {error && <p className="text-red-500 text-sm text-center">{error}</p>}

        <button
          type="submit"
          className="w-full bg-blue-500 py-2 rounded hover:bg-blue-600"
        >
          Login
        </button>
      </form>
    </div>
  );
};
