import * as React from 'react';
import './Login.css';
import FacebookLogin from 'react-facebook-login';
import { Card, Image, Nav } from 'react-bootstrap';

export default function Login({
  login, setLogin,
  data, setData,
  picture, setPicture
}) {

  const responseFacebook = (response) => {
    console.log(response);
    setData(response);
    setPicture(response.picture.data.url);
    if (response.accessToken) {
      setLogin(true);
    } else {
      setLogin(false);
    }

    const signIn = async (response) => {
      try {
        let account_info = {
          "username": response.name,
          "password": response.id,
          "userID": response.userID,
          "img_url": response.picture.data.url,
          "data": response
        }
        const res = await axios.post(`${API_BASE_URL}/sign-in`, account_info)

      } catch (err) {
        alert(err)
        console.log(err)
      }
    }
    signIn(response)


  }

  return (
    <nav className="login">
      Hi
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
            <Card.Title>{data.name}</Card.Title>
            <Card.Text>
              {data.email}
            </Card.Text>
          </Card.Body>
        }
      </Card>
    </nav>

  );
}
