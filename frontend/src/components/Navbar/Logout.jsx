import * as React from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";

import { IoLogOut } from "react-icons/io5";

import axios from "axios";
const API_BASE_URL = "http://localhost:3001";

export default function Logout({ data, setData, login, setLogin }) {
  let navigate = useNavigate();

  const handleLogout = () => {
    const logOutBackend = async () => {
      try {
        const res = await axios
          .post(`${API_BASE_URL}/logout`, {})
          .then(({ data }) => {
            console.log("data: ", data);
            setData({});
            setLogin(false);
            navigate(`/`);
            console.log("Logged out :)");
          });
      } catch (err) {
        alert(err);
        console.log(err);
      }
    };
    logOutBackend();
  };
  return (
    <div className="logout group relative link ">
      <Button variant="outline-danger" onClick={handleLogout}>
        <IoLogOut size={28} />
      </Button>
      <p
        className="hidden group-hover:block absolute 
      -left-3 -bottom-9
      text-sm
      bg-blue-300/90
      px-3
      pt-1
      pb-1
      rounded
      shadow-xl
 
      "
      >
        Logout
      </p>
    </div>
  );
}
