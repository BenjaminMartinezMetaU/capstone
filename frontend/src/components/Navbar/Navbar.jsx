import * as React from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";
import Logo from "./Logo";
import Searchbar from "./Searchbar";
import Logout from "./Logout";

import { Image } from "react-bootstrap";
import { AiFillHome } from "react-icons/ai";
import { IoMdAddCircle } from "react-icons/io";

export default function Navbar({
  data,
  setData,
  setSearchResults,
  searchResults,
  login,
  setLogin,
}) {
  const userID = data.userID;
  const picURL = data.data?.picture.data.url;

  if (!login) return null;
  return (
    <nav className="navbar">
      {/*<Link to="/">Login</Link>*/}
      <Logo />
      <Searchbar
        setSearchResults={setSearchResults}
        searchResults={searchResults}
      />
      <div className="group relative link w-5">
        <Link to="/home">
          <AiFillHome size="42" />{" "}
        </Link>
        <p
          className="hidden group-hover:block absolute 
      -left-1 -bottom-9
      text-sm
      bg-blue-300/90
      px-2
      pt-1
      pb-1
      rounded
      shadow-xl
      z-10
 
      "
        >
          Home
        </p>
      </div>
      <div className="group relative link w-5">
        <Link to="/wiki/new">
          <IoMdAddCircle size="42" />
        </Link>
        <p
          className="hidden group-hover:block absolute 
      -left-2 -bottom-11
      text-sm
      bg-blue-300/90
      px-3
      pt-1
      pb-1
      rounded
      shadow-xl
      z-10
 
      "
        >
          New Project
        </p>
      </div>
      <div className="group relative link ">
        <Link to={"/account/" + userID}>
          <Image src={picURL} roundedCircle />
        </Link>
        <p
          className="hidden group-hover:block absolute 
      -left-4 -bottom-9
      text-sm
      bg-blue-300/90
      px-3
      pt-1
      pb-1
      rounded
      shadow-xl
      z-10
 
      "
        >
          Account
        </p>
      </div>
      <Logout data={data} setData={setData} login={login} setLogin={setLogin} />
    </nav>
  );
}
