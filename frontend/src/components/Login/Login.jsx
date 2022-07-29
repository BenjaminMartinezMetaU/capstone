import * as React from 'react';
import './Login.css';
import FacebookLogin from 'react-facebook-login';
import { Card, Image, Nav } from 'react-bootstrap';
import axios from 'axios';

import { useNavigate } from "react-router-dom";


export default function Login({
  login, setLogin,
  data, setData,
  picture, setPicture,
  
}) {
  let navigate = useNavigate();

  const API_BASE_URL = "http://localhost:3001"


  const responseFacebook = (response) => {
    console.log("fb: resp: ", response);
    setData(response);
    setPicture(response.picture.data.url);
    if (response.accessToken) {
      setLogin(true);
    } else {
      setLogin(false);
    }

    const signIn = async (response) => {
      try {
        //use FB id as password into our Parse db
        //use FB name as username for simplified, immediate login
        let account_info = {
          "username": response.name,
          "password": response.id,
          "userID": response.userID,
          "img_url": response.picture.data.url,
          "data": response,
          "user_name" : null,
          "blurb" : null,
          "activity_log" : [],
          "wikis_worked_on" : [],
          "favGenres" : {}
        }
        const res = await axios.post(`${API_BASE_URL}/sign-in`, account_info).then(
          ({data}) => {
            // 
            console.log('data from db: ', data);
            setData(data.user);
            console.log('data.userExists: ', data.userExists);
            if(data.userExists && data.user.user_name != null){
              
              //go to account page
              navigate(`/account/${data.user.userID}`);

            }else{
              //go to account set up page
              navigate(`/account/account-setup`);
            }
              
          }
        )

      } catch (err) {
        alert(err)
        console.log(err)
      }
    }
    signIn(response)


  }

  return (
    <nav className="login">
    {!login &&
      "Login through Facebook here:" }
      <Card style={{ width: '600px' }}>
        <Card.Header>
          {!login &&
            <FacebookLogin
              appId="766038284415266"
              autoLoad={false}
              fields="name,email,picture"
              scope="public_profile,user_friends"
              callback={responseFacebook}
              icon="fa-facebook" />
          }
          {login &&
            <Image src={picture} roundedCircle />
          }
        </Card.Header>
        {login &&
          <Card.Body>
            <Card.Title>{data.username}</Card.Title>

          </Card.Body>
        }
      </Card>
    </nav>

  );
}
