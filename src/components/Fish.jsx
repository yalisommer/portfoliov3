import React from 'react';
import './Fish.css';

const Fish = ({ delay = 0, speed = 25, scale = 1, species = 'basic', style = {}, direction = 'left-to-right', color = null, zIndex = null, link = null, title = null }) => {
  // Determine fish color based on species or use provided color
  const getFishColor = () => {
    // If a specific color is provided, use it
    if (color) {
      return color;
    }
    
    // Otherwise use the default color based on species
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
  };

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
        backgroundColor: getFishColor(),
        '--fish-color': getFishColor()
      }}
    >
      <div className="eye"></div>
      <div 
        className="dorsal-fin" 
        style={{ backgroundColor: getFishColor() }}
      ></div>
      <div 
        className="tail" 
        style={{ borderRightColor: getFishColor() }}
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