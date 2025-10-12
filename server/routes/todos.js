const express = require("express");
const router = express.Router();
const Todo = require("../models/Todo");

// Create a new todo
router.post("/", async (req, res) => {
  try {
    const { title, description } = req.body;
    const todo = new Todo({ title, description });
    const saved = await todo.save();
    res.status(201).json(saved);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Could not create todo", details: error.message });
  }
});

// Read all todos
router.get("/", async (req, res) => {
  try {
    const filter = {};
    if (req.query.completed === "true") filter.completed = true;
    if (req.query.completed === "false") filter.completed = false;
    const todos = await Todo.find(filter).sort({ createdAt: -1 });
    res.json(todos);
  } catch (error) {
    res.status(500).json({ error: "Could not fetch todos" });
  }
});

// Read a single todo
router.get("/:id", async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);
    if (!todo) return res.status(404).json({ error: "Not found" });
    res.json(todo);
  } catch (error) {
    res.status(500).json({ error: "Could not fetch todo" });
  }
});

// Update a todo
router.put("/:id", async (req, res) => {
  try {
    const updates = req.body;
    updates.updatedAt = Date.now();
    const updated = await Todo.findByIdAndUpdate(req.params.id, updates, {
      new: true,
      runValidators: true,
    });
    if (!updated) return res.status(404).json({ error: "Not found" });
    res.json(updated);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Could not update todo", details: error.message });
  }
});

// Delete a todo
router.delete("/:id", async (req, res) => {
  try {
    const removed = await Todo.findByIdAndDelete(req.params.id);
    if (!removed) return res.status(404).json({ error: "Not found" });
    res.json({ message: "Deleted", id: req.params.id });
  } catch (error) {
    res.status(500).json({ error: "Could not delete todo" });
  }
});

module.exports = router;
