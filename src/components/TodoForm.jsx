import React, { useState, useContext } from 'react';
import { TodosContext } from '../content/TodosContext';

function TodoForm(props) {
  const { todos, setTodos, idForTodo, setIdForTodo } = useContext(TodosContext);
  const [todoInput, setTodoInput] = useState('');

  const handleOnChangeInput = event => {
    setTodoInput(event.target.value);
  };

  const addTodo = event => {
    event.preventDefault();
    if (todoInput.trim().length === 0) return;

    setTodos([
      ...todos,
      {
        id: idForTodo,
        title: todoInput,
        isCompleted: false,
      },
    ]);

    setIdForTodo(prevId => prevId + 1);
    setTodoInput('');
  };

  return (
    <form action="#" onSubmit={addTodo}>
      <input
        type="text"
        value={todoInput}
        onChange={handleOnChangeInput}
        className="todo-input"
        placeholder="What do you need to do?"
      />
    </form>
  );
}

export default TodoForm;
