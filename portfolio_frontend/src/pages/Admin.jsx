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

      // 🔥 ADD INITIAL NOTIFICATIONS
      setNotifications(
        data.slice(0, 3).map((msg) => ({
          text: `Message from ${msg.name}`,
          time: new Date(msg.createdAt).toLocaleTimeString(),
        })),
      );
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

    setNotifications((prev) => [
      {
        text: `Opened message from ${msg.name}`,
        time: new Date().toLocaleTimeString(),
      },
      ...prev,
    ]);

    try {
      await fetch(`${import.meta.env.VITE_API_URL}/contact/${msg._id}/read`, {
        method: "PATCH",
      });
    } catch {}
  };

  // ================= DELETE =================
  const deleteMessage = async () => {
    if (!deleteTarget) return;

    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/contact/${deleteTarget}`,
        { method: "DELETE" },
      );

      if (!res.ok) throw new Error();

      // 🔥 FIX: REMOVE FROM UI IMMEDIATELY
      setMessages((prev) => prev.filter((m) => m._id !== deleteTarget));

      setNotifications((prev) => [
        {
          text: `Deleted a message`,
          time: new Date().toLocaleTimeString(),
        },
        ...prev,
      ]);

      setDeleteTarget(null);
      setSelectedMessage(null);

      fetchUnreadCount();
    } catch {
      setError("Delete failed");
    }
  };

  // ================= REPLY =================
  const handleReply = () => {
    if (!selectedMessage) return;

    const subject = encodeURIComponent("Reply to your message");
    const body = encodeURIComponent(
      `Hi ${selectedMessage.name},

I reviewed your message:

"${selectedMessage.message}"

---

Reply from Admin Panel`,
    );

    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${selectedMessage.email}&su=${subject}&body=${body}`;

    window.open(gmailUrl, "_blank");
  };

  const handleLogout = () => {
    localStorage.removeItem("isAdmin");
    navigate("/admin-login");
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-black text-white">
      {/* SIDEBAR */}
      <div className="md:w-60 bg-white/5 border-r border-white/10 p-5 flex flex-row md:flex-col justify-between">
        <div className="flex md:flex-col gap-3 w-full">
          <button
            onClick={() => setActiveTab("inbox")}
            className={`flex items-center gap-2 p-2 rounded ${
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
            className={`flex items-center gap-2 p-2 rounded ${
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
          className="bg-red-600 px-3 py-2 rounded flex items-center gap-2"
        >
          <FaSignOutAlt /> Logout
        </button>
      </div>

      {/* MAIN */}
      <div className="flex-1 p-4 md:p-10">
        {isLoading ? (
          <div className="flex justify-center">
            <div className="w-8 h-8 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : (
          <>
            {activeTab === "inbox" && (
              <div className="grid md:grid-cols-2 gap-6">
                {/* LIST */}
                <div className="space-y-3">
                  {messages.map((msg) => (
                    <div
                      key={msg._id}
                      onClick={() => openMessage(msg)}
                      className="p-4 rounded bg-white/5 hover:bg-white/10 cursor-pointer"
                    >
                      <p className="flex items-center gap-2">
                        <FaUser /> {msg.name}
                      </p>
                      <p className="text-sm text-gray-400 flex gap-2">
                        <FaEnvelope /> {msg.email}
                      </p>
                    </div>
                  ))}
                </div>

                {/* DETAILS */}
                <div className="bg-white/5 p-4 rounded-xl max-h-[70vh] overflow-y-auto">
                  {selectedMessage ? (
                    <>
                      <p className="flex gap-2">
                        <FaUser /> {selectedMessage.name}
                      </p>
                      <p className="flex gap-2 mt-2">
                        <FaEnvelope /> {selectedMessage.email}
                      </p>
                      <p className="flex gap-2 mt-4">
                        <FaCommentDots /> {selectedMessage.message}
                      </p>
                      <p className="flex gap-2 mt-4 text-xs">
                        <FaCalendarAlt />
                        {new Date(selectedMessage.createdAt).toLocaleString()}
                      </p>

                      <div className="flex gap-3 mt-6 flex-wrap">
                        <button
                          onClick={handleReply}
                          className="bg-blue-600 px-4 py-2 rounded flex gap-2"
                        >
                          <FaReply /> Reply
                        </button>

                        <button
                          onClick={() => setDeleteTarget(selectedMessage._id)}
                          className="bg-red-600 px-4 py-2 rounded flex gap-2"
                        >
                          <FaTrash /> Delete
                        </button>
                      </div>
                    </>
                  ) : (
                    <p>Select a message</p>
                  )}
                </div>
              </div>
            )}

            {/* NOTIFICATIONS */}
            {activeTab === "notifications" && (
              <div>
                <h2 className="text-xl mb-4">Notifications</h2>

                {notifications.length === 0 ? (
                  <p>No notifications</p>
                ) : (
                  notifications.map((n, i) => (
                    <div key={i} className="bg-white/5 p-3 rounded mb-2">
                      <p>{n.text}</p>
                      <span className="text-xs text-gray-400">{n.time}</span>
                    </div>
                  ))
                )}
              </div>
            )}
          </>
        )}
      </div>

      {/* DELETE MODAL */}
      {deleteTarget && (
        <div className="fixed inset-0 bg-black/70 flex justify-center items-center">
          <div className="bg-white/10 p-6 rounded">
            <p>Are you sure?</p>
            <div className="flex gap-4 mt-4">
              <button
                onClick={() => setDeleteTarget(null)}
                className="bg-gray-600 px-4 py-2 rounded"
              >
                Cancel
              </button>
              <button
                onClick={deleteMessage}
                className="bg-red-600 px-4 py-2 rounded"
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
