import * as React from 'react';
import './Navbar.css';
import { Link } from 'react-router-dom';
import Logo from './Logo';
import Searchbar from './Searchbar';

export default function Navbar({data}) {
  let userID = data.userID;
  return (
    <nav className="navbar">
      
      <Link to="/">Login</Link>
      <Link to={"/account/"+userID}>Account</Link>
      <Link to="/wiki/">Wiki ex</Link>
      <Link to="/wiki/new">New Wiki</Link>
      <Searchbar />
    </nav>

  );
}
