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
            top="20%" 
            left="10%" 
            rotation={5}
            badgeTypes={['REACT', 'OPENLAYERS', 'PANDAS', 'MATPLOTLIB', 'DATA_VISUALIZATION']}
            linkTo="/shark-tracker"
          />

          <StickyNote 
            color="#44bf11" 
            projectName="USNews Top College Predictor"
            text="Prediction of top college trends over the near and far future using ML techniques." 
            top="10%" 
            left="40%" 
            rotation={-3}
            badgeTypes={[]}
            linkTo="/"
          />

          <StickyNote 
            color="#ff830f" 
            projectName="SoccerNet Action Spotting"
            text="Classification of unique soccer actions through 3d CNNs trained on labeled video data."
            top="60%" 
            left="70%" 
            rotation={3}
            badgeTypes={[]}
            externalLink="https://github.com/yalisommer/sn-spotting-cv-final-darpli"
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