import React from 'react';
import { Link } from 'react-router-dom';
import LogoIcon from './LogoIcon';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          <LogoIcon />
          <span className="logo-text">SkillScan</span>
        </Link>
        <div className="nav-menu">
          <Link to="/study-plan" className="nav-item">Study Plan</Link>
          <Link to="/interview-questions" className="nav-item">Interview Questions</Link>
          <Link to="/resume-checker" className="nav-item">Resume</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;