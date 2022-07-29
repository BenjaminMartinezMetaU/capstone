import * as React from 'react';
import './Wiki.css';
import { useState, useEffect } from "react";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { Button, Card } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';

import {Tab} from 'react-bootstrap'
import {Tabs} from 'react-bootstrap'

export default function Wiki({userData}) {
  console.log('userData: ', userData);

  const { wikiID } = useParams();
  const API_BASE_URL = "http://localhost:3001/wiki";

  const [htmlValue, setHtmlValue] = useState('');
  // wiki data has all info. objectId, updatedAt, 
  //   wikiObject: activity_log, title, desc, html
  const [wikiData, setWikiData] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  // for switching tabs
  const [key, setKey] = useState('read-wiki');

  // for showing to user that edit was successfully saved
  // Also this only works for first time when current tab
  // bc goes back to false on tab switch or if failed
  // but tells user nothing if failed
  // TODO: prob better way to do this
  const [isSaved, setIsSaved] = useState(false);


  
  // Save button for editing
  const handleSaveWiki = event => {
    event.preventDefault();
    setIsLoading(true)

    const saveWiki = async () => {
      const wikiTitle = wikiData.wikiObject.title;
      try {
        const res = await axios.post(`${API_BASE_URL}/save/`, {
          wikiID,
          htmlValue,
          userData,
          wikiTitle
        })
        // Sync frontend to backend (mostly for changelog changes)
        setWikiData(res.data.wikiInfo)
        console.log("new wiki info: ", res.data);
      } catch (err) {
        setIsSaved(false);
        alert(err)
        console.log(err)
      }
    }
    saveWiki().then(()=> {
      setIsLoading(false);
      setIsSaved(true);
    })
    
  }

  // Get wiki info on load
  useEffect(() => {
    async function fetchWikiData() {
      setIsLoading(true);


      await axios(API_BASE_URL + '/' + wikiID).then(({ data }) => {
        console.log('data: ', data);
        setWikiData(data.wikiInfo);
        setHtmlValue(data.wikiInfo.wikiObject.html_curr);

      })
        .catch((error) => {
          alert(error);
          console.log('error: ', error);

        });
      setIsLoading(false);
    }
    fetchWikiData();
  }, []);

  return (
    <div className='wiki'>

      <div className='title'>{wikiData.wikiObject && wikiData.wikiObject.title}</div>
      <div className='desc'>{wikiData.wikiObject && wikiData.wikiObject.description}</div>
      <Card>

        {!isLoading &&
          <Card.Body>
            <Card.Title>
              Project genres:
              </Card.Title>
              <Card.Text>
              {!isLoading && wikiData.wikiObject &&
                
                Object.keys(wikiData.wikiObject?.genres).map(function(key, index) {
                  
                    return wikiData.wikiObject.genres[key] ? key + ", " : null;
                  })
              }
              </Card.Text>
            
          </Card.Body>
        }
      </Card>

      <Tabs
      id="wiki-read-edit-tabs"
      activeKey={key}
      onSelect={(k) => {
        setKey(k)
        setIsSaved(false)
      }}
      className="mb-3"
      >
        <Tab eventKey="read-wiki" title="Read Wiki">
        <div dangerouslySetInnerHTML={{ __html: htmlValue }} />

        </Tab>
        <Tab eventKey="edit-wiki" title="Edit Wiki">
          <ReactQuill theme="snow" value={htmlValue} onChange={setHtmlValue} />


          <Button onClick={handleSaveWiki}>
            {isLoading ? 'Saving…' : 'Click to save changes'}
          </Button>
          {isSaved && "Saved!"}
        </Tab>

        <Tab eventKey="change-log" title="Project Feed">
          
          {wikiData.wikiObject &&
            wikiData.wikiObject.activity_log.map((change) => {
              
              return(
              <Card>
            <Card.Body>
              <Link to={"/account/" + change.userID}>
                  User: {change.user_name}
              </Link>
              {change.change}
            </Card.Body>
          </Card>
              )
            })
          }
          

        </Tab> 

      </Tabs>








    </div>
  );

}
