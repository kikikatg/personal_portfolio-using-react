import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const Admin = () => {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const isAdmin = localStorage.getItem("isAdmin");

    if (!isAdmin) {
      navigate("/admin-login");
    } else {
      fetchMessages();
    }
  }, []);

  // 🔄 Fetch all messages
  const fetchMessages = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("http://localhost:5000/contact");
      const data = await res.json();
      setMessages(data);
    } catch (error) {
      console.error("Error fetching messages:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // ❌ Delete message
  const deleteMessage = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this message?",
    );

    if (!confirmDelete) return;

    try {
      await fetch(`http://localhost:5000/contact/${id}`, {
        method: "DELETE",
      });

      fetchMessages();
    } catch (error) {
      console.error("Delete failed:", error);
    }
  };

  // 🔐 Logout
  const handleLogout = () => {
    localStorage.removeItem("isAdmin");
    navigate("/admin-login");
  };

  return (
    <div className="min-h-screen bg-black text-white p-10">
      {/* 🔝 Header */}
      <div className="flex justify-between items-center mb-10">
        <h1 className="text-4xl font-bold">Admin Dashboard</h1>

        <button
          onClick={handleLogout}
          className="bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded"
        >
          Logout
        </button>
      </div>

      {isLoading ? (
        // 🔄 Loading Spinner
        <div className="flex justify-center items-center">
          <div className="w-8 h-8 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : messages.length === 0 ? (
        // 📭 No messages
        <p className="text-center text-gray-400">No messages found.</p>
      ) : (
        // 📩 Messages list
        <div className="grid gap-6 max-w-3xl mx-auto">
          {messages.map((msg) => (
            <div
              key={msg._id}
              className="bg-white/5 border border-white/10 p-6 rounded-xl shadow-md"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-lg font-semibold">{msg.name}</h2>
                  <p className="text-sm text-gray-400">{msg.email}</p>
                </div>

                <button
                  onClick={() => deleteMessage(msg._id)}
                  className="bg-red-500 hover:bg-red-600 px-3 py-1 rounded text-sm"
                >
                  Delete
                </button>
              </div>

              <p className="mt-4 text-gray-200">{msg.message}</p>

              <p className="mt-3 text-xs text-gray-500">
                {new Date(msg.createdAt).toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
