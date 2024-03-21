import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

const Todo = ({ todo, toggleTodo }) => {
  const handleTodoClick = () => {
    toggleTodo(todo.id);
  };

  return (
    <div className="task_detail">
      <input
        id={todo.id}
        className="form-check-input checkbox"
        type="checkbox"
        checked={todo.completed}
        readOnly
        onChange={handleTodoClick}
      />
      <label className="label" for={todo.id}>
        {todo.name}
      </label>
    </div>
  );
};

export default Todo;
