import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { io } from "socket.io-client";
import {
  FaInbox,
  FaBell,
  FaUser,
  FaEnvelope,
  FaCommentDots,
  FaCalendarAlt,
  FaTrash,
  FaReply,
  FaSignOutAlt,
} from "react-icons/fa";

export const Admin = () => {
  const [messages, setMessages] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const [selectedMessage, setSelectedMessage] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [activeTab, setActiveTab] = useState("inbox");
  const [unreadCount, setUnreadCount] = useState(0);

  const navigate = useNavigate();

  // ================= SOCKET.IO =================
  useEffect(() => {
    const socket = io(import.meta.env.VITE_API_URL);

    socket.on("new_message", (newMsg) => {
      setMessages((prev) => [newMsg, ...prev]);

      setNotifications((prev) => [
        {
          text: `New message from ${newMsg.name}`,
          time: new Date().toLocaleTimeString(),
        },
        ...prev,
      ]);

      setUnreadCount((prev) => prev + 1);
    });

    socket.on("delete_message", (id) => {
      setMessages((prev) => prev.filter((m) => m._id !== id));

      setNotifications((prev) => [
        {
          text: `A message was deleted`,
          time: new Date().toLocaleTimeString(),
        },
        ...prev,
      ]);

      if (selectedMessage?._id === id) {
        setSelectedMessage(null);
      }
    });

    socket.on("message_read", (updated) => {
      setMessages((prev) =>
        prev.map((m) => (m._id === updated._id ? updated : m)),
      );
    });

    return () => socket.disconnect();
  }, [selectedMessage]);

  // ================= AUTH =================
  useEffect(() => {
    const isAdmin = localStorage.getItem("isAdmin");

    if (!isAdmin) {
      navigate("/admin-login");
      return;
    }

    fetchMessages();
    fetchUnreadCount();
  }, []);

  // ================= FETCH =================
  const fetchMessages = async () => {
    setIsLoading(true);
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/contact`);
      const data = await res.json();
      setMessages(data);
    } catch {
      setError("Failed to load messages");
    } finally {
      setIsLoading(false);
    }
  };

  const fetchUnreadCount = async () => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/contact/unread/count`,
      );
      const data = await res.json();
      setUnreadCount(data.count || 0);
    } catch {}
  };

  // ================= OPEN MESSAGE =================
  const openMessage = async (msg) => {
    setSelectedMessage(msg);

    setMessages((prev) =>
      prev.map((m) => (m._id === msg._id ? { ...m, isRead: true } : m)),
    );

    setUnreadCount((prev) => Math.max(prev - 1, 0));

    try {
      await fetch(`${import.meta.env.VITE_API_URL}/contact/${msg._id}/read`, {
        method: "PATCH",
      });
    } catch {}
  };

  // ================= DELETE =================
  const deleteMessage = async () => {
    try {
      await fetch(`${import.meta.env.VITE_API_URL}/contact/${deleteTarget}`, {
        method: "DELETE",
      });

      setDeleteTarget(null);
      setSelectedMessage(null);
    } catch {
      setError("Delete failed");
    }
  };

  // ================= FIXED REPLY =================
  const handleReply = () => {
    if (!selectedMessage) return;

    const email = selectedMessage.email;
    const name = selectedMessage.name;
    const msg = selectedMessage.message;

    const subject = encodeURIComponent("Reply to your message");
    const body = encodeURIComponent(
      `Hi ${name},

I reviewed your message:

"${msg}"

---

Reply from Admin Panel`,
    );

    // ✅ OPEN GMAIL IN CHROME DIRECTLY
    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${email}&su=${subject}&body=${body}`;

    window.open(gmailUrl, "_blank");
  };

  const handleLogout = () => {
    localStorage.removeItem("isAdmin");
    navigate("/admin-login");
  };

  return (
    <div className="flex min-h-screen bg-black text-white">
      {/* ================= SIDEBAR ================= */}
      <div className="w-46 bg-white/5 border-r border-white/10 p-5 flex flex-col justify-between">
        <div>
          <h2 className="text-xl font-bold mb-6">Admin Panel</h2>

          <button
            onClick={() => setActiveTab("inbox")}
            className={`flex items-center gap-2 w-full p-2 rounded ${
              activeTab === "inbox" ? "bg-blue-600" : "hover:bg-white/10"
            }`}
          >
            <FaInbox />
            Inbox
            {unreadCount > 0 && (
              <span className="ml-auto bg-red-500 text-xs px-2 py-1 rounded-full">
                {unreadCount}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab("notifications")}
            className={`flex items-center gap-2 w-full p-2 rounded mt-2 ${
              activeTab === "notifications"
                ? "bg-blue-600"
                : "hover:bg-white/10"
            }`}
          >
            <FaBell /> Notifications
          </button>
        </div>

        <button
          onClick={handleLogout}
          className="flex items-center gap-2 bg-red-600 p-2 rounded"
        >
          <FaSignOutAlt /> Logout
        </button>
      </div>

      {/* ================= MAIN ================= */}
      <div className="flex-1 p-10">
        {isLoading ? (
          <div className="flex justify-center">
            <div className="w-8 h-8 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : (
          <>
            {/* ================= INBOX ================= */}
            {activeTab === "inbox" && (
              <div className="grid grid-cols-2 gap-6">
                {/* LIST */}
                <div className="space-y-3">
                  {messages.map((msg) => (
                    <div
                      key={msg._id}
                      onClick={() => openMessage(msg)}
                      className="p-4 rounded cursor-pointer bg-white/5 hover:bg-white/10"
                    >
                      <div className="flex items-center gap-2">
                        <FaUser className="text-blue-400" />
                        <span>{msg.name}</span>
                      </div>
                      <p className="text-sm text-gray-400 flex items-center gap-2">
                        <FaEnvelope className="text-gray-500" />
                        {msg.email}
                      </p>
                    </div>
                  ))}
                </div>

                {/* DETAILS (RESTORED FULL UI + ICONS) */}
                <div className="bg-white/5 p-6 rounded-xl">
                  {selectedMessage ? (
                    <>
                      <h2 className="text-xl font-bold mb-4">
                        Message Details
                      </h2>

                      <p className="flex items-center gap-2">
                        <FaUser className="text-blue-400" />
                        {selectedMessage.name}
                      </p>

                      <p className="flex items-center gap-2 mt-2 text-gray-400">
                        <FaEnvelope />
                        {selectedMessage.email}
                      </p>

                      <p className="flex items-start gap-2 mt-4">
                        <FaCommentDots className="text-green-400 mt-1" />
                        {selectedMessage.message}
                      </p>

                      <p className="flex items-center gap-2 mt-4 text-xs text-gray-500">
                        <FaCalendarAlt />
                        {new Date(selectedMessage.createdAt).toLocaleString()}
                      </p>

                      <div className="flex gap-3 mt-6">
                        <button
                          onClick={handleReply}
                          className="bg-blue-600 px-4 py-2 rounded flex items-center gap-2"
                        >
                          <FaReply /> Reply
                        </button>

                        <button
                          onClick={() => setDeleteTarget(selectedMessage._id)}
                          className="bg-red-600 px-4 py-2 rounded flex items-center gap-2"
                        >
                          <FaTrash /> Delete
                        </button>
                      </div>
                    </>
                  ) : (
                    <p className="text-gray-400">Select a message</p>
                  )}
                </div>
              </div>
            )}

            {/* ================= NOTIFICATIONS FIXED ================= */}
            {activeTab === "notifications" && (
              <div>
                <h2 className="text-2xl font-bold mb-4">Notifications</h2>

                {notifications.length === 0 ? (
                  <div className="bg-green-500/10 p-4 rounded">
                    📩 No notifications yet
                  </div>
                ) : (
                  <div className="space-y-3">
                    {notifications.map((n, i) => (
                      <div key={i} className="bg-white/5 p-3 rounded">
                        <p>{n.text}</p>
                        <span className="text-xs text-gray-400">{n.time}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </>
        )}
      </div>

      {/* ================= DELETE MODAL ================= */}
      {/* ================= DELETE MODAL ================= */}
      {deleteTarget && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="bg-white/10 p-6 rounded-xl text-center space-y-4 w-[300px]">
            <p>Are you sure you want to delete this message?</p>

            <div className="flex justify-center gap-4">
              {/* ✅ CANCEL BUTTON (RESTORED) */}
              <button
                onClick={() => setDeleteTarget(null)}
                className="px-4 py-2 bg-gray-600 rounded hover:bg-gray-500 transition"
              >
                Cancel
              </button>

              {/* DELETE BUTTON */}
              <button
                onClick={deleteMessage}
                className="px-4 py-2 bg-red-600 rounded hover:bg-red-700 transition"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
