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
            color="#646cff" 
            projectName="Shark Tracker"
            text="Visualization of Great White Sharks off the coast of Guadalupe Island." 
            top="20%" 
            left="10%" 
            rotation={5}
            badgeTypes={['REACT', 'OPENLAYERS', 'PANDAS', 'MATPLOTLIB', 'DATA_VISUALIZATION']}
            linkTo="/shark-tracker"
          />

          <StickyNote 
            color="#026937" 
            projectName="Alma Metrics"
            text="Prediction of top college trends over the near and far future using ML techniques." 
            top="10%" 
            left="40%" 
            rotation={-3}
            badgeTypes={['PYTHON', 'PANDAS', 'MATPLOTLIB', 'NUMPY', 'DATA_VISUALIZATION']}
            externalLink="https://github.com/yalisommer/Alma-Metrics"
          />

          <StickyNote 
            color="#D6010B" 
            projectName="ViolenceNet"
            text="3D CNN based Violence detection with automated security and content moderation applications."
            top="60%" 
            left="70%" 
            rotation={3}
            badgeTypes={['TENSORFLOW', 'OPENCV', 'DEEP_LEARNING']}
            externalLink="https://github.com/yalisommer/ViolenceNet-Darpli"
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