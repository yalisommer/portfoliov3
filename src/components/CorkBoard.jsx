import React from 'react';
import './CorkBoard.css';
import StickyNote from './StickyNote';
import { BADGE_TYPES } from './Badge';
import BackButton from './BackButton';

const CorkBoard = ({ onBackClick }) => {
  return (
    <div className="cork-board-container">
      <div className="cork-board-frame">
        <div className="cork-board">
          {/* Project sticky note with badges */}
          <StickyNote 
            color="#FF69B4" 
            projectName="Shark Tracker"
            text="Visualization of Great White Sharks off the coast of Guadalupe Island." 
            top="40%" 
            left="10%" 
            rotation={5}
            badgeTypes={['PYTHON', 'MATPLOTLIB', 'PANDAS']}
          />
          <div className="cork-texture"></div>
        </div>
        
        {/* Back button at the bottom border of the cork board frame */}
        <div className="cork-board-back-button">
          <BackButton onClick={onBackClick} position="right" />
        </div>
      </div>
    </div>
  );
};

export default CorkBoard; 