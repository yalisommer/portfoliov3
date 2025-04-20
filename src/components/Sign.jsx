import React from 'react';
import './Sign.css';

const Sign = ({ onAboutClick, onProjectsClick }) => {
  return (
    <div className="sign">
      <div className="sign-post"></div>
      <div className="sign-arrow sign-arrow-1" onClick={onProjectsClick}>
        <div className="arrow-text">Projects</div>
      </div>
      <div className="sign-arrow sign-arrow-2" onClick={onAboutClick}>
        <div className="arrow-text">About</div>
      </div>
      <div className="sign-arrow sign-arrow-3">
        <div className="arrow-text">Contact</div>
      </div>
    </div>
  );
};

export default Sign; 