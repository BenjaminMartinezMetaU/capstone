import * as React from 'react';
import './Navbar.css';
import { Link } from 'react-router-dom';
import Logo from './Logo';

export default function Navbar() {
  return (
    <nav className="navbar">
      
      <Link to="/">Login</Link>
      <Link to="/account/">Account</Link>
      <Link to="/wiki/">Wiki ex</Link>
    </nav>

  );
}
