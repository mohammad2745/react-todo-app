import { useCallback, useState } from "react";
import Header from "./components/Header";
import TodoForm from "./components/TodoForm";
import useLocalStorage from "./hooks/useLocalStorage";
import { Filter, type Todo } from "./types";

function App() {
  const [todos, setTodos] = useLocalStorage<Todo[]>("todos", []);
  const [filter, setFilter] = useState<Filter>(Filter.ALL);

  const addTodo = useCallback(
    (text: string) => {
      const newTodo: Todo = {
        id: crypto.randomUUID(),
        text,
        completed: false,
      };
      setTodos((prevTodos) => [...prevTodos, newTodo]);
    },
    [setTodos]
  );

  return (
    <div className="min-h-screen font-sans antialiased pt-8 md:pt-16">
      <Header />
      <main className="w-full max-w-2xl mx-auto px-4">
        <div className="bg-secondary rounded-md shadow-2xl">
          <div className="p-6">
            <TodoForm addTodo={addTodo} />
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
