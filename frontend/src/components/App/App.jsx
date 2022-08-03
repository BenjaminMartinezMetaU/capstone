import * as React from 'react';
import {
  Routes, Route, Link, useParams, BrowserRouter,
} from 'react-router-dom';
import { useState, useEffect, createContext } from 'react';
import axios from 'axios';

import FacebookLogin from 'react-facebook-login';
import './App.css';
import Navbar from '../Navbar/Navbar';
import Login from '../Login/Login';
import Wiki from '../Wiki/Wiki';
import Account from '../Account/Account';
import AccountSetup from '../Account/AccountSetup';
import WikiSetup from '../Wiki/WikiSetup';
import SearchResults from '../SearchResults/SearchResults'
import Home from '../Home/Home';


export default function App() {

  const API_BASE_URL = "http://localhost:3001"

  // Check if a user is logged in 
  const [login, setLogin] = useState(false);

  // All data of current user at time of login and profile changes 
  // used for easy access to current user info 
  // and on profile page to check if user profile is the current user
  // ex. blurb, created at, img_url, objectId, userID, user_name, username
  const [data, setData] = useState({});

  // Picture link (not rly used)
  const [picture, setPicture] = useState('');

  // Array of either User or Wiki objects set by Searchbar in Navbar
  const [searchResults, setSearchResults] = useState([]);


  return (

    <div className="app">

      <BrowserRouter>
        <main>
          <div className='containers'>
            <div className='wrapper'>

              <Navbar
                data={data}
                setSearchResults={setSearchResults}
                login={login}
              />
              <Routes>
                <Route path="/" element={
                  <Login
                    login={login} setLogin={setLogin}
                    data={data} setData={setData}
                    picture={picture} setPicture={setPicture}
                  />
                }
                />

                <Route path="/wiki/:wikiID" element={
                  <Wiki userData={data} setUserData={setData} />
                }
                />

                <Route path="/wiki/new" element={
                  <WikiSetup />
                }
                />


                <Route path="/account/:userID" element={
                  <Account data={data} picture={picture} />
                }
                />

                <Route path="/account/account-setup/" element={
                  <AccountSetup data={data} setData={setData} />
                }
                />

                <Route path="/search-results/" element={
                  <SearchResults searchResults={searchResults} />
                }
                />

                <Route path="/home/" element={
                  <Home data={data} />
                }
                />
              </Routes>
            </div>
          </div>
        </main>
      </BrowserRouter>


    </div>

  );
}