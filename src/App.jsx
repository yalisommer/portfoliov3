import React, { useState, useCallback } from 'react'
import './App.css'
import Aquarium from './components/Aquarium'
import WoodTiles from './components/WoodTiles'
import About from './components/About'
import Projects from './components/Projects'
import BackButton from './components/BackButton'

function App() {
  const [currentScene, setCurrentScene] = useState(2); // Start at scene 2 (center)
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [transitionDirection, setTransitionDirection] = useState('');

  const handleSceneChange = useCallback((targetScene) => {
    if (!isTransitioning) {
      // Set transition state and direction
      setIsTransitioning(true);
      setTransitionDirection(targetScene > currentScene ? 'right' : 'left');
      
      // Use requestAnimationFrame to ensure smooth transition
      requestAnimationFrame(() => {
        // Update the current scene
        setCurrentScene(targetScene);
        
        // Reset transition state after animation completes
        setTimeout(() => {
          setIsTransitioning(false);
        }, 1000); // Match the CSS transition duration (1s)
      });
    }
  }, [currentScene, isTransitioning]);

  const handleAboutClick = () => {
    handleSceneChange(1); // Scene 1 is About
  };

  const handleProjectsClick = () => {
    handleSceneChange(3); // Scene 3 is Projects
  };

  const handleBackToCenter = () => {
    handleSceneChange(2); // Scene 2 is Aquarium (center)
  };

  return (
    <div className="app">
      <div 
        className={`wood-container ${isTransitioning ? `transitioning-${transitionDirection}` : ''}`}
        data-scene={currentScene}
      >
        <WoodTiles />
      </div>
      <div 
        className={`page-container ${isTransitioning ? `transitioning-${transitionDirection}` : ''}`}
        data-scene={currentScene}
      >
        <div className="page">
          <About />
          <BackButton onClick={handleBackToCenter} position="right" />
        </div>
        <div className="page">
          <Aquarium onAboutClick={handleAboutClick} onProjectsClick={handleProjectsClick} />
        </div>
        <div className="page">
          <Projects onBackClick={handleBackToCenter} />
        </div>
      </div>
    </div>
  )
}

export default App
