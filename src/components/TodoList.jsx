import React from "react";
import TodoItem from "./TodoItem";

export default function TodoList({ todos, onToggle, onEdit, onDelete }) {
  if (!todos.length) return <p className="empty">No todos yet. Add one above.</p>;
  return (
    <ul className="todo-list">
      {todos.map(todo => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={() => onToggle(todo.id)}
          onEdit={(newText) => onEdit(todo.id, newText)}
          onDelete={() => onDelete(todo.id)}
        />
      ))}
    </ul>
  );
}