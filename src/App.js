import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './Pages/Dashboard';
import Navigation from './components/Navigation';
import './App.css';
import ManagerUser from './Pages/MagagerUser';
import DarkModeToggle from './components/DarkModeToggle'; 

const App = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const storedMode = localStorage.getItem('darkMode');
    if (storedMode === 'true') {
      setIsDarkMode(true);
    }
  }, []);

  const toggleDarkMode = () => {
    setIsDarkMode(prevMode => {
      const newMode = !prevMode;
      localStorage.setItem('darkMode', newMode.toString()); 
      return newMode;
    });
  };

  return (
    <div className={isDarkMode ? 'dark-mode' : ''}>
      <Router>
        <Navigation />
        <DarkModeToggle isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
        <div style={{ padding: '20px' }}>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/manager-user" element={<ManagerUser />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
};

export default App;
