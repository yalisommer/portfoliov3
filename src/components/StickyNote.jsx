import React from 'react';
import './StickyNote.css';
import Badge from './Badge';

const StickyNote = ({ 
  color = '#FFB6C1', 
  projectName = 'Project',
  text = 'Note', 
  top = '50%', 
  left = '50%', 
  rotation = 0,
  badgeTypes = []
}) => {
  return (
    <div 
      className="sticky-note"
      style={{ 
        backgroundColor: color,
        top: top,
        left: left,
        '--rotation': `${rotation}deg`
      }}
    >
      <div className="sticky-note-content">
        <div className="sticky-note-header">
          <h3 className="project-name">{projectName}</h3>
        </div>
        <div className="sticky-note-text">{text}</div>
        <div className="badges-container">
          {badgeTypes.map((badgeType, index) => (
            <Badge 
              key={index} 
              type={badgeType}
            />
          ))}
        </div>
      </div>
      <div className="sticky-note-shadow"></div>
    </div>
  );
};

export default StickyNote; 