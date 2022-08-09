import * as React from "react";
import "./Home.css";
import ProjectPost from "./ProjectPost";
import { useState, useEffect } from "react";
import axios from "axios";

// Home just shows change feeds from projects that user has worked on
// Ranked by relevancy to user fav genres, wikis worked on, and upvoted

export default function Home({ data }) {
  const [isLoading, updateIsLoading] = useState(false);
  const [wikisRanked, setWikisRanked] = useState([]);
  const API_BASE_URL = "http://localhost:3001";

  // On load pull user data to get the
  useEffect(() => {
    async function fetchHomeData() {
      updateIsLoading(true);

      await axios(API_BASE_URL + "/home")
        .then(({ data }) => {
          const wikisRankedSorted = data.wikisWithWeights;
          wikisRankedSorted.sort((a, b) => b.weight - a.weight);
          setWikisRanked(wikisRankedSorted);
        })
        .catch((error) => {
          alert(error);
          console.log("error: ", error);
        });
      updateIsLoading(false);
    }
    fetchHomeData();
  }, []);

  return (
    <div className="home">
      {!isLoading &&
        wikisRanked.map((wikiRanked) => {
          let activityLog = wikiRanked.wiki.wikiObject.activity_log;

          return activityLog.reverse().map((change) => {
            return (
              <ProjectPost
                change={change}
                displayWikiInfo={true}
                displayUserInfo={true}
              />
            );
          });
        })}
    </div>
  );
}
