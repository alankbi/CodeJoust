import React from 'react';
import { Link } from 'react-router-dom';

function NavBar() {
  return (
    <div className="navbar">
      <nav>
        <Link to="/">
          Home
        </Link>
        <Link to="/login">
          Login
        </Link>
      </nav>
    </div>
  );
}

export default NavBar;
