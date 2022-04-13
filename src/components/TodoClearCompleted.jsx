import React, { useContext } from 'react';
import { TodosContext } from '../content/TodosContext';

function TodoClearCompleted() {
  const { todos, setTodos } = useContext(TodosContext);

  const clearCompleted = () => {
    setTodos([...todos].filter(todo => !todo.isCompleted));
  };

  return (
    <button onClick={clearCompleted} className="button">
      Clear completed
    </button>
  );
}

export default TodoClearCompleted;
