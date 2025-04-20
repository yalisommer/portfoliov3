import React from 'react';
import './BackButton.css';

const BackButton = ({ onClick, position }) => {
  return (
    <button 
      className={`back-button ${position}`} 
      onClick={onClick}
    >
      <span className="button-text">Back</span>
    </button>
  );
};

export default BackButton; 