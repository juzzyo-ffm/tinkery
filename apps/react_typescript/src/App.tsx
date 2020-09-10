import React, { FunctionComponent } from "react";
import TodoList from "./components/TodoList";
import NewTodo from "./components/NewTodo";
import { Todo } from "./todo.model";

const App: FunctionComponent = () => {
  const { useState } = React;
  const [todos, setTodos] = useState<Todo[]>([]);

  const todoAddHandler = (text: string) => {
    // prev prefix ensures the latest state when re-rendered
    setTodos((prevTodos) => [
      ...prevTodos,
      {
        id: Math.random().toString(),
        text,
      },
    ]);
  };

  const todoDeleteHandler = (id: string) => {
    setTodos((prevTodos) => {
      return prevTodos.filter((todo) => todo.id !== id);
    });
  };

  return (
    <div className="App">
      <NewTodo onAddTodo={todoAddHandler} />
      <TodoList onDelete={todoDeleteHandler} items={todos} />
    </div>
  );
};

export default App;
