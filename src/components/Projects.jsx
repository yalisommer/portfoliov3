import React from 'react';
import './Projects.css';
import CorkBoard from './CorkBoard';

const Projects = ({ onBackClick }) => {
  return (
    <div className="projects-container">
      <CorkBoard onBackClick={onBackClick} />
    </div>
  );
};

export default Projects; 