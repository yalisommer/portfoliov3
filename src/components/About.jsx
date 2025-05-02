import React from 'react';
import './About.css';

const About = () => {
  return (
    <div className="about-container">
      <div className="tape tape-top-left"></div>
      <div className="tape tape-top-right"></div>
      <div className="tape tape-bottom-left"></div>
      <div className="tape tape-bottom-right"></div>
      <div className="movie-poster">
        <div className="text-container">
          <div className="text-group">
            <div className="text-line">
              <div className="album-text text-1">YALI SOMMER</div>
            </div>
            <div className="text-line">
              <div className="album-text text-2">YALI SOMMER</div>
            </div>
            <div className="text-line">
              <div className="album-text text-3">YALI SOMMER</div>
            </div>
            <div className="text-line">
              <div className="album-text text-4">YALI SOMMER</div>
            </div>
            <div className="text-line">
              <div className="album-text text-5">YALI SOMMER</div>
            </div>
          </div>
          <div className="text-group">
            <div className="text-line">
              <div className="album-text text-6">DEVELOPER</div>
            </div>
            <div className="text-line">
              <div className="album-text text-7">DEVELOPER</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About; 