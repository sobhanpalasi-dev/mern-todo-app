import { useState, useEffect } from "react";
import { getTodos, createTodo, updateTodo, deleteTodo } from "./api";
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";
import "./index.css";

export default function App() {
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState("all"); // all | completed | active
  const [loading, setLoading] = useState(false);
  const [editingTodo, setEditingTodo] = useState(null);
  const [error, setError] = useState(null);
  const [theme, setTheme] = useState("light");

  const filteredTodos = todos.filter((todo) => {
    if (filter === "active") return !todo.completed;
    if (filter === "completed") return todo.completed;
    return true; // "all"
  });

  const emptyMessage = {
    all: "No tasks yet.",
    active: "Nothing pending.",
    completed: "You're all caught up!",
  };

  async function fetchTodos() {
    setLoading(true);
    setError(null);
    try {
      if (filter === "all") {
        const data = await getTodos();
        setTodos(data);
      } else {
        const data = await getTodos(filter === "completed");
        setTodos(data);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchTodos();
  }, [filter]);

  async function handleSave(newData) {
    try {
      if (editingTodo) {
        const updated = await updateTodo(editingTodo._id, newData);
        setTodos((t) => t.map((x) => (x._id === updated._id ? updated : x)));
        setEditingTodo(null);
      } else {
        const created = await createTodo(newData);
        setTodos((t) => [created, ...t]);
      }
    } catch (err) {
      alert("Error: " + err.message);
    }
  }

  async function handleToggleComplete(todo) {
    try {
      const updated = await updateTodo(todo._id, {
        completed: !todo.completed,
      });
      setTodos((t) => t.map((x) => (x._id === updated._id ? updated : x)));
    } catch (err) {
      alert("Could not toggle: " + err.message);
    }
  }

  async function handleDelete(id) {
    if (!window.confirm("Delete this task?")) return;
    try {
      await deleteTodo(id);
      setTodos((t) => t.filter((x) => x._id !== id));
    } catch (err) {
      alert("Could not delete: " + err.message);
    }
  }

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    <div className={`app ${theme}`}>
      <div className="container">
        <header>
          <h1>📝 To - Do App</h1>
          <button className="theme-toggle" onClick={toggleTheme}>
            {theme === "light" ? "🌙 Dark" : "☀️ Light"}
          </button>
        </header>

        <div className="top">
          <TodoForm
            onSave={handleSave}
            editingTodo={editingTodo}
            onCancel={() => setEditingTodo(null)}
          />
          <div className="filters">
            <button
              onClick={() => setFilter("all")}
              className={filter === "all" ? "active" : ""}
            >
              All
            </button>

            <button
              onClick={() => setFilter("active")}
              className={filter === "active" ? "active" : ""}
            >
              Active
            </button>
            <button
              onClick={() => setFilter("completed")}
              className={filter === "completed" ? "active" : ""}
            >
              Completed
            </button>
          </div>
        </div>

        {loading ? (
          <div>Loading...</div>
        ) : (
          <>
            {error && <div className="error">Error: {error}</div>}
            {filteredTodos.length === 0 ? (
              <p className="empty-message">{emptyMessage[filter]}</p>
            ) : (
              <TodoList
                todos={filteredTodos}
                onToggleComplete={handleToggleComplete}
                onEdit={(t) => setEditingTodo(t)}
                onDelete={handleDelete}
              />
            )}
          </>
        )}
        <footer>
          <p>Built with ❤️ using React, Node, and MongoDB</p>
        </footer>
      </div>
    </div>
  );
}
