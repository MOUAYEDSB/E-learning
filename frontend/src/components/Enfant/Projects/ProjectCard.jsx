// src/components/ProjectCard.jsx
import React from 'react';

const ProjectCard = ({ project }) => {
  // Adding default values in case project is undefined
  const title = project?.title || 'Untitled Project';
  const description = project?.description || 'No description available.';
  const image = project?.image || 'path/to/default-image.png'; // You can set a default image path

  return (
    <div className="project-card">
      <h3>{title}</h3>
      <p>{description}</p>
      <img src={image} alt={title} />
      <p>By: {project?.author || 'Anonymous'}</p>
      <button onClick={() => alert(`Project ID: ${project?.id}`)}>View Project</button>
    </div>
  );
};

export default ProjectCard;
