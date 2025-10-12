export default function TodoItem({ todo, onToggleComplete, onEdit, onDelete }) {
  return (
    <div className={`todo-item ${todo.completed ? "completed" : ""}`}>
      <div className="left">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => onToggleComplete(todo)}
        />
        <div className="meta">
          <div className="title">{todo.title}</div>
          {todo.description && <div className="desc">{todo.description}</div>}
        </div>
      </div>
      <div className="actions">
        <button onClick={() => onEdit(todo)}>Edit</button>
        <button onClick={() => onDelete(todo._id)}>Delete</button>
      </div>
    </div>
  );
}
