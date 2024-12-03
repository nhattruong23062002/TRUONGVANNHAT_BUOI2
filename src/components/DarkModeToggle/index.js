import React from 'react';
import { Button } from 'antd';

const DarkModeToggle = ({ isDarkMode, toggleDarkMode }) => {
  return (
    <div style={containerStyle}>
      <Button
        onClick={toggleDarkMode}
        style={{
          backgroundColor: isDarkMode ? '#333' : '#1890ff',
          color: 'white',
          padding: '10px 20px',
          borderRadius: '5px',
        }}
      >
        Switch to {isDarkMode ? 'Light' : 'Dark'} Mode
      </Button>
    </div>
  );
};

const containerStyle = {
  display: 'flex',
  justifyContent: 'flex-end', 
  padding: '10px',
  top: '20px',
  right: '20px',
  zIndex: 1000, 
};

export default DarkModeToggle;
