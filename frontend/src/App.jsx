import React from 'react';
import TaskList from './components/TaskList'; 
import TaskForm from './components/TaskForm';

function App() {
  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h1>Chorz Admin Dashboard</h1>
      <hr />
      
      <TaskList /> 
      <TaskForm /> 
    </div>
  );
}

export default App;