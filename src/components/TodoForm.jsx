import React, { useState } from 'react';
import PropTypes from 'prop-types';

TodoForm.propTypes = {
  addTodo: PropTypes.func.isRequired,
};

function TodoForm(props) {
  const [todoInput, setTodoInput] = useState('');

  const handleOnChangeInput = event => {
    setTodoInput(event.target.value);
  };

  const handleSubmit = event => {
    event.preventDefault();
    if (todoInput.trim().length === 0) return;

    props.addTodo(todoInput);
    setTodoInput('');
  };

  return (
    <form action="#" onSubmit={handleSubmit}>
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
