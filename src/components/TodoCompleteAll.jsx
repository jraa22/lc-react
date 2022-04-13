import React, { useContext } from 'react';
import { TodosContext } from '../content/TodosContext';

function TodoCompleteAll() {
  const { todos, setTodos } = useContext(TodosContext);

  const completeAllTodos = () => {
    const updatedTodos = todos.map(todo => {
      todo.isCompleted = true;
      return todo;
    });

    setTodos(updatedTodos);
  };
  return (
    <div onClick={completeAllTodos} className="button">
      Check All
    </div>
  );
}

export default TodoCompleteAll;
