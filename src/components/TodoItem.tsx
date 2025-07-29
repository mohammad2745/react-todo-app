import React, { useState, useEffect, useRef } from "react";
import type { Todo } from "../types";
import { TrashIcon, CheckIcon } from "./Icon";

interface TodoItemProps {
  todo: Todo;
  toggleTodo: (id: string) => void;
  deleteTodo: (id: string) => void;
  editTodo: (id: string, text: string) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({
  todo,
  toggleTodo,
  deleteTodo,
  editTodo,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  const handleDoubleClick = () => {
    setIsEditing(true);
  };

  const handleBlur = () => {
    if (editText.trim()) {
      editTodo(todo.id, editText.trim());
    } else {
      // If the edited text is empty, delete the todo
      deleteTodo(todo.id);
    }
    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleBlur();
    } else if (e.key === "Escape") {
      setEditText(todo.text);
      setIsEditing(false);
    }
  };

  return (
    <li className="group flex items-center justify-between bg-secondary p-4 border-b border-border-color last:border-b-0">
      {isEditing ? (
        <input
          ref={inputRef}
          type="text"
          value={editText}
          onChange={(e) => setEditText(e.target.value)}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          className="w-full bg-transparent text-lg text-text-primary focus:outline-none"
        />
      ) : (
        <div
          className="flex items-center flex-grow"
          onDoubleClick={handleDoubleClick}
        >
          <button
            onClick={() => toggleTodo(todo.id)}
            className={`w-7 h-7 mr-4 rounded-full border-2 flex-shrink-0 flex items-center justify-center transition-all duration-200 ${
              todo.completed
                ? "border-accent bg-accent"
                : "border-border-color hover:border-accent"
            }`}
            aria-label={
              todo.completed ? "Mark as not completed" : "Mark as completed"
            }
          >
            {todo.completed && <CheckIcon className="w-5 h-5 text-white" />}
          </button>
          <span
            className={`text-lg cursor-pointer ${
              todo.completed
                ? "line-through text-text-secondary"
                : "text-text-primary"
            }`}
          >
            {todo.text}
          </span>
        </div>
      )}

      {!isEditing && (
        <button
          onClick={() => deleteTodo(todo.id)}
          className="ml-4 p-1 text-text-secondary hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
          aria-label="Delete todo"
        >
          <TrashIcon className="w-5 h-5" />
        </button>
      )}
    </li>
  );
};

export default TodoItem;
