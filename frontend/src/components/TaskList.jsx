import React, { useState, useEffect } from 'react';



export default function TaskList({tasks, onTaskDeleted}) {
  const handleDelete = async(taskid)=> {
    try {

        if(!taskid){
        throw new Error(`ID must be valid: {error.message}`);


        }
        const response = await fetch(`http://127.0.0.1:5001/chorz-dev/us-central1/api/tasks/${taskid}`,{

            method:'DELETE'
        });

        if (!response.ok){
            throw new Error(`Issues  : ${response.message}`);
        }

       

       console.log(`Task ${taskid} was deleted successfully `)



    } catch(error){

        console.log("Failed to delete task",error.message);

    }





  }
 
 
  return (
    <div>
      <h2>Chorz Task List</h2>
      <ul>
        {tasks.map(task => (
          <li key={task.id} style={{ backgroundColor: '#0d1321' ,  borderRadius: 8 , marginBottom: '15px', padding: '10px', border: '1px solid #eee', display: 'flex', justifyContent: 'space-between', maxWidth: '400px' }}>
          <div>
              <strong>{task.title}</strong> <br />
              <small>Clinic: {task.clinicId}</small>
            </div>
            
            
            <button 
              onClick={() => handleDelete(task.id)} 
              style={{ borderRadius: 8 ,backgroundColor: '#e80707', color: 'white', border: 'none', cursor: 'pointer', padding: '5px 10px' }}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

