import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles.css';

const Navbar = ({ isLoggedIn, setIsLoggedIn }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    const username = localStorage.getItem('username');
    localStorage.removeItem('token');
    localStorage.removeItem('username'); 
    
    console.log(`${username} has logged out.`);
    
    alert('Logout successful!');
    navigate('/');
  };

  return (
    <div className="navbar-container">
      <nav className="navbar">
        <ul>
          <li><Link to="/books">Home</Link></li>
          <li><Link to="/dashboard">Dashboard</Link></li>
          <button onClick={handleLogout}className='btn btn-outline-danger'>logout</button>
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
