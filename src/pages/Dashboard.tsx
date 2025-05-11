import React from 'react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();

  const handleSignOut = () => {
    // Update user status to not logged in, but don't remove user data
    const userData = JSON.parse(localStorage.getItem('userData') || '{}');
    userData.isLoggedIn = false;
    localStorage.setItem('userData', JSON.stringify(userData));

    // Redirect to login page
    navigate('/login');
  };

  return (
    <div>
      <h1>Welcome to your Dashboard!</h1>
      <button onClick={handleSignOut}>Sign Out</button>
    </div>
  );
};

export default Dashboard;
