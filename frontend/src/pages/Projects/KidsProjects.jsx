// src/pages/KidsProjects.jsx
import React, { useState } from 'react';
import './kidsproject.css'; // Import the CSS file
import ProjectList from '../../components/Enfant/Projects/ProjectList'; // Corrected import
import ProjectForm from '../../components/Enfant/Projects/ProjectForm';

const KidsProjects = () => {
  const [projects, setProjects] = useState([]);

  const handleNewProject = (project) => {
    setProjects([...projects, { ...project, id: projects.length + 1, author: 'Kid' }]);
    console.log('New Project Added:', { ...project, id: projects.length + 1, author: 'Kid' });
  };

  return (
    <div className="kids-projects">
      <h1>Kids Projects</h1>
      <ProjectForm onSubmit={handleNewProject} />
      <ProjectList projects={projects} />
    </div>
  );
};

export default KidsProjects;
