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
          const wikisRanked = data.wikisWithWeights;
          const wikisRankedSorted = wikisRanked.filter(function (el) {
            return el != null;
          });
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
    <div>
    {!isLoading && wikisRanked.length == 0 &&
    <div className="text-xl p-5 text-center">
    To see relevant project posts, add more genre preferences, upvote projects, or start creating and working on projects!
    </div>
    }
    {!isLoading && wikisRanked.length > 0 &&
      <div className="text-lg text-center p-3">See relevant project posts you may be interested in:</div>
    }
    <div className="home flex flex-col items-center justify-center basis-full">
      {!isLoading && wikisRanked.length > 0 &&
        wikisRanked.map((wikiRanked) => {
          let activityLog = wikiRanked.wiki.wikiObject.activity_log;

          return activityLog.reverse().map((change) => {
            return (
              <div className="w-9/12 max-w-2xl">
              <ProjectPost
                change={change}
                displayWikiInfo={true}
                displayUserInfo={true}
              />
              </div>
            );
          });
        })}
    </div>
    </div>
  );
}
