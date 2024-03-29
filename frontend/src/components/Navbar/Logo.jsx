import * as React from "react";
import "./Navbar.css";
import logo from "./wikiLogo.png";
import { Link } from "react-router-dom";

export default function Logo() {
  return (
    <div className="logo" width="112" height="28">
      <Link to="/home">
        <img alt="logo" src={logo} />
      </Link>
    </div>
  );
}
