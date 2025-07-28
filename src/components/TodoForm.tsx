import { useState } from "react";
import { PlusIcon } from "./Icon";

interface TodoFormProps {
  addTodo: (text: string) => void;
}

const TodoForm: React.FC<TodoFormProps> = ({ addTodo }) => {
  const [text, setText] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim()) {
      addTodo(text.trim());
      setText("");
    }
  };
  return (
    <form onSubmit={handleSubmit} className="relative flex items-center mb-4">
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
    </form>
  );
};

export default TodoForm;
