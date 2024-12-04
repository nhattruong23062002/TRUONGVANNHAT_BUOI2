import React from 'react';
import { NavLink } from 'react-router-dom';
import './Navigation.css'; 

const Navigation = ({ user }) => {
  const handleLogout = () => {
    localStorage.removeItem("user");  
    window.location.replace("/"); 
  };

  return (
    <header className="header">
      <nav> 
        <ul className="nav-list">
          <li className="nav-item">
            <NavLink 
              to="/dashboard" 
              className="link"
              activeClassName="active"
            >
              Dashboard
            </NavLink>
          </li>

          {user && user.role === "Admin" && (
            <li className="nav-item">
              <NavLink 
                to="/manager-user" 
                className="link"
                activeClassName="active" 
              >
                Manager User
              </NavLink>
            </li>
          )}

          <li className="nav-item">
            <button onClick={handleLogout}>Logout</button>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Navigation;
