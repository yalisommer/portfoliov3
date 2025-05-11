import React from 'react';
import './About.css';
import arrowImage from '../assets/arrow.png';

const About = ({ onBackClick }) => {
  const handleBack = () => {
    if (onBackClick) {
      onBackClick();
    }
  };

  return (
    <div className="about-container">
      <div className="tape tape-top-left"></div>
      <div className="tape tape-top-right"></div>
      <div className="tape tape-bottom-left"></div>
      <div className="tape tape-bottom-right"></div>
      <div className="movie-poster">
        <div className="text-area text-area-top">
          <p>About me,</p>
          <p></p>
        </div>
        <div className="text-area text-area-middle">
          <p>Current Junior at Brown University studying mathematics & computer science. Interested in backend development, LLM integration, data science, computer vision, and designing/implementing the occasional pretty website (including this one). Check out my projects tab :)</p>
        </div>
        <div className="text-area text-area-experience">
          <p>Experience:</p>
          <p>AI/ML SWE Intern at Ituran (Summer 2025)</p>
          <p>DSA Teaching Assistant at Brown University</p>
          <p>Research Assistant at Florida International University</p>
        </div>
        <div className="text-area text-area-contact">
          <p>Contact me:</p>
          <p><a href="https://www.linkedin.com/in/yalisommer/" target="_blank" rel="noopener noreferrer">LinkedIn</a> | <a href="mailto:yalisommer@gmail.com">Email</a></p>
        </div>
        <img 
          src={arrowImage} 
          alt="Back" 
          className="poster-image" 
          onClick={handleBack}
        />
      </div>
    </div>
  );
};

export default About; 