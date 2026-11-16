import React, { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export default function TaskForm() {
  const queryClient = useQueryClient();

  const [formData, setFormData] = useState({
    title: '',
    clinicId: '',
    description: '',
    status: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const mutation = useMutation({
    mutationFn: async (newTask) => {
      const response = await fetch('http://127.0.0.1:5001/chorz-dev/us-central1/api/tasks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newTask)
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    },
    onSuccess: () => {
      setFormData({ title: '', clinicId: '', description: '', status: '' });
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    },
    onError: (error) => {
      console.error("Failed to submit task:", error.message);
    }
  });

  const handleSubmit = (e) => {
    e.preventDefault(); 
    mutation.mutate(formData);
  };

  return (
    <div style={{ width: 400, marginBottom: '40px', padding: '40px', border: '1px solid #ccc', borderRadius: '8px' }}>
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
         <input 
          type="text" 
          name="status" 
          placeholder="Status" 
          value={formData.status} 
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
        <button 
          type="submit" 
          disabled={mutation.isPending}
          style={{ padding: '10px', cursor: 'pointer' }}
        >
          {mutation.isPending ? 'Submitting...' : 'Submit Task'}
        </button>
      </form>
    </div>
  );
}