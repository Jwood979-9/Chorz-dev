import React, { useState, useEffect } from 'react';
import TaskCard from './TaskCard';
import OutlinedCard from './TaskCard';
import Box from '@mui/material/Box';



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

        if (onTaskDeleted) {
        onTaskDeleted();
      }

    } catch(error){

        console.log("Failed to delete task",error.message);

    }





  }
 
 
  return (
    <div>
      <h2>Chorz Task List</h2>
     <Box sx={{ 
          border:'solid',
          borderColor:'white',
          borderRadius:'8px',
          display: 'flex', 
          flexDirection: 'column', 
          gap: '20px',
          maxHeight: '600px', 
          overflowY: 'auto',  
          padding: '20px',
          '&::-webkit-scrollbar': { 
            display: 'none' 
          }     
        }}
      >
        
        
        {tasks.map(task => (
          <OutlinedCard 
            key={task.id} 
            task={task} 
            onDelete={handleDelete} 
          />
        ))}
    </Box>
    </div>
  );
}

