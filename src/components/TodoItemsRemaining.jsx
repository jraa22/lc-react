import React, { useContext, useMemo } from 'react';
import { TodosContext } from '../content/TodosContext';

function TodoItemsRemaining() {
  const { todos } = useContext(TodosContext);

  const remainingCalculation = () => {
    console.log('Calculating remainings todos. Slow operation...');
    //for (let index = 0; index < 2000000000; index++) {}
    return todos.filter(todo => !todo.isCompleted).length;
  };

  const remaining = useMemo(remainingCalculation, [todos]);

  return <span>{remaining} items remaining</span>;
}

export default TodoItemsRemaining;
