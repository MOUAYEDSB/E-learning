// src/components/ProjectList.jsx
import React from 'react';
import ProjectCard from './ProjectCard';

const ProjectList = ({ projects }) => {
  return (
    <div className="project-list">
      {projects.map((project) => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </div>
  );
};

export default ProjectList;
