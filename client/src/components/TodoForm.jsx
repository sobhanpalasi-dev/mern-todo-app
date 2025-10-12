import { useState, useEffect } from "react";

export default function TodoForm({ onSave, editingTodo, onCancel }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (editingTodo) {
      setTitle(editingTodo.title || "");
      setDescription(editingTodo.description || "");
    } else {
      setTitle("");
      setDescription("");
    }
  }, [editingTodo]);

  function handleSubmit(e) {
    e.preventDefault();
    if (!title.trim()) return;
    onSave({ title, description });
    setTitle("");
    setDescription("");
  }

  return (
    <form className="todo-form" onSubmit={handleSubmit}>
      <div className="form-row">
        <input
          type="text"
          placeholder="Task title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="input title"
        />
        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="input description"
        />
      </div>

      <div className="button-row">
        {editingTodo ? (
          <>
            <button type="submit" className="btn primary">
              Update
            </button>
            <button type="button" className="btn cancel" onClick={onCancel}>
              Cancel
            </button>
          </>
        ) : (
          <button type="submit" className="btn primary">
            Add
          </button>
        )}
      </div>
    </form>
  );
}
