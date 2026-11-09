import React, { useState } from 'react';

export default function TaskForm() {
 
  const [formData, setFormData] = useState({
    title: '',
    clinicId: '',
    description: ''
  });


  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  
  const handleSubmit = async (e) => {
    e.preventDefault(); 

    try {


      const response = await fetch('http://127.0.0.1:5001/chorz-dev/us-central1/api/tasks',{
        method: 'POST',
        headers:{'Content-Type': 'application/json'},
        body: JSON.stringify(formData)
      } );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      console.log("Task submitted successfully!");
      
      
      setFormData({ title: '', clinicId: '', description: '' });

    } catch (error) {
      console.error("Failed to submit task:", error.message);
    }
  };


  return (
    <div style={{ marginBottom: '40px', padding: '20px', border: '1px solid #ccc' }}>
      <h3>Create a New Task</h3>
      
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxWidth: '400px' }}>
        <input 
          type="text" 
          name="title" 
          placeholder="Task Title" 
          value={formData.title} 
          onChange={handleChange} 
          required 
        />
        <input 
          type="text" 
          name="clinicId" 
          placeholder="Clinic ID (e.g., CL-104)" 
          value={formData.clinicId} 
          onChange={handleChange} 
          required 
        />
        <textarea 
          name="description" 
          placeholder="Task Description" 
          value={formData.description} 
          onChange={handleChange} 
          required 
        />
        <button type="submit" style={{ padding: '10px', cursor: 'pointer' }}>
          Submit Task
        </button>
      </form>
    </div>
  );
}