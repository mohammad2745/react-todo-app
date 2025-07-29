import React from "react";
import { Filter, type Todo } from "../types";
import TodoItem from "./TodoItem";

interface TodoListProps {
  todos: Todo[];
  toggleTodo: (id: string) => void;
  deleteTodo: (id: string) => void;
  editTodo: (id: string, text: string) => void;
  filter: Filter;
}

const getEmptyStateMessage = (filter: Filter) => {
  switch (filter) {
    case Filter.ACTIVE:
      return {
        title: "No active todos",
        subtitle: "You can relax for now!",
      };
    case Filter.COMPLETED:
      return {
        title: "No completed todos",
        subtitle: "Keep up the great work!",
      };
    default: // ALL
      return {
        title: "You're all caught up!",
        subtitle: "Add a new todo to get started.",
      };
  }
};

const formatDateHeading = (dateString: string) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);

  const todoDateUTC = new Date(dateString);
  const todoDateLocal = new Date(
    todoDateUTC.valueOf() + todoDateUTC.getTimezoneOffset() * 60 * 1000
  );
  todoDateLocal.setHours(0, 0, 0, 0);

  if (todoDateLocal.getTime() === today.getTime()) {
    return "Today";
  }
  if (todoDateLocal.getTime() === yesterday.getTime()) {
    return "Yesterday";
  }
  return new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(todoDateLocal);
};

const TodoList: React.FC<TodoListProps> = ({
  todos,
  toggleTodo,
  deleteTodo,
  editTodo,
  filter,
}) => {
  if (todos.length === 0) {
    const { title, subtitle } = getEmptyStateMessage(filter);
    return (
      <div className="text-center py-10 text-text-secondary">
        <p className="font-semibold">{title}</p>
        <p className="text-sm">{subtitle}</p>
      </div>
    );
  }

  const groupedTodos = todos.reduce((acc, todo) => {
    const date = todo.createdAt || new Date().toISOString().split("T")[0];
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(todo);
    return acc;
  }, {} as Record<string, Todo[]>);

  const sortedDates = Object.keys(groupedTodos).sort(
    (a, b) => new Date(b).getTime() - new Date(a).getTime()
  );

  return (
    <div className="space-y-6">
      {sortedDates.map((date) => (
        <div key={date}>
          <h2 className="px-1 pb-2 text-sm font-bold text-accent-hover tracking-wider">
            {formatDateHeading(date)}
          </h2>
          <ul className="overflow-hidden rounded-md">
            {groupedTodos[date].map((todo) => (
              <TodoItem
                key={todo.id}
                todo={todo}
                toggleTodo={toggleTodo}
                deleteTodo={deleteTodo}
                editTodo={editTodo}
              />
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default TodoList;
