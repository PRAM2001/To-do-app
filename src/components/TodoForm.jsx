import React, { useState, useEffect, useRef } from "react";

export default function TodoForm({ addTodo, existing = null, onSave }) {
  // existing prop optional: {id, text} for edit mode
  const [text, setText] = useState(existing ? existing.text : "");
  const inputRef = useRef();

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const submit = (e) => {
    e?.preventDefault();
    if (!text.trim()) return;
    if (existing && onSave) {
      onSave(existing.id, text.trim());
    } else {
      addTodo(text);
      setText("");
    }
  };

  return (
    <form className="todo-form" onSubmit={submit}>
      <input
        ref={inputRef}
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Add a new task..."
        aria-label="New todo"
      />
      <button type="submit">{existing ? "Save" : "Add"}</button>
    </form>
  );
}
