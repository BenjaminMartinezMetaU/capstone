import * as React from 'react';
import {
  Routes, Route, Link, useParams, BrowserRouter,
} from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';

import FacebookLogin from 'react-facebook-login';

import Navbar from '../Navbar/Navbar';
import Login from '../Login/Login';
import Wiki from '../Wiki/Wiki';
import Account from '../Account/Account';
import AccountSetup from '../Account/AccountSetup';
import WikiSetup from '../Wiki/WikiSetup';


export default function App() {

  const API_BASE_URL = "http://localhost:3001"

  // Check if a user is logged in (not rly used)
  const [login, setLogin] = useState(false);

  // All data of current user at time of login and profile changes 
  // used for easy access to current user info 
  // and on profile page to check if user profile is the current user
  // ex. blurb, created at, img_url, objectId, userID, user_name, username
  const [data, setData] = useState({});
  // Picture link (not rly used)
  const [picture, setPicture] = useState('');


  return (

    <div className="app">
    <BrowserRouter>
      
    <Navbar data={data}/>
    <Routes>
      <Route path="/" element={
        <Login 
          login={login} setLogin={setLogin}
          data={data} setData={setData}
          picture={picture} setPicture={setPicture} 
        />
      }
      />

      <Route path="/wiki/" element={
          <Wiki />
        }
      />
      
      <Route path="/wiki/new" element={
          <WikiSetup />
        }
      />


      <Route path="/account/:userID" element={
          <Account data={data} picture={picture}/>
        }
      />

      <Route path="/account/account-setup/" element = {
        <AccountSetup data={data} setData={setData}/>
      } 
      />
    </Routes>

    </BrowserRouter>
      
    </div>

  );
}