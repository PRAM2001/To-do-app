import React, { useEffect, useState } from "react";
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";
import "./index.css";

const LOCAL_KEY = "todoApp.todos.v1";

export default function App() {
  const [todos, setTodos] = useState([]);

  // load from localStorage once
  useEffect(() => {
    try {
      const raw = localStorage.getItem(LOCAL_KEY);
      if (raw) setTodos(JSON.parse(raw));
    } catch (e) {
      console.error("Failed to load todos", e);
    }
  }, []);

  // save to localStorage whenever todos change
  useEffect(() => {
    localStorage.setItem(LOCAL_KEY, JSON.stringify(todos));
  }, [todos]);

  // add
  const addTodo = (text) => {
    if (!text.trim()) return;
    const newTodo = {
      id: Date.now().toString(), // simple unique id
      text: text.trim(),
      completed: false,
      createdAt: Date.now()
    };
    setTodos((t) => [newTodo, ...t]);
  };

  // toggle complete
  const toggleTodo = (id) => {
    setTodos((t) => t.map(item => item.id === id ? {...item, completed: !item.completed} : item));
  };

  // edit
  const editTodo = (id, newText) => {
    setTodos((t) => t.map(item => item.id === id ? {...item, text: newText} : item));
  };

  // delete
  const deleteTodo = (id) => {
    setTodos((t) => t.filter(item => item.id !== id));
  };

  return (
    <div className="app">
      <header>
        <h1>Todo</h1>
      </header>

      <main>
        <TodoForm addTodo={addTodo} />
        <TodoList
          todos={todos}
          onToggle={toggleTodo}
          onEdit={editTodo}
          onDelete={deleteTodo}
        />
      </main>
    </div>
  );
}