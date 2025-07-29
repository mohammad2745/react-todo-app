import React, { useState } from "react";
import { PlusIcon, CalendarIcon } from "./Icon";

const getTodayString = () => {
  const today = new Date();
  today.setMinutes(today.getMinutes() - today.getTimezoneOffset());
  return today.toISOString().split("T")[0];
};

interface TodoFormProps {
  addTodo: (text: string, date: string) => void;
}

const TodoForm: React.FC<TodoFormProps> = ({ addTodo }) => {
  const [text, setText] = useState("");
  const [date, setDate] = useState(getTodayString());

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim() && date) {
      addTodo(text.trim(), date);
      setText("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="relative flex items-center">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Create a new todo..."
          className="w-full py-4 pl-6 pr-14 text-lg bg-secondary border border-border-color rounded-md focus:outline-none focus:ring-2 focus:ring-accent text-text-primary placeholder-text-secondary"
        />
        <button
          type="submit"
          className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-accent text-white hover:bg-accent-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-secondary focus:ring-accent transition-colors"
          aria-label="Add todo"
        >
          <PlusIcon className="w-5 h-5" />
        </button>
      </div>

      <div className="relative">
        <span className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none">
          <CalendarIcon className="w-5 h-5 text-text-secondary" />
        </span>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="w-full py-3 pl-12 pr-4 bg-secondary border border-border-color rounded-md focus:outline-none focus:ring-2 focus:ring-accent text-text-primary"
          style={{ colorScheme: "dark" }}
          aria-label="Todo date"
        />
      </div>
    </form>
  );
};

export default TodoForm;
