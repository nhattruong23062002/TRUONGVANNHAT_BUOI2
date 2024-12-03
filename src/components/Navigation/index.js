import React from 'react';
import { NavLink } from 'react-router-dom';
import './Navigation.css'; 

const Navigation = () => {
  return (
    <header className="header">
      <nav>
        <ul className="nav-list">
          <li className="nav-item">
            <NavLink 
              to="/" 
              className="link"
              activeClassName="active"
            >
              Chart
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink 
              to="/manager-user" 
              className="link"
              activeClassName="active" 
            >
              Manager User
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Navigation;
