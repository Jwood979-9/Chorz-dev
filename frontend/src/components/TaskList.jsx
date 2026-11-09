import React, { useState, useEffect } from 'react';

export default function TaskList() {
  
  const [tasks, setTasks] = useState([]);

  
  useEffect(() => {

const fetchTasks = async () => {  
   
        try {
             const response = await fetch('http://127.0.0.1:5001/chorz-dev/us-central1/api/tasks');

        if (!response.ok) {
           throw new Error(`Http error! status: ${response.status}`);
        };

    const taskData = await response.json();
       
    setTasks(taskData.data || taskData);

     } catch(error) {
    
            console.error("Failed to fetch tasks:", error.message);
        
    }
    
 }; 

fetchTasks();

  }, []);

 
  return (
    <div>
      <h2>Chorz Task List</h2>
      <ul>
        {tasks.map(task => (
          <li key={task.id}>
            {task.title} (Clinic: {task.clinicId})
          </li>
        ))}
      </ul>
    </div>
  );
}