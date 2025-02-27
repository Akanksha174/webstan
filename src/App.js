import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import ResumeChecker from './pages/ResumeChecker';
import StudyPlan from './pages/StudyPlan';
import InterviewQuestions from './pages/Interview';

const App = () => {
  return (
    <Router>
      <div className="app-container">
        <Navbar />
        <Routes>
          <Route path="/resume-checker" element={<ResumeChecker />} />
          <Route path="/study-plan" element={<StudyPlan />} />
          <Route path="/interview-questions" element={<InterviewQuestions />} />
          <Route path="/" element={<Home />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;