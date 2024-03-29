import { useRef, useEffect, useState } from 'react';
import NoTodos from './NoTodos';
import TodoForm from './TodoForm';
import TodoList from './TodoList';
import useLocalStorage from '../hooks/useLocalStorage';
import '../reset.css';
import '../App.css';
import { TodosContext } from '../content/TodosContext';
import { CSSTransition } from 'react-transition-group';
import { SwitchTransition } from 'react-transition-group';

function App() {
  const [todos, setTodos] = useLocalStorage('todos', []);
  const [filter, setFilter] = useState('all');
  const [idForTodo, setIdForTodo] = useLocalStorage('idForTodo', 1);
  const [name, setName] = useLocalStorage('name', '');
  const nameInputEl = useRef(null);

  const todosFiltered = () => {
    if (filter === 'all') {
      return todos;
    } else if (filter === 'active') {
      return todos.filter(todo => !todo.isCompleted);
    } else if (filter === 'completed') {
      return todos.filter(todo => todo.isCompleted);
    }
  };

  const handleNameInput = event => {
    setName(event.target.value);
    //localStorage.setItem('name', JSON.stringify(event.target.value));
  };

  useEffect(() => {
    //console.log('use effect running');
    nameInputEl.current.focus();
    //setName(JSON.parse(localStorage.getItem('name')) ?? '');

    return function cleanup() {
      //console.log('cleaning up');
    };
  }, []);

  return (
    <TodosContext.Provider
      value={{
        todos,
        setTodos,
        idForTodo,
        setIdForTodo,
        todosFiltered,
        filter,
        setFilter,
      }}
    >
      <div className="todo-app-container">
        <div className="todo-app">
          <h2>Todo App</h2>
          <div className="name-container">
            <h2>What is your name?</h2>

            <form action="#">
              <input
                type="text"
                ref={nameInputEl}
                className="todo-input"
                placeholder="What is your name"
                value={name}
                onChange={handleNameInput}
              />
            </form>
            <CSSTransition
              in={name.length > 0}
              timeout={300}
              classNames="slide-vertical"
              unmountOnExit
            >
              <p className="name-label">Hello {name}</p>
            </CSSTransition>
          </div>
          <TodoForm />
          <SwitchTransition mode="out-in">
            <CSSTransition
              key={todos.length > 0}
              timeout={300}
              classNames="slide-vertical"
              unmountOnExit
            >
              {todos.length > 0 ? <TodoList /> : <NoTodos />}
            </CSSTransition>
          </SwitchTransition>
        </div>
      </div>
    </TodosContext.Provider>
  );
}

export default App;
