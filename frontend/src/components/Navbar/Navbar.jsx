import * as React from 'react';
import './Navbar.css';
import { Link } from 'react-router-dom';
import Logo from './Logo';
import Searchbar from './Searchbar';

export default function Navbar({data, setSearchResults}) {
  let userID = data.userID;

  return (
    <nav className="navbar">
      
      <Link to="/">Login</Link>
      <Link to="/home">Home</Link>
      <Link to={"/account/"+userID}>Account</Link>
      <Link to="/wiki/new">New Wiki</Link>
      <Searchbar setSearchResults={setSearchResults}/>
    </nav>

  );
}
