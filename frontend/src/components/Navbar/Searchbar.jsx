import * as React from 'react';
import './Navbar.css';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import SearchResults from '../SearchResults/SearchResults';

export default function Searchbar({ data, setSearchResults }) {
    const [isLoading, setIsLoading] = useState(false)
    const query = React.createRef();
    const API_BASE_URL = "http://localhost:3001"


    let navigate = useNavigate();

    const handleSubmit = event => {
  
        event.preventDefault();
        setIsLoading(true);
        console.log('isLoading: ', isLoading);

        const search = async () => {
            
            try {
                
                const query_req = { "searchQuery": query.current.value }
                const res_users = await axios.post(`${API_BASE_URL}/search`, query_req)
                const res_wikis = await axios.post(`${API_BASE_URL}/wiki/search`, query_req)
                const results = [...res_users.data.resUsersInfo, ...res_wikis.data.resWikisInfo]
                setSearchResults(results)

            } catch (err) {
                alert(err)
                console.log(err)
            }
        }
        search().then(() => {
            navigate(`/search-results/`);
            setIsLoading(false)
        }
            );
    }

    return (
        <div className="searchbar">

            <form onSubmit={handleSubmit}>
                <div className="search-label">Search</div>
                <label>
                        <input ref={query} placeholder={'Find users or projects here'} style={{width: "300px"}}>
                        </input>

                    
                </label>

                <button type="submit">{isLoading ? 'Loading...' : 'Search'}</button>
            </form>
            
        </div>

    );
}