import * as React from 'react';
import './Wiki.css';
import { useState, useEffect } from "react";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { Button } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import axios from 'axios';

export default function Wiki() {

  const { wikiID } = useParams();
  const API_BASE_URL = "http://localhost:3001/wiki";

  const [htmlValue, setHtmlValue] = useState('');
  const [wikiData, setWikiData] = useState({});
  const [isLoading, setIsLoading] = useState(false);

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
      
      
      <ReactQuill theme="snow" value={htmlValue} onChange={setHtmlValue} />


      <Button onClick={handleSaveWiki}>
        {isLoading ? 'Saving…' : 'Click to save changes'}
      </Button>


    </div>
  );

}
