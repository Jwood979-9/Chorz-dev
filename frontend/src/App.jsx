import React from 'react';
import TaskList from './components/TaskList'; 
import TaskForm from './components/TaskForm';
import DonutChart from './components/PieChart';

function MyButton() {
  function handleClick() {
    alert('You clicked me ')
  }

  return(
    <button style={{fontSize: 12, color:'black', borderRadius: 8, cursor:"pointer"}} onClick={handleClick}>
      Submit
    </button>
  )
}

function App() {
  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h1>Chorz Admin Dashboard</h1>
      <hr />
      
      <div style={{display:'flex'}}>
        <DonutChart />
        <TaskList />
      </div>
      
      <br />
      <TaskForm />
      <MyButton />
      
    </div>
  );
}

export default App;