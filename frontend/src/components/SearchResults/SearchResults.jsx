import * as React from 'react';
import './SearchResults.css'
import { Link } from 'react-router-dom';
import { Card } from 'react-bootstrap';

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
                            <Card><Card.Body>
                                <Link to={"/account/" + result.userID}>
                                    User: {result.user_name}
                                </Link>
                            </Card.Body></Card>
                            </div>
                        )
                    } else if (result.objectId) {
                        return (
                            <div className='link-wiki' key={result.objectId}>
                            <Card><Card.Body>
                                <Link to={"/wiki/" + result.objectId}>
                                    Wiki: {result.wikiObject.title}
                                </Link>
                            </Card.Body></Card>
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
