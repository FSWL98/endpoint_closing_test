import React from 'react';
import './App.css';
import TodoList from "./components/TodoList/TodoList";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        Todo App
      </header>
        <TodoList />
    </div>
  );
}

export default App;
