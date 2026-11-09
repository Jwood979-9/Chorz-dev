import React from 'react';
import TaskList from './components/TaskList'; 

function App() {
  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h1>Chorz Admin Dashboard</h1>
      <hr />
      {/* This mounts your component to the screen */}
      <TaskList /> 
    </div>
  );
}

export default App;