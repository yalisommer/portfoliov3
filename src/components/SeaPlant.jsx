import React from 'react';
import './SeaPlant.css';

const SeaPlant = ({ height, left, delay = 0, bottom = 0, color = '#2D5A27' }) => {
  // Set z-index based on bottom position
  const zIndex = bottom <= 40 ? 5 : 1; // 5 for front layer, 1 for back layer

  return (
    <div 
      className="sea-plant" 
      style={{ 
        height: `${height}px`,
        left: `${left}%`,
        bottom: `${bottom}px`,
        animationDelay: `${delay}s`,
        zIndex: zIndex
      }}
    >
      <div className="plant-stem" style={{ background: `linear-gradient(to bottom, ${color}, ${color}99)` }}>
        <div className="plant-curl" style={{ borderColor: `transparent transparent ${color} transparent` }}></div>
      </div>
    </div>
  );
};

export default SeaPlant; 