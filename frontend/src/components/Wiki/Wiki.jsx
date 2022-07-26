import * as React from 'react';
import './Wiki.css';
import { useState, useEffect } from "react";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { Button } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import axios from 'axios';

import {Tab} from 'react-bootstrap'
import {Tabs} from 'react-bootstrap'

export default function Wiki() {

  const { wikiID } = useParams();
  const API_BASE_URL = "http://localhost:3001/wiki";

  const [htmlValue, setHtmlValue] = useState('');
  const [wikiData, setWikiData] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  // for switching tabs
  const [key, setKey] = useState('read-wiki');


  // Save button for editing
  const handleSaveWiki = event => {
    event.preventDefault();
    setIsLoading(true)

    const saveWiki = async () => {
      try {
        const res = await axios.post(`${API_BASE_URL}/save/`, {
          wikiID,
          htmlValue
        })
      } catch (err) {
        alert(err)
        console.log(err)
      }
    }
    saveWiki()
    setIsLoading(false)
  }

  // Get wiki info on load
  useEffect(() => {
    async function fetchWikiData() {
      setIsLoading(true);


      await axios(API_BASE_URL + '/' + wikiID).then(({ data }) => {
        console.log('data: ', data);
        setWikiData(data.wikiInfo);
        setHtmlValue(data.wikiInfo.wikiObject.html);

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

      <Tabs
      id="wiki-read-edit-tabs"
      activeKey={key}
      onSelect={(k) => setKey(k)}
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
        </Tab>

      </Tabs>








    </div>
  );

}
