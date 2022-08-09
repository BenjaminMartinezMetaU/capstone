import * as React from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";
import Logo from "./Logo";
import Searchbar from "./Searchbar";
import Logout from "./Logout";

export default function Navbar({
  data,
  setData,
  setSearchResults,
  searchResults,
  login,
  setLogin,
}) {
  let userID = data.userID;

  if (!login) return null;
  return (
    <nav className="navbar">
      {/*<Link to="/">Login</Link>*/}
      <Link to="/home">Home</Link>
      <Link to={"/account/" + userID}>Account</Link>
      <Link to="/wiki/new">New Wiki</Link>
      <Searchbar
        setSearchResults={setSearchResults}
        searchResults={searchResults}
      />
      <Logout data={data} setData={setData} login={login} setLogin={setLogin} />
    </nav>
  );
}
