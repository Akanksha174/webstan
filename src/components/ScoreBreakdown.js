import React from 'react';

const ScoreBreakdown = ({ sections }) => {
  return (
    <div className="score-breakdown">
      <h3>Score Breakdown</h3>
      {sections.map((section, index) => (
        <div key={index} className="score-section">
          <div className="section-name">{section.name}</div>
          <div className="section-score">
            <div 
              className="score-bar" 
              style={{ width: `${(section.score / section.maxScore) * 100}%` }}
            ></div>
            <span className="score-text">
              {section.score}/{section.maxScore}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ScoreBreakdown;