import { useRef, useEffect, useMemo } from 'react';
import NoTodos from './NoTodos';
import TodoForm from './TodoForm';
import TodoList from './TodoList';
import useLocalStorage from '../hooks/useLocalStorage';
import '../reset.css';
import '../App.css';

function App() {
  const [todos, setTodos] = useLocalStorage('todos', []);
  /*const [todos, setTodos] = useState([
    {
      id: 1,
      title: 'Finish React Series',
      isCompleted: false,
      isEditing: false,
    },
    {
      id: 2,
      title: 'Go Grocery',
      isCompleted: true,
      isEditing: false,
    },
    {
      id: 3,
      title: 'Take over world',
      isCompleted: false,
      isEditing: false,
    },
  ]);*/

  //const [idForTodo, setIdForTodo] = useState(4);
  const [idForTodo, setIdForTodo] = useLocalStorage('idForTodo', 1);

  //const [name, setName] = useState('');
  const [name, setName] = useLocalStorage('name', '');
  const nameInputEl = useRef(null);

  const addTodo = todo => {
    setTodos([
      ...todos,
      {
        id: idForTodo,
        title: todo,
        isCompleted: false,
      },
    ]);

    setIdForTodo(prevId => prevId + 1);
  };

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

  const remainingCalculation = () => {
    console.log('Calculating remainings todos. Slow operation...');
    for (let index = 0; index < 2000000000; index++) {}
    return todos.filter(todo => !todo.isCompleted).length;
  };

  const remaining = useMemo(remainingCalculation, [todos]);

  const clearCompleted = () => {
    setTodos([...todos].filter(todo => !todo.isCompleted));
  };

  const completeAllTodos = () => {
    const updatedTodos = todos.map(todo => {
      todo.isCompleted = true;
      return todo;
    });

    setTodos(updatedTodos);
  };

  const todosFiltered = filter => {
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
          {name && <p className="name-label">Hello {name}</p>}
        </div>
        <TodoForm addTodo={addTodo} />

        {todos.length > 0 ? (
          <TodoList
            todos={todos}
            completeTodo={completeTodo}
            markAsEditing={markAsEditing}
            updateTodo={updateTodo}
            cancelEdit={cancelEdit}
            deleteTodo={deleteTodo}
            remaining={remaining}
            clearCompleted={clearCompleted}
            completeAllTodos={completeAllTodos}
            todosFiltered={todosFiltered}
          />
        ) : (
          <NoTodos />
        )}
      </div>
    </div>
  );
}

export default App;
