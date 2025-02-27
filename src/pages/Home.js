import React from 'react';
import { Link } from 'react-router-dom';
import RotatingCube from '../components/RotatingCube';

const Home = () => {
  return (
    <div className="home-container">
      <div className="left-section">
        <h1>Is your resume good enough?</h1>
        <p>
          A free and fast AI resume checker doing 16 crucial checks to
          ensure your resume is ready to perform and get you interview
          callbacks.
        </p>
        <Link to="/resume-checker" className="upload-button">
          Upload Your Resume
        </Link>
        <div className="features">
          <div className="feature">
            <div className="feature-icon">✓</div>
            <div className="feature-text">ATS Optimization</div>
          </div>
          <div className="feature">
            <div className="feature-icon">✓</div>
            <div className="feature-text">Industry-specific Analysis</div>
          </div>
          <div className="feature">
            <div className="feature-icon">✓</div>
            <div className="feature-text">Actionable Feedback</div>
          </div>
        </div>
      </div>
      <div className="right-section">
        <RotatingCube />
      </div>
    </div>
  );
};

export default Home;