import React from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import OutlinedCard from './TaskCard';
import Box from '@mui/material/Box';

export default function TaskList() {
  const queryClient = useQueryClient();

  const { data: tasks, isLoading, isError, error } = useQuery({
    queryKey: ['tasks'],
    queryFn: async () => {
      const response = await fetch('http://127.0.0.1:5001/chorz-dev/us-central1/api/tasks');
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      const taskData = await response.json();
      return taskData.data || taskData;
    }
  });

  const handleDelete = async (taskid) => {
    try {
      if (!taskid) throw new Error(`ID must be valid`);
      
      const response = await fetch(`http://127.0.0.1:5001/chorz-dev/us-central1/api/tasks/${taskid}`, {
        method: 'DELETE'
      });

      if (!response.ok) throw new Error(`Issues: ${response.statusText}`);

      console.log(`Task ${taskid} was deleted successfully `);
      queryClient.invalidateQueries({ queryKey: ['tasks'] });

    } catch (error) {
      console.log("Failed to delete task", error.message);
    }
  };

  if (isLoading) return <div style={{color: 'white'}}>Loading Chorz Tasks...</div>;
  if (isError) return <div style={{color: 'red'}}>Error: {error.message}</div>;

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
            key={task.id || task.title} 
            task={task} 
            onDelete={handleDelete} 
          />
        ))}
      </Box>
    </div>
  );
}