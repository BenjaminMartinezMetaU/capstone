import * as React from 'react';
import './Account.css';
import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, Image, Button} from 'react-bootstrap';

export default function Account({data, picture}) {
  const [isLoading, updateIsLoading] = useState(false);
  const [accountData, setAccountData] = useState({})
  const { userID } = useParams();
  const API_BASE_URL = "http://localhost:3001/account";

  let accountIsCurrentUser = accountData && accountData.userID == data.userID;


  useEffect(() => {
    async function fetchUserData() {
      updateIsLoading(true);


      await axios(API_BASE_URL +'/'+ userID).then(( {data} ) => {
        console.log('data: ', data);
        setAccountData(data.userInfo);
        
      })
      .catch((error) => {
        alert(error);
        console.log('error: ', error);
        
      });
      updateIsLoading(false);
    }
    fetchUserData();
  },[]);

    return (
      <div className='account'>
        {isLoading ? "Loading..." :
          accountData.user_name+"'s profile"
        }
        <Card style={{ width: '600px' }}>
        <Card.Header>

          {!isLoading &&
            <Image src={accountData.img_url} roundedCircle />
          }
        </Card.Header>
        {!isLoading &&
          <Card.Body>
            <Card.Title>{accountData.username}</Card.Title>
            <Card.Text>
              my name
            </Card.Text>
          </Card.Body>
        }
      </Card>

      <Card>
        {!isLoading &&
        <Card.Body>
          <Card.Title>Blurb</Card.Title>
          <Card.Text>
            {accountData.blurb}
          </Card.Text>
        </Card.Body>}
      </Card>

      {accountIsCurrentUser && 
      <Link to="/account/account-setup">
        <Button>Edit Profile</Button>
      </Link>
      }
      
      
      </div>
    );
  
}
