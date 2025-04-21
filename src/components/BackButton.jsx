import React from 'react';
import './BackButton.css';

const BackButton = ({ onClick, position, text = "Back" }) => {
  return (
    <button 
      className={`back-button ${position}`} 
      onClick={onClick}
    >
      <span className="button-text">{text}</span>
    </button>
  );
};

export default BackButton; 