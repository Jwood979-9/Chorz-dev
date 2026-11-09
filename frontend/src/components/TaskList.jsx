import React, { useState, useEffect } from 'react';

export default function TaskList({tasks}) {
  
 
 
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