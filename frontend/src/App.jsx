import React, { useState, useEffect } from 'react';
import TaskList from './components/TaskList'; 
import TaskForm from './components/TaskForm';

function MyButton(){

    function handleClick(){
      alert('You clicked me ')


    }

        return(
          <button style ={{fontSize: 12, color:'black', borderRadius: 8, cursor:"pointer",}} onClick={handleClick}>
          Submit
          </button>
        )
      }

function App() {
const [tasks, setTasks] = useState([]);
const fetchTasks = async () => {


    try {
      const response = await fetch('http://127.0.0.1:5001/chorz-dev/us-central1/api/tasks');
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      
      const taskData = await response.json();
      setTasks(taskData.data || taskData);
    } catch(error) {
      console.error("Failed to fetch tasks:", error.message);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);




  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h1>Chorz Admin Dashboard</h1>
      <hr />
      
     <TaskList tasks={tasks} onTaskDeleted={fetchTasks} />
     <TaskForm onTaskAdded={fetchTasks} />
      <MyButton />
      
    </div>
  );
}

export default App;