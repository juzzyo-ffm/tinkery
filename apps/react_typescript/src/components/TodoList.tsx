import * as React from "react";

import "./TodoList.css";

interface TodoListProps {
  items: { id: string; text: string }[];
  onDelete: (id: string) => void;
}
const TodoList: React.FunctionComponent<TodoListProps> = (props) => {
  const { items, onDelete } = props;

  return (
    <ul>
      {items.map((todo) => (
        <li key={todo.id}>
          <span>{todo.text}</span>
          <button onClick={onDelete.bind(null, todo.id)}>Delete</button>
        </li>
      ))}
    </ul>
  );
};

export default TodoList;
