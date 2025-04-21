import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './SharkTracker.css';
import MapView from '../components/MapView';
import LoadingSpinner from '../components/LoadingSpinner';
import BackButton from '../components/BackButton';

function SharkTracker() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Simulate data loading
    const loadData = async () => {
      try {
        // Simulate a delay for loading data
        await new Promise((resolve) => setTimeout(resolve, 2000));
        setLoading(false);
      } catch (err) {
        setError('Failed to load data');
        setLoading(false);
      }
    };

    loadData();

    // Add the class to the body element
    document.body.classList.add('shark-tracker-bg');

    // Remove the class when the component is unmounted
    return () => {
      document.body.classList.remove('shark-tracker-bg');
    };
  }, []);

  const handleBackToProjects = () => {
    navigate('/', { state: { targetScene: 3 } });
  };

  return (
    <div className="shark-tracker">
      <h1>Shark Tracker</h1>
      <p>Welcome to Yali's Great White Shark Tracker Display. Shark Data provided by the SEANOE White Shark database, cleaned and visualized by yours truly. Sharks captured off the coast of Guadalupe Island.</p>
      {loading ? <LoadingSpinner /> : <MapView />}
      {error && <p className="error">{error}</p>}
      <BackButton onClick={handleBackToProjects} position="left" text="Back to Projects" />
    </div>
  );
}

export default SharkTracker;