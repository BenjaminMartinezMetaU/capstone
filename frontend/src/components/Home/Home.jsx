import * as React from 'react';
import './Home.css';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

// Home just shows change feeds from projects that user has worked on
// In backend: 
//  1. get curr user's wikis_worked on 
//  2. for each wiki find and get the wiki info
//  3. store that wiki info in some res object
//  4. render card for each element in that res object
export default function Home({data}) {
  const [isLoading, updateIsLoading] = useState(false);
  const [homeFeedData, setHomeFeedData] = useState([])
  console.log('homeFeedData: ', homeFeedData);
  const API_BASE_URL = "http://localhost:3001"


// On load pull user data to get the
useEffect(() => {
  async function fetchHomeData() {
    updateIsLoading(true);


    await axios(API_BASE_URL + '/home').then(({ data }) => {
      
      console.log('data: ', data);
      setHomeFeedData(data.wikiFeeds);

    })
      .catch((error) => {
        alert(error);
        console.log('error: ', error);

      });
    updateIsLoading(false);
  }
  fetchHomeData();
}, []);

  return (
    <div className='home'>

    {!isLoading &&
      homeFeedData.map((activityList) => {
        return(
        activityList.map((change) => {
          return(
            <Card>
              <Card.Body>
              <Link to={"/account/" + change.userID}>
                  {change.user_name}
              </Link>
                  made a change to 
                <Link to={"/wiki/" + change.wikiID}>
                  Wiki: {change.wikiTitle}
                </Link>
                project. 
                Change: {change.change}
              </Card.Body>
            </Card>
            )
        }) 
        )
      })
    }

    </div>

  );
}
