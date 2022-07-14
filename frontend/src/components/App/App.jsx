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


export default function App() {

  const API_BASE_URL = "http://localhost:3001"


  const [login, setLogin] = useState(false);
  const [data, setData] = useState({});
  const [picture, setPicture] = useState('');


  return (

    <div className="app">
    <BrowserRouter>
      
    <Navbar />
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

      {// TODO: make this path dynamic
      }
      <Route path="/account/" element={
          <Account />
        }
      />
    </Routes>

    </BrowserRouter>
      
    </div>

  );
}