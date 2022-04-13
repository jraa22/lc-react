import React, { useContext } from 'react';
import { TodosContext } from '../content/TodosContext';

function TodoFilters() {
  const { todosFiltered, filter, setFilter } = useContext(TodosContext);

  return (
    <div>
      <button
        onClick={() => {
          todosFiltered();
          setFilter('all');
        }}
        className={`button filter-button ${
          filter === 'all' ? 'filter-button-active' : ''
        }`}
      >
        All
      </button>
      <button
        onClick={() => {
          todosFiltered();
          setFilter('active');
        }}
        className={`button filter-button ${
          filter === 'active' ? 'filter-button-active' : ''
        }`}
      >
        Active
      </button>
      <button
        onClick={() => {
          todosFiltered();
          setFilter('completed');
        }}
        className={`button filter-button ${
          filter === 'completed' ? 'filter-button-active' : ''
        }`}
      >
        Completed
      </button>
    </div>
  );
}

export default TodoFilters;
