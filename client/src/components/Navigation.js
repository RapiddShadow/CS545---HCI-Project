import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import '../App.css';


const Navigation = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(!!sessionStorage.getItem('token'));

  const handleSignOut = () => {
    // Clear the session token and update authentication status
    sessionStorage.removeItem('token');
    setIsAuthenticated(false);
  };

  if (isAuthenticated) {
    return (
      <nav className='navigation'>
        <NavLink className='nav-links' to='/'>
          Home
        </NavLink>
        <NavLink className='nav-links' to='/signout' onClick={handleSignOut}>
          SignOut
        </NavLink>
      </nav>
    );
  } else {
    return (
      <nav className='navigation'>
        <NavLink className='nav-links' to='/'>
          Home
        </NavLink>
        <NavLink className='nav-links' to='/signin'>
          LogIn
        </NavLink>
        <NavLink className='nav-links' to='/register'>
          Register
        </NavLink>
        <Link className='nav-links' to='/categories'>
          Quiz
        </Link>
      </nav>
    );
  }
};

export default Navigation;