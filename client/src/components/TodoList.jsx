export default function TodoList({
  todos,
  onToggleComplete,
  onEdit,
  onDelete,
}) {
  return (
    <div className="todo-list">
      {todos.map((todo) => (
        <div
          key={todo._id}
          className={`todo-item ${todo.completed ? "completed" : ""}`}
        >
          <div className="todo-left">
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => onToggleComplete(todo)}
              className="todo-checkbox"
            />
            <div className="todo-content">
              <h3>{todo.title}</h3>
              <p>{todo.description}</p>
            </div>
          </div>

          <div className="todo-actions">
            <button className="edit" onClick={() => onEdit(todo)}>
              ✏️
            </button>
            <button className="delete" onClick={() => onDelete(todo._id)}>
              🗑️
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
