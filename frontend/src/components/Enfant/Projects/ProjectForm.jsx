// src/components/ProjectForm.jsx
import React, { useState } from 'react';

const ProjectForm = ({ onSubmit }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ title, description, image });
    setTitle('');
    setDescription('');
    setImage('');
  };

  return (
    <form onSubmit={handleSubmit} className="project-form">
      <input 
        type="text" 
        placeholder="Project Title" 
        value={title} 
        onChange={(e) => setTitle(e.target.value)} 
        required 
      />
      <textarea 
        placeholder="Project Description" 
        value={description} 
        onChange={(e) => setDescription(e.target.value)} 
        required 
      />
      <input 
        type="text" 
        placeholder="Image URL" 
        value={image} 
        onChange={(e) => setImage(e.target.value)} 
      />
      <button type="submit">Submit Project</button>
    </form>
  );
};

export default ProjectForm;
