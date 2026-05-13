const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const http = require("http");
const { Server } = require("socket.io");

const Contact = require("./models/Contact");
const { Resend } = require("resend");

const app = express();
const server = http.createServer(app);

// ================= RESEND SETUP =================
const resend = new Resend(process.env.RESEND_API_KEY);

// ================= SOCKET.IO =================
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST", "DELETE", "PATCH"],
  },
});

app.set("io", io);

io.on("connection", (socket) => {
  console.log("🟢 Admin connected:", socket.id);

  socket.on("disconnect", () => {
    console.log("🔴 Admin disconnected:", socket.id);
  });
});

// ================= MIDDLEWARE =================
app.use(cors());
app.use(express.json());

// ================= DB =================
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

// ================= GET CONTACTS =================
app.get("/contact", async (req, res) => {
  const messages = await Contact.find().sort({ createdAt: -1 });
  res.json(messages);
});

// ================= POST CONTACT (FIXED) =================
app.post("/contact", async (req, res) => {
  try {
    console.log("Incoming contact request:", req.body); // ✅ HERE ONLY

    const { name, email, subject, message } = req.body;

    const newMessage = await Contact.create({
      name,
      email,
      subject,
      message,
      isRead: false,
    });

    res.status(200).json({
      success: true,
      message: "Saved successfully",
      data: newMessage,
    });

    resend.emails
      .send({
        from: "Portfolio <onboarding@resend.dev>",
        to: process.env.EMAIL_USER,
        subject: `New message from ${name}`,
        html: `
          <h2>New Contact Message</h2>
          <p><b>Name:</b> ${name}</p>
          <p><b>Email:</b> ${email}</p>
          <p><b>Subject:</b> ${subject}</p>
          <p><b>Message:</b> ${message}</p>
        `,
      })
      .catch((err) => console.log("❌ Resend error:", err.message));

  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// ================= DELETE =================
app.delete("/contact/:id", async (req, res) => {
  const deleted = await Contact.findByIdAndDelete(req.params.id);

  if (!deleted) return res.status(404).json({ message: "Not found" });

  io.emit("delete_message", req.params.id);

  res.json({ message: "Deleted successfully" });
});

// ================= READ =================
app.patch("/contact/:id/read", async (req, res) => {
  const updated = await Contact.findByIdAndUpdate(
    req.params.id,
    { isRead: true },
    { new: true },
  );

  io.emit("message_read", updated);

  res.json({ message: "Marked as read" });
});

// ================= UNREAD =================
app.get("/contact/unread/count", async (req, res) => {
  const count = await Contact.countDocuments({ isRead: false });
  res.json({ count });
});

// ================= TEST =================
app.get("/", (req, res) => {
  res.send("API is running...");
});

// ================= START =================
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
app.get("/test-resend", async (req, res) => {
  try {
    const result = await resend.emails.send({
      from: "Portfolio <onboarding@resend.dev>",
      to: process.env.EMAIL_USER,
      subject: "Resend Test Email",
      html: "<h1>Resend is working 🎉</h1>",
    });

    console.log(result);
    res.json({ success: true, result });
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, error: err.message });
  }
});
