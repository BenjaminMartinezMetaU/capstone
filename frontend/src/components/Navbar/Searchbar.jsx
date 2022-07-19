import * as React from 'react';
import './Navbar.css';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';

export default function Searchbar({data}) {
  const [searchResults, setSearchResults] = useState([]);
  const query = React.createRef();
  const API_BASE_URL = "http://localhost:3001"
  const handleSubmit = event => {
    event.preventDefault();

    const search = async () => {
        try {
            const res = await axios.post(`${API_BASE_URL}/search`,{
                "searchQuery" : query.current.value
            })
            setSearchResults(res.data.resUsersInfo)
            console.log('searchResults: ', searchResults);
            
        } catch (err) {
            alert(err)
            console.log(err)
        }
    }
    search()
  }

  return (
    <div className="searchbar">

      <form onSubmit={handleSubmit}>
            <div className="title">Search</div>
            <label>
            
                <input ref={query} placeholder={'Find users here'}>

                </input>
            </label>

            <button type="submit">Search</button>
        </form>   
        {searchResults.map((result) => {
            return(
            <Link to={"/account/"+result.userID}>
            
                {result.user_name}
            </Link>
            )
        })}
    </div>

  );
}