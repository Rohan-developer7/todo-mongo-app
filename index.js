const express = require("express");
const mongoose = require("mongoose");
const Todo = require("./models/Todo");
require("./db");
require('dotenv').config();


mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB error:", err));

const app = express();
app.use(express.json());
app.use(express.static("public"));

// Get all todos
app.get("/todos", async (req, res) => {
  const todos = await Todo.find();
  res.json(todos);
});

// Create a todo
app.post("/todos", async (req, res) => {
  const { text } = req.body;
  const newTodo = new Todo({ text });
  await newTodo.save();
  res.status(201).json(newTodo);
});

// Update a todo
app.put("/todos/:id", async (req, res) => {
  const { text, completed } = req.body;
  const updatedTodo = await Todo.findByIdAndUpdate(req.params.id, { text, completed }, { new: true });
  res.json(updatedTodo);
});

// Delete a todo
app.delete("/todos/:id", async (req, res) => {
  await Todo.findByIdAndDelete(req.params.id);
  res.status(204).send();
});

app.listen(3000, () => {
  console.log("🚀 Server running at http://localhost:3000");
});
