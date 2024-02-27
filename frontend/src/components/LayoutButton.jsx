import React from 'react';
import { useNavigate } from 'react-router-dom';

const LogoutButton = () => {
    const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    // Clear any other user-specific data
    navigate('/login');
    window.location.reload(); 
  };

    return (
        <div className='place-self-end'>
            <button className='bg-red-500 px-3 rounded-lg h-12' onClick={handleLogout}>
              Logout
            </button>
        </div>
  );
};

export default LogoutButton;