import { useState } from 'react';
import Another from './Another';
import logo from '../logo.svg';
import '../App.css';

function App() {
  const increment = () => {
    setCount(prevCount => prevCount + 1);
  };

  const decrement = () => {
    setCount(prevCount => prevCount - 1);
  };

  const [count, setCount] = useState(0);

  const someStyle = {
    background: 'red',
    color: 'white',
    fontSize: '28px',
    fontWeight: 'bold',
  };

  return (
    <div className="App">
      <header className="App-header">
        <Another name="Robert" />
        <div>
          <span>{count}</span>
          <button onClick={decrement}>-</button>
          <button onClick={increment}>+</button>
        </div>
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <p style={someStyle}>{3 + 2}</p>
      </header>
    </div>
  );
}

export default App;
