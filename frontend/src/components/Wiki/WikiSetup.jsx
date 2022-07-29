import * as React from 'react';
import './Wiki.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

export default function WikiSetup({data, setData}) {

  const [genres, setGenres] = useState({
    "Video games": false,
    "Apps": false,
    "Crafts": false,
    "Writing": false,
    "Misc": false,
  });
  const title = React.createRef();
  const description = React.createRef();

  let navigate = useNavigate();
  const API_BASE_URL = "http://localhost:3001"

  const handleSubmit = event => {
    event.preventDefault();

    const registerWiki = async () => {
        try {
            const res = await axios.post(`${API_BASE_URL}/wiki/new/`, {
                "title" : title.current.value,
                "description" : description.current.value,
                "genres" : genres
                })
            
            let wikiID = res.data.wiki.objectId;
            console.log('wikiID: ', wikiID);
            console.log('res.data: ', res.data);
            
            //go to profile page according to userID
            navigate(`/wiki/${wikiID}`);
        } catch (err) {
            alert(err)
            console.log(err)
        }
    }
    registerWiki()
}
  // Handler for clicking checkboxes
  const handleToggle = ({ target }) =>
    setGenres(s => ({ ...s, [target.name]: !s[target.name] }));


    return (
      <div className='account-setup'>

        <form onSubmit={handleSubmit}>
            <div className="title">New Wiki Setup</div>
            <label>
                <span>Title (required): </span>
                <input ref={title} required={true}>

                </input>
            </label>
            <label>
                <span>Description: </span>
                <textarea ref = {description} rows = "3" cols = "50" placeholder="Describe the new project..." >
               

              </textarea>
            </label>
            <div className='categories'>
          <span>Select genre of project: </span>
          {Object.keys(genres).map(key => (
            <div className='category-checkbox'> 
            <label>
            <span>{key}: </span>
            <input
              type="checkbox"
              onChange={handleToggle}
              key={key}
              name={key}
              checked={genres[key]}
            />
           </label>
           </div>
          ))}
        </div>
            <button type="submit">Generate new project Wiki</button>
        </form>   
      
      </div>
    );
  
}
