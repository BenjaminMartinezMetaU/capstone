import * as React from 'react';
import './Wiki.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function WikiSetup({data, setData}) {

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
                "description" : description.current.value
                })
            
            let wikiID = res.data.wiki.objectId;
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


    return (
      <div className='account-setup'>

        <form onSubmit={handleSubmit}>
            <div className="title">Account Setup</div>
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
            <button type="submit">Generate new project Wiki</button>
        </form>   
      
      </div>
    );
  
}
