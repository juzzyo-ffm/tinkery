import * as React from "react";

import "./NewTodo.css";

const { useRef } = React;

type NewTodoProps = {
  onAddTodo: (todoText: string) => void;
};

const NewTodo: React.FunctionComponent<NewTodoProps> = (props) => {
  const textInputRef = useRef<HTMLInputElement>(null);

  const handleTodoSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // either manage the state, or use ref
    const enteredText = textInputRef.current!.value;
    console.log(enteredText);
    props.onAddTodo(enteredText);
  };

  return (
    <form onSubmit={handleTodoSubmit}>
      <div>
        <label htmlFor="todo-text">todo text</label>
        <input type="text" id="todo-text" ref={textInputRef} />
      </div>
      <button type="submit">Add Todo</button>
    </form>
  );
};

export default NewTodo;
