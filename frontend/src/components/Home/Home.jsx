import * as React from 'react';
import './Home.css';
import ProjectPost from './ProjectPost';
import { useState, useEffect } from 'react';
import axios from 'axios';


// Home just shows change feeds from projects that user has worked on
// In backend: 
//  1. get curr user's wikis_worked on 
//  2. for each wiki find and get the wiki info
//  3. store that wiki info in some res object
//  4. render card for each element in that res object
export default function Home({data}) {
  const [isLoading, updateIsLoading] = useState(false);
  const [homeFeedData, setHomeFeedData] = useState([]);
  const [wikisRanked, setWikisRanked] = useState([]);
  console.log('homeFeedData: ', homeFeedData);
  const API_BASE_URL = "http://localhost:3001"


// On load pull user data to get the
useEffect(() => {
  async function fetchHomeData() {
    updateIsLoading(true);


    await axios(API_BASE_URL + '/home').then(({ data }) => {
      
      console.log('data: ', data);
      const wikisRankedSorted = data.wikisWithWeights;
      wikisRankedSorted.sort((a,b) => b.weight - a.weight)
      setWikisRanked(wikisRankedSorted);

      setHomeFeedData(data.wikiFeeds.reverse());

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
      wikisRanked.map((wikiRanked) => {
        let activityLog = wikiRanked.wiki.wikiObject.activity_log;
        
        return(
          
        activityLog.reverse().map((change) => {
          return(
            <ProjectPost change={change} displayWikiInfo={true} displayUserInfo={true}/>
            )
        }) 
        )
      })
    }

    </div>

  );
}
