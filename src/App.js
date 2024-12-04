import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./Pages/Dashboard";
import Navigation from "./components/Navigation";
import "./App.css";
import ManagerUser from "./Pages/MagagerUser";
import DarkModeToggle from "./components/DarkModeToggle";
import Login from "./Pages/login";

const App = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedMode = localStorage.getItem("darkMode");
    if (storedMode === "true") {
      setIsDarkMode(true);
    }

    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const toggleDarkMode = () => {
    setIsDarkMode((prevMode) => {
      const newMode = !prevMode;
      localStorage.setItem("darkMode", newMode.toString());
      return newMode;
    });
  };

  return (
    <div className={isDarkMode ? "dark-mode" : ""}>
      <Router>
        {user ? (
          <>
            <Navigation user={user} />
            <DarkModeToggle isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
            <div style={{ padding: "20px" }}>
              <Routes>
                <Route path="/dashboard" element={<Dashboard />} />
                {user.role === "Admin" && (
                  <Route path="/manager-user" element={<ManagerUser />} />
                )}
              </Routes>
            </div>
          </>
        ) : (
          <Routes>
            <Route path="/" element={<Login setUser={setUser} />} />
          </Routes>
        )}
      </Router>
    </div>
  );
};


export default App;
