import React, { useState } from "react";
import TodoForm from "./TodoForm";

export default function TodoItem({ todo, onToggle, onEdit, onDelete }) {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <li className={`todo-item ${todo.completed ? "completed" : ""}`}>
      <div className="row">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={onToggle}
          aria-label={`Mark ${todo.text} completed`}
        />
        {!isEditing ? (
          <>
            <span className="text" onDoubleClick={() => setIsEditing(true)}>
              {todo.text}
            </span>
            <div className="actions">
              <button onClick={() => setIsEditing(true)}>Edit</button>
              <button onClick={onDelete}>Delete</button>
            </div>
          </>
        ) : (
          <div className="edit">
            <TodoForm
              existing={todo}
              onSave={(id, newText) => {
                onEdit(newText);
                setIsEditing(false);
              }}
            />
            <button className="cancel" onClick={() => setIsEditing(false)}>
              Cancel
            </button>
          </div>
        )}
      </div>
    </li>
  );
}
