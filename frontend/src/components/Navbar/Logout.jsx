import * as React from 'react';
import './Navbar.css';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';

import axios from 'axios';
const API_BASE_URL = "http://localhost:3001";

export default function Logout({ data, setData, login, setLogin }) {
    let navigate = useNavigate();

    
  const handleLogout = () => {
  
    const logOutBackend = async () => {
        try {
            const res = await axios.post(`${API_BASE_URL}/logout`, {}).then(
                ({ data }) => {
                    console.log('data: ', data);
                    setData({});
                    setLogin(false);
                    navigate(`/`);
                    console.log("Logged out :)")
                })

        } catch (err) {
            alert(err)
            console.log(err)
        }
    }
    logOutBackend();
  }
  return (

    <div className="logout">


      <Button onClick = {handleLogout}>Logout</Button>
      

    </div>


  );
}
