import React, { useEffect, useState } from 'react';
import './Fish.css';

const Fish = ({ id, delay = 0, speed = 25, scale = 1, species = 'basic', style = {}, direction = 'left-to-right', color = null, zIndex = null, link = null, title = null }) => {
  const [fishColor, setFishColor] = useState(color || getDefaultColor(species));

  // Determine default fish color based on species
  function getDefaultColor(species) {
    switch (species) {
      case 'pink':
        return '#FFB6C1'; // Light pink
      case 'blue':
        return '#B3CDE0'; // Light blue
      case 'green':
        return '#CCEBC5'; // Light green
      case 'yellow':
        return '#FED9A6'; // Light yellow
      case 'purple':
        return '#DECBE4'; // Light purple
      case 'orange':
        return '#FBB4AE'; // Light orange
      case 'striped':
        return '#FFFFCC'; // Light yellow for striped fish
      default:
        return '#FF6B6B'; // Default coral color
    }
  }

  // Listen for color changes from the "I'm Feeling Lucky" button
  useEffect(() => {
    const handleColorChange = (e) => {
      if (e.detail && e.detail.type === 'fish' && e.detail.id === id && e.detail.color) {
        setFishColor(e.detail.color);
      }
    };

    window.addEventListener('aquariumColorChange', handleColorChange);
    return () => window.removeEventListener('aquariumColorChange', handleColorChange);
  }, [id]);

  // Determine animation based on direction
  const animationStyle = {
    animation: `${direction === 'left-to-right' ? 'swim' : 'swimReverse'} ${speed}s linear infinite`,
    animationDelay: `${delay}s`,
    opacity: 0, // Start invisible
  };

  // Apply scale to the wrapper
  const wrapperStyle = {
    ...style,
    transform: `scale(${scale})`,
    zIndex: zIndex !== null ? zIndex : undefined,
  };

  // Create the fish content
  const fishContent = (
    <div 
      className="fish-body" 
      style={{ 
        backgroundColor: fishColor,
        '--fish-color': fishColor
      }}
    >
      <div className="eye"></div>
      <div 
        className="dorsal-fin" 
        style={{ backgroundColor: fishColor }}
      ></div>
      <div 
        className="tail" 
        style={{ borderRightColor: fishColor }}
      ></div>
      
      {/* Add stripes for striped fish */}
      {species === 'striped' && (
        <>
          <div className="stripe stripe-1"></div>
          <div className="stripe stripe-2"></div>
          <div className="stripe stripe-3"></div>
        </>
      )}
    </div>
  );

  return (
    <>
      <div className="fish-wrapper" style={wrapperStyle}>
        {link ? (
          <a href={link} className="fish-link" target="_blank" rel="noopener noreferrer">
            <div 
              className="fish" 
              style={animationStyle}
            >
              {fishContent}
            </div>
          </a>
        ) : (
          <div 
            className="fish" 
            style={animationStyle}
          >
            {fishContent}
          </div>
        )}
        {title && (
          <div 
            className="fish-title" 
            style={{
              animation: `${direction === 'left-to-right' ? 'titleMove' : 'titleMoveReverse'} ${speed}s linear infinite`,
              animationDelay: `${delay}s`,
              zIndex: zIndex !== null ? zIndex : undefined,
            }}
          >
            {title}
          </div>
        )}
      </div>
    </>
  );
};

export default Fish; 