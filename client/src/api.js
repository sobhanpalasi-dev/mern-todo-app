const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

async function request(path, options = {}) {
  const res = await fetch(`${BASE_URL}${path}`, {
    headers: { "Content-Type": "application/json" },
    ...options,
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({ message: res.statusText }));
    throw new Error(err.error || err.message || "API error");
  }
  return res.json();
}

export const getTodos = (completed) => {
  const q = completed === undefined ? "" : `?completed=${completed}`;
  return request(`/todos${q}`);
};
export const createTodo = (data) =>
  request("/todos", { method: "POST", body: JSON.stringify(data) });
export const updateTodo = (id, data) =>
  request(`/todos/${id}`, { method: "PUT", body: JSON.stringify(data) });
export const deleteTodo = (id) => request(`/todos/${id}`, { method: "DELETE" });
