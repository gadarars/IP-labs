const express = require("express");
const app = express();

// Middleware: parse incoming JSON request bodies
app.use(express.json());


let posts = [];
let users = [];
let nextPostId = 1;
let nextUserId = 1;

// ─── USER ENDPOINTS ──────────────────────────────────────────────────────────

// POST /users — Register a new user
app.post("/users", (req, res) => {
  const { username, email } = req.body;
  if (!username || !email) {
    return res.status(400).json({ error: "username and email are required" });
  }
  const existingUser = users.find((u) => u.username === username);
  if (existingUser) {
    return res.status(409).json({ error: "Username already taken" });
  }
  const user = { id: nextUserId++, username, email };
  users.push(user);
  res.status(201).json(user);
});

// GET /users — Get all users
app.get("/users", (req, res) => {
  res.json(users);
});

// GET /users/:id — Get a user by ID
app.get("/users/:id", (req, res) => {
  const user = users.find((u) => u.id === parseInt(req.params.id));
  if (!user) return res.status(404).json({ error: "User not found" });
  res.json(user);
});



// POST /posts — Create a new post
app.post("/posts", (req, res) => {
  const { title, content, userId } = req.body;
  if (!title || !content || !userId) {
    return res
      .status(400)
      .json({ error: "title, content, and userId are required" });
  }
  const user = users.find((u) => u.id === parseInt(userId));
  if (!user) return res.status(404).json({ error: "User not found" });

  const post = {
    id: nextPostId++,
    title,
    content,
    userId: parseInt(userId),
    author: user.username,
    likes: 0,
    likedBy: [],
    createdAt: new Date().toISOString(),
  };
  posts.push(post);
  res.status(201).json(post);
});

// GET /posts — Get all posts
app.get("/posts", (req, res) => {
  res.json(posts);
});

// GET /posts/:id — Get a single post by ID
app.get("/posts/:id", (req, res) => {
  const post = posts.find((p) => p.id === parseInt(req.params.id));
  if (!post) return res.status(404).json({ error: "Post not found" });
  res.json(post);
});

// PUT /posts/:id — Update a post
app.put("/posts/:id", (req, res) => {
  const post = posts.find((p) => p.id === parseInt(req.params.id));
  if (!post) return res.status(404).json({ error: "Post not found" });
  const { title, content } = req.body;
  if (title) post.title = title;
  if (content) post.content = content;
  res.json(post);
});

// DELETE /posts/:id — Delete a post
app.delete("/posts/:id", (req, res) => {
  const index = posts.findIndex((p) => p.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ error: "Post not found" });
  posts.splice(index, 1);
  res.status(200).json({ message: "Post deleted successfully" });
});

// ─── LIKES ENDPOINT ──────────────────────────────────────────────────────────

// POST /posts/:id/likes — Like a post
app.post("/posts/:id/likes", (req, res) => {
  const post = posts.find((p) => p.id === parseInt(req.params.id));
  if (!post) return res.status(404).json({ error: "Post not found" });
  const { userId } = req.body;
  if (!userId) return res.status(400).json({ error: "userId is required" });
  if (post.likedBy.includes(parseInt(userId))) {
    return res.status(409).json({ error: "User already liked this post" });
  }
  post.likes++;
  post.likedBy.push(parseInt(userId));
  res.json({ message: "Post liked", post });
});

// GET /posts/:id/likes — Get likes count of a post
app.get("/posts/:id/likes", (req, res) => {
  const post = posts.find((p) => p.id === parseInt(req.params.id));
  if (!post) return res.status(404).json({ error: "Post not found" });
  res.json({ postId: post.id, likes: post.likes });
});

// ─── START SERVER ─────────────────────────────────────────────────────────────
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
