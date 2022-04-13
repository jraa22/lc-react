import React, { useContext } from 'react';
import TodoItemsRemaining from './TodoItemsRemaining';
import TodoClearCompleted from './TodoClearCompleted';
import TodoCompleteAll from './TodoCompleteAll';
import TodoFilters from './TodoFilters';
import useToggle from '../hooks/useToggle';
import { TodosContext } from '../content/TodosContext';

function TodoList() {
  const { todos, setTodos, todosFiltered } = useContext(TodosContext);
  const [isFeatureOneVisible, setFeatureOneVisible] = useToggle();
  const [isFeatureTwoVisible, setFeatureTwoVisible] = useToggle();

  const deleteTodo = id => {
    setTodos([...todos].filter(todo => todo.id !== id));
  };

  const completeTodo = id => {
    const updatedTodos = todos.map(todo => {
      if (todo.id === id) {
        todo.isCompleted = !todo.isCompleted;
      }

      return todo;
    });

    setTodos(updatedTodos);
  };

  const markAsEditing = id => {
    const updatedTodos = todos.map(todo => {
      if (todo.id === id) {
        todo.isEditing = true;
      }

      return todo;
    });

    setTodos(updatedTodos);
  };

  const cancelEdit = id => {
    const updatedTodos = todos.map(todo => {
      if (todo.id === id) {
        todo.isEditing = false;
      }

      return todo;
    });

    setTodos(updatedTodos);
  };

  const updateTodo = (event, id) => {
    const updatedTodos = todos.map(todo => {
      if (todo.id === id) {
        if (event.target.value.trim().length === 0) {
          todo.isEditing = false;
          return todo;
        }
        todo.title = event.target.value;
        todo.isEditing = false;
      }

      return todo;
    });

    setTodos(updatedTodos);
  };

  return (
    <>
      <ul className="todo-list">
        {todosFiltered().map((todo, index) => (
          <li key={todo.id} className="todo-item-container">
            <div className="todo-item">
              <input
                type="checkbox"
                onChange={() => completeTodo(todo.id)}
                checked={todo.isCompleted ? true : false}
              />
              {!todo.isEditing ? (
                <span
                  onDoubleClick={() => markAsEditing(todo.id)}
                  className={`todo-item-labe ${
                    todo.isCompleted ? 'line-through' : ''
                  }`}
                >
                  {todo.title}
                </span>
              ) : (
                <input
                  type="text"
                  className="todo-item-input"
                  defaultValue={todo.title}
                  autoFocus
                  onBlur={event => updateTodo(event, todo.id)}
                  onKeyDown={event => {
                    if (event.key === 'Enter') {
                      updateTodo(event, todo.id);
                    } else if (event.key === 'Escape') {
                      cancelEdit(todo.id);
                    }
                  }}
                />
              )}
            </div>
            <button onClick={() => deleteTodo(todo.id)} className="x-button">
              <svg
                className="x-button-icon"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </li>
        ))}
      </ul>

      <div className="toggles-container">
        <button onClick={setFeatureOneVisible} className="button">
          Feature One
        </button>
        <button onClick={setFeatureTwoVisible} className="button">
          Feature Two
        </button>
      </div>

      {isFeatureOneVisible && (
        <div className="check-all-container">
          <div>
            <TodoCompleteAll />
          </div>

          <TodoItemsRemaining />
        </div>
      )}
      {isFeatureTwoVisible && (
        <div className="other-buttons-container">
          <TodoFilters />
          <div>
            <TodoClearCompleted />
          </div>
        </div>
      )}
    </>
  );
}

export default TodoList;
