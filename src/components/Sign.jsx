import React from 'react';
import './Sign.css';

const Sign = ({ onAboutClick, onProjectsClick, onSharkTrackerClick, sandColor = '#F5DEB3' }) => {
  const handleLuckyClick = () => {
    // 10% chance for Mars configuration, 10% chance for original colors
    const random = Math.random();
    const isMars = random < 0.1;
    const isOriginal = random >= 0.1 && random < 0.2;

    if (isMars) {
      // Mars configuration
      const marsWater = '#330000'; // Dark red-tinted water
      const marsSand = '#CC0000'; // Bright red sand
      const marsFish = '#228B22'; // Forest green for fish
      const marsPlant = '#FF0000'; // Bright red plants

      // Set Mars water color
      window.dispatchEvent(new CustomEvent('aquariumColorChange', {
        detail: { 
          type: 'water',
          color: marsWater
        }
      }));

      // Set Mars sand color
      window.dispatchEvent(new CustomEvent('aquariumColorChange', {
        detail: { 
          type: 'sand',
          color: marsSand
        }
      }));

      // Set Mars plant color
      window.dispatchEvent(new CustomEvent('aquariumColorChange', {
        detail: { 
          type: 'plant',
          color: marsPlant
        }
      }));

      // Set all fish to Mars green
      const fishIds = ['fish1', 'fish2', 'fish3', 'fish4', 'fish5', 'fish6', 'fish7', 'fish8', 'fish9'];
      fishIds.forEach(id => {
        window.dispatchEvent(new CustomEvent('aquariumColorChange', {
          detail: { 
            type: 'fish',
            id: id,
            color: marsFish
          }
        }));
      });

      return;
    }

    if (isOriginal) {
      // Original color scheme
      const originalWater = '#1E90FF'; // dodger blue
      const originalSand = '#F5DEB3'; // wheat
      const originalPlant = '#2E8B57'; // sea green
      
      // Original fish colors
      const originalFishColors = {
        fish1: '#FF6B6B', // coral red
        fish2: '#4ECDC4', // turquoise
        fish3: '#FFD93D', // golden yellow
        fish4: '#95E1D3', // mint
        fish5: '#FF8B94', // salmon pink
        fish6: '#6C5CE7', // purple
        fish7: '#FFA07A', // light salmon
        fish8: '#98D8C8', // seafoam
        fish9: '#FF9F43'  // orange
      };

      // Set original water color
      window.dispatchEvent(new CustomEvent('aquariumColorChange', {
        detail: { 
          type: 'water',
          color: originalWater
        }
      }));

      // Set original sand color
      window.dispatchEvent(new CustomEvent('aquariumColorChange', {
        detail: { 
          type: 'sand',
          color: originalSand
        }
      }));

      // Set original plant color
      window.dispatchEvent(new CustomEvent('aquariumColorChange', {
        detail: { 
          type: 'plant',
          color: originalPlant
        }
      }));

      // Set each fish to its original color
      Object.entries(originalFishColors).forEach(([id, color]) => {
        window.dispatchEvent(new CustomEvent('aquariumColorChange', {
          detail: { 
            type: 'fish',
            id: id,
            color: color
          }
        }));
      });

      return;
    }

    // Normal configuration
    // Water colors - blue range
    const waterColors = [
      '#1E90FF', // dodger blue
      '#4169E1', // royal blue
      '#4682B4', // steel blue
      '#5F9EA0', // cadet blue
      '#6495ED', // cornflower blue
      '#87CEEB', // sky blue
      '#87CEFA', // light sky blue
      '#B0E0E6'  // powder blue
    ];
    
    // Plant colors - green range
    const plantColors = [
      '#2E8B57', // sea green
      '#3CB371', // medium sea green
      '#20B2AA', // light sea green
      '#48D1CC', // medium turquoise
      '#40E0D0', // turquoise
      '#66CDAA', // medium aquamarine
      '#7FFFD4', // aquamarine
      '#98FB98'  // pale green
    ];
    
    // Sand colors - beige range
    const sandColors = [
      '#F5DEB3', // wheat
      '#DEB887', // burlywood
      '#D2B48C', // tan
      '#BC8F8F', // rosy brown
      '#DAA520', // goldenrod
      '#BDB76B', // dark khaki
      '#F0E68C', // khaki
      '#EEE8AA'  // pale goldenrod
    ];

    // Seeded random number generator
    const seededRandom = (seed) => {
      const x = Math.sin(seed) * 10000;
      return x - Math.floor(x);
    };

    // Function to get a random color with a seed
    const getRandomColor = (seed) => {
      const hue = Math.floor(seededRandom(seed) * 360);
      const saturation = 70 + Math.floor(seededRandom(seed + 1) * 30); // 70-100%
      const lightness = 60 + Math.floor(seededRandom(seed + 2) * 20); // 60-80%
      return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
    };

    // Base colors for each fish with their own seed
    const fishSeeds = {
      fish1: 1,
      fish2: 2,
      fish3: 3,
      fish4: 4,
      fish5: 5,
      fish6: 6,
      fish7: 7,
      fish8: 8,
      fish9: 9
    };

    // Add timestamp to make colors change each time
    const timestamp = Date.now();

    // Generate new colors for each fish using their seeds
    Object.entries(fishSeeds).forEach(([id, seed]) => {
      const newColor = getRandomColor(seed + timestamp);
      window.dispatchEvent(new CustomEvent('aquariumColorChange', {
        detail: { 
          type: 'fish',
          id: id,
          color: newColor
        }
      }));
    });

    // Randomize water color
    const waterColor = waterColors[Math.floor(Math.random() * waterColors.length)];
    window.dispatchEvent(new CustomEvent('aquariumColorChange', {
      detail: { 
        type: 'water',
        color: waterColor
      }
    }));

    // Randomize plant colors
    const plantColor = plantColors[Math.floor(Math.random() * plantColors.length)];
    window.dispatchEvent(new CustomEvent('aquariumColorChange', {
      detail: { 
        type: 'plant',
        color: plantColor
      }
    }));

    // Randomize sand color
    const sandColor = sandColors[Math.floor(Math.random() * sandColors.length)];
    window.dispatchEvent(new CustomEvent('aquariumColorChange', {
      detail: { 
        type: 'sand',
        color: sandColor
      }
    }));
  };

  return (
    <div className="sign">
      <div className="sign-post" style={{
        background: `linear-gradient(
          to bottom,
          #8B4513 0%,
          #8B4513 95%,
          rgba(139, 69, 19, 0) 100%
        )`
      }}></div>
      <div className="sign-arrow sign-arrow-1" onClick={onProjectsClick}>
        <div className="arrow-text">Projects</div>
      </div>
      <div className="sign-arrow sign-arrow-2" onClick={onAboutClick}>
        <div className="arrow-text">About</div>
      </div>
      <div className="sign-arrow sign-arrow-3" onClick={handleLuckyClick}>
        <div className="arrow-text">I'm Feeling Lucky</div>
      </div>
    </div>
  );
};

export default Sign; 