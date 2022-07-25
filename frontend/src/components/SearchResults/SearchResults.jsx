import * as React from 'react';
import './SearchResults.css'
import { Link } from 'react-router-dom';

export default function SearchResults({ searchResults }) {
    console.log('searchResults: ', searchResults);


    return (
        <div className='resultsPage'>
            {searchResults.length == 0 ? <div className='not-found'>No results found</div> : null}
            {



                searchResults.map((result) => {
                    if (result.userID) {
                        return (
                            <div className='link-user' key={result.userID}>
                                <Link to={"/account/" + result.userID}>
                                    User: {result.user_name}
                                </Link>
                            </div>
                        )
                    } else if (result.objectId) {
                        return (
                            <div className='link-wiki' key={result.objectId}>
                                <Link to={"/wiki/" + result.objectId}>
                                    Wiki: {result.wikiObject.title}
                                </Link>
                            </div>
                        )
                    } else {
                        return (null
                        )
                    }
                })}
        </div>
    );
}
