import * as React from "react";
import "./Wiki.css";
import { useState, useEffect } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Button, Card } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

import { Tab } from "react-bootstrap";
import { Tabs } from "react-bootstrap";

import ProjectPost from "../Home/ProjectPost";

const API_BASE_URL = "http://localhost:3001/wiki";

export default function Wiki({ userData, setUserData }) {
  console.log("userData: ", userData);
  // We get user data to see if they have upvoted this before
  // We set user data to change that they have upvoted this

  const { wikiID } = useParams();

  const [htmlValue, setHtmlValue] = useState("");
  // wiki data has all info. objectId, updatedAt,
  //   wikiObject: activity_log, title, desc, html
  const [wikiData, setWikiData] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  // for switching tabs
  const [key, setKey] = useState("read-wiki");

  // for showing to user that edit was successfully saved
  // Also this only works for first time when current tab
  // bc goes back to false on tab switch or if failed
  // but tells user nothing if failed
  // TODO: prob better way to do this
  const [isSaved, setIsSaved] = useState(false);

  // Save button for editing, post new html and generate project post
  const handleSaveWiki = (event) => {
    event.preventDefault();
    setIsLoading(true);

    const saveWiki = async () => {
      const wikiTitle = wikiData.wikiObject.title;
      try {
        const res = await axios.post(`${API_BASE_URL}/save/`, {
          wikiID,
          htmlValue,
          userData,
          wikiTitle,
        });
        // Sync frontend to backend (mostly for changelog changes)
        setWikiData(res.data.wikiInfo);
        console.log("new wiki info: ", res.data);
      } catch (err) {
        setIsSaved(false);
        alert(err);
        console.log(err);
      }
    };
    saveWiki().then(() => {
      setIsLoading(false);
      setIsSaved(true);
    });
  };

  // Get wiki info on load
  // Get user info on load for hasUpvoted
  useEffect(() => {
    // Wiki fetch
    async function fetchWikiData() {
      setIsLoading(true);

      await axios(API_BASE_URL + "/" + wikiID)
        .then(({ data }) => {
          console.log("data: ", data);
          setWikiData(data.wikiInfo);
          setHtmlValue(data.wikiInfo.wikiObject.html_curr);
        })
        .catch((error) => {
          alert(error);
          console.log("error: ", error);
        });
      setIsLoading(false);
    }
    // User fetch
    async function fetchUserData() {
      setIsLoading(true);

      await axios(API_BASE_URL + "/" + userData.userID)
        .then(({ data }) => {
          console.log("data: ", data);
          //setUserData(data.userInfo);
        })
        .catch((error) => {
          alert(error);
          console.log("error: ", error);
        });
      setIsLoading(false);
    }
    fetchWikiData();
    fetchUserData();
  }, []);

  const hasUpvoted =
    userData.wikis_upvoted?.filter((w) => w.wikiID === wikiID).length > 0;

  // Post new user data to save wiki to wikis_upvoted
  const handleUpvote = (event) => {
    event.preventDefault();
    console.log("Loading upvote save...");
    const saveUpvote = async () => {
      try {
        const wikiTitle = wikiData.wikiObject.title;
        const res = await axios.post(`${API_BASE_URL}/upvote/`, {
          wikiID,
          wikiTitle,
        });
        // Sync frontend to backend (to reflect upvote change)
        setUserData(res.data.currentUser);
        setWikiData(res.data.wikiInfo);
        console.log("new info: ", res.data);
      } catch (err) {
        alert(err);
        console.log(err);
      }
    };
    saveUpvote()
      .then(() => {
        console.log("Finished saving upvote!");
        console.log("New and upvtoed user data: ", userData);
      })
      .catch(() => {
        console.log("Failed to save upvote");
      });
  };

  return (
    <div className="wiki">
      <div className="title">
        {wikiData.wikiObject && wikiData.wikiObject.title}
      </div>
      <div className="desc">
        {wikiData.wikiObject && wikiData.wikiObject.description}
      </div>
      <div className="points">
        Points: {wikiData.wikiObject && wikiData.wikiObject.points}
        <Button
          type="button"
          className="upvote"
          onClick={handleUpvote}
          disabled={hasUpvoted}
        >
          {hasUpvoted ? "Upvoted" : "+1"}
        </Button>
      </div>

      <Card>
        {!isLoading && (
          <Card.Body>
            <Card.Title>Project genres:</Card.Title>
            <Card.Text>
              {!isLoading &&
                wikiData.wikiObject &&
                Object.keys(wikiData.wikiObject?.genres).map(function (
                  key,
                  index
                ) {
                  return wikiData.wikiObject.genres[key] ? key + ", " : null;
                })}
            </Card.Text>
          </Card.Body>
        )}
      </Card>

      <Tabs
        id="wiki-read-edit-tabs"
        activeKey={key}
        onSelect={(k) => {
          setKey(k);
          setIsSaved(false);
        }}
        className="mb-3"
      >
        <Tab eventKey="read-wiki" title="Read Wiki">
          <div dangerouslySetInnerHTML={{ __html: htmlValue }} />
        </Tab>
        <Tab eventKey="edit-wiki" title="Edit Wiki">
          <ReactQuill theme="snow" value={htmlValue} onChange={setHtmlValue} />

          <Button onClick={handleSaveWiki}>
            {isLoading ? "Saving…" : "Click to save changes"}
          </Button>
          {isSaved && "Saved!"}
        </Tab>

        <Tab eventKey="change-log" title="Project Feed">
          {wikiData.wikiObject &&
            wikiData.wikiObject.activity_log.map((change) => {
              return (
                <ProjectPost
                  change={change}
                  displayWikiInfo={false}
                  displayUserInfo={true}
                />
              );
            })}
        </Tab>
      </Tabs>
    </div>
  );
}
