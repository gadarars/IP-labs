const express = require("express");
const mongoose = require("mongoose");

const app = express();
const PORT = 5000;

// ── Middleware ──────────────────────────────
// Allows Express to read JSON from request body
app.use(express.json());

// ── Database Connection ─────────────────────
// Paste your MongoDB connection string here
const MONGO_URI = "mongodb+srv://admin:roaa123@cluster0.7pxfmfd.mongodb.net/courseDB?retryWrites=true&w=majority&appName=Cluster0";

mongoose
  .connect(MONGO_URI)
  .then(() => console.log(" Connected to MongoDB"))
  .catch((err) => console.log("v Connection failed:", err));

// ── Routes ──────────────────────────────────
// Import the course router
const courseRouter = require("./routers/courseRouter");

// Mount it at /courses — so all routes inside become /courses/...
app.use("/courses", courseRouter);

// ── 404 Fallback ────────────────────────────
// Catches any request that didn't match a route above
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

// ── Start Server ────────────────────────────
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
