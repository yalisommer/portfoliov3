import React from 'react';
import './Badge.css';

// Predefined badge types with their colors
export const BADGE_TYPES = {
  // Programming Languages
  PYTHON: { text: 'Python', color: '#3776AB' },
  JAVASCRIPT: { text: 'JavaScript', color: '#F7DF1E' },
  TYPESCRIPT: { text: 'TypeScript', color: '#3178C6' },
  JAVA: { text: 'Java', color: '#007396' },
  C_SHARP: { text: 'C#', color: '#239120' },
  C_PLUS_PLUS: { text: 'C++', color: '#00599C' },
  
  // Web Technologies
  REACT: { text: 'React', color: '#61DAFB' },
  NODE: { text: 'Node.js', color: '#339933' },
  HTML: { text: 'HTML', color: '#E34F26' },
  CSS: { text: 'CSS', color: '#1572B6' },
  
  // Data Science & ML
  PANDAS: { text: 'Pandas', color: '#130654' },
  MATPLOTLIB: { text: 'Matplotlib', color: '#11557C' },
  NUMPY: { text: 'NumPy', color: '#4DABCF' },
  TENSORFLOW: { text: 'TensorFlow', color: '#FF6F00' },
  
  // Databases
  MONGODB: { text: 'MongoDB', color: '#47A248' },
  SQL: { text: 'SQL', color: '#336791' },
  
  // Tools & Frameworks
  GIT: { text: 'Git', color: '#F05032' },
  DOCKER: { text: 'Docker', color: '#2496ED' },
  AWS: { text: 'AWS', color: '#FF9900' }
};

const Badge = ({ type, customText, customColor }) => {
  // Use predefined badge type or custom values
  const badgeData = type && BADGE_TYPES[type] 
    ? BADGE_TYPES[type] 
    : { text: customText || 'Badge', color: customColor || '#4a90e2' };

  return (
    <div 
      className="badge"
      style={{ 
        backgroundColor: badgeData.color
      }}
    >
      {badgeData.text}
    </div>
  );
};

export default Badge; 