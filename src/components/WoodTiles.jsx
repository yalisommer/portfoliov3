import React from 'react';
import './WoodTiles.css';

const WoodTiles = () => {
  const PLANK_WIDTH = 600;
  const PLANK_HEIGHT = 150; // 1.5x taller
  const ROW_OFFSET = PLANK_WIDTH / 2;

  // Array of wood hues - natural wood colors
  const woodHues = [
    'hsl(25, 45%, 45%)',  // Dark oak
    'hsl(30, 40%, 55%)',  // Classic oak
    'hsl(20, 35%, 40%)',  // Walnut
    'hsl(35, 45%, 60%)',  // Pine
    'hsl(28, 42%, 50%)',  // Cherry
    'hsl(32, 38%, 48%)'   // Mahogany
  ];

  // Calculate how many planks we need to cover the screen plus extra for transitions
  // For 100% shift, we need at least 2x the screen width plus extra for smooth transitions
  const planksPerRow = Math.ceil((window.innerWidth * 3 + ROW_OFFSET) / PLANK_WIDTH) + 10; // Tripled width plus extra
  const rows = Math.ceil(window.innerHeight / PLANK_HEIGHT) + 15; // Increased rows for vertical coverage
  const totalPlanks = planksPerRow * rows;

  // Calculate the initial offset to center the wood planks
  const totalWidth = planksPerRow * PLANK_WIDTH;
  const initialOffset = -(totalWidth - window.innerWidth) / 2;

  return (
    <div className="wood-tiles">
      {[...Array(totalPlanks)].map((_, index) => {
        const row = Math.floor(index / planksPerRow);
        const col = index % planksPerRow;
        const offset = row % 2 === 0 ? 0 : ROW_OFFSET;
        
        // Use a combination of position and random factor for wood color
        // This creates a more natural-looking random distribution
        const colorIndex = Math.floor(
          (Math.sin(row * 0.5 + col * 0.7 + index * 0.3) + 1) * 
          woodHues.length / 2
        );
        
        return (
          <div 
            key={index} 
            className="wood-plank"
            style={{
              backgroundColor: woodHues[colorIndex],
              transform: `translate(${col * PLANK_WIDTH - offset + initialOffset}px, ${row * PLANK_HEIGHT}px)`
            }}
          />
        );
      })}
    </div>
  );
};

export default WoodTiles; 