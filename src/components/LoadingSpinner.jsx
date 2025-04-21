import React from 'react';
import sharkImage from '../assets/shark-img.png'; // Import the image
import './LoadingSpinner.css'; // Import the CSS

function LoadingSpinner() {
  return (
    <div className="loading-container">
      <img
        src={sharkImage}
        alt="Loading..."
        className="loading-shark"
        style={{
          width: '100px',
          height: '100px',
          objectFit: 'contain'
        }}
      />
      <p>Loading map data...</p>
    </div>
  );
}

export default LoadingSpinner;