import { useCallback, useMemo, useState } from "react";
import Header from "./components/Header";
import TodoForm from "./components/TodoForm";
import useLocalStorage from "./hooks/useLocalStorage";
import { Filter, type Todo } from "./types";
import Footer from "./components/Footer";
import TodoList from "./components/TodoList";
import FilterButtons from "./components/FilterButtons";

const App: React.FC = () => {
  const [todos, setTodos] = useLocalStorage<Todo[]>("todos", []);
  const [filter, setFilter] = useState<Filter>(Filter.ALL);

  const addTodo = useCallback(
    (text: string, date: string) => {
      const newTodo: Todo = {
        id: crypto.randomUUID(),
        text,
        completed: false,
        createdAt: date,
      };
      setTodos((prevTodos) => [...prevTodos, newTodo]);
    },
    [setTodos]
  );

  const toggleTodo = useCallback(
    (id: string) => {
      setTodos((prevTodos) =>
        prevTodos.map((todo) =>
          todo.id === id ? { ...todo, completed: !todo.completed } : todo
        )
      );
    },
    [setTodos]
  );

  const deleteTodo = useCallback(
    (id: string) => {
      setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
    },
    [setTodos]
  );

  const editTodo = useCallback(
    (id: string, text: string) => {
      setTodos((prevTodos) =>
        prevTodos.map((todo) => (todo.id === id ? { ...todo, text } : todo))
      );
    },
    [setTodos]
  );

  const clearCompleted = useCallback(() => {
    setTodos((prevTodos) => prevTodos.filter((todo) => !todo.completed));
  }, [setTodos]);

  const filteredTodos = useMemo(() => {
    const sortedTodos = [...todos].sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
    switch (filter) {
      case Filter.ACTIVE:
        return sortedTodos.filter((todo) => !todo.completed);
      case Filter.COMPLETED:
        return sortedTodos.filter((todo) => todo.completed);
      default:
        return sortedTodos;
    }
  }, [todos, filter]);

  const activeCount = useMemo(
    () => todos.filter((todo) => !todo.completed).length,
    [todos]
  );
  const completedCount = useMemo(
    () => todos.length - activeCount,
    [todos, activeCount]
  );

  return (
    <div className="min-h-screen font-sans antialiased pt-8 md:pt-16">
      <Header />
      <main className="w-full max-w-2xl mx-auto px-4">
        <div className="bg-secondary rounded-md shadow-2xl">
          <div className="p-6">
            <TodoForm addTodo={addTodo} />
          </div>

          <div className="px-6 pb-4">
            <TodoList
              todos={filteredTodos}
              toggleTodo={toggleTodo}
              deleteTodo={deleteTodo}
              editTodo={editTodo}
              filter={filter}
            />
          </div>

          {todos.length > 0 && (
            <Footer
              activeCount={activeCount}
              completedCount={completedCount}
              currentFilter={filter}
              setFilter={setFilter}
              clearCompleted={clearCompleted}
            />
          )}
        </div>

        {todos.length > 0 && (
          <div className="mt-6 p-4 bg-secondary rounded-md shadow-2xl sm:hidden">
            <FilterButtons currentFilter={filter} setFilter={setFilter} />
          </div>
        )}
      </main>
      <footer className="text-center text-text-secondary text-xs p-8 mt-8">
        <p>Double-click to edit a todo</p>
        <p>Created with React & Tailwind CSS</p>
      </footer>
    </div>
  );
};

export default App;
