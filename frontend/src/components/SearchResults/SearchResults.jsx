import * as React from "react";
import "./SearchResults.css";
import { Link } from "react-router-dom";
import { Card } from "react-bootstrap";
import { useState } from "react";

export default function SearchResults({ searchResults }) {
  console.log("searchResults: ", searchResults);
  // Sort by upvote or newest
  const [searchSortOptions, setSearchSortOptions] = useState({
    Upvotes: false,
    Newest: true,
  });
  const [searchSortOption, setSearchSortOption] = useState("newest");
  console.log("searchSortOption: ", searchSortOption);
  // Filter by User or project
  const [searchFilterOptions, setSearchFilterOptions] = useState({
    User: true,
    Project: true,
  });

  // Handlers for clicking checkboxes
  const handleSortToggle = ({ target }) =>
    setSearchSortOptions((s) => ({ ...s, [target.id]: !s[target.id] }));
  const handleFilterToggle = ({ target }) =>
    setSearchFilterOptions((s) => ({ ...s, [target.name]: !s[target.name] }));

  return (
    <div className="resultsPage">
      <div className="search-options">
        <span className="sortBy">
          <span>Sort by: </span>

          <span className="sortBy-input">
            <label>
              <span>Newest: </span>
              <input
                type="radio"
                onClick={() => setSearchSortOption("newest")}
                key="newest"
                name="newest"
                checked={searchSortOption == "newest"}
              />
            </label>
          </span>

          <span className="sortBy-input">
            <label>
              <span>Upvotes:</span>
              <input
                type="radio"
                onClick={() => setSearchSortOption("upvotes")}
                key="upvotes"
                name="upvotes"
                checked={searchSortOption == "upvotes"}
              />
            </label>
          </span>
        </span>

        <span className="filterBy">
          <span>Filter by: </span>
          {Object.keys(searchFilterOptions).map((key) => (
            <span className="filterBy-input">
              <label>
                <span>{key}: </span>
                <input
                  type="checkbox"
                  onChange={handleFilterToggle}
                  key={key}
                  name={key}
                  checked={searchFilterOptions[key]}
                />
              </label>
            </span>
          ))}
        </span>
      </div>

      {/* Results display */}
      {searchResults.results.length == 0 ? (
        <div className="not-found">No results found</div>
      ) : null}
      {searchSortOption === "newest" &&
        searchFilterOptions.User &&
        searchResults.userResultsByRecency.map((result) => {
          return (
            <div className="link-user" key={result.userID}>
              <Card>
                <Card.Body>
                  <Link to={"/account/" + result.userID}>
                    User: {result.user_name}
                  </Link>
                </Card.Body>
              </Card>
            </div>
          );
        })}
      {searchSortOption === "newest" &&
        searchFilterOptions.Project &&
        searchResults.wikiResultsByRecency.map((result) => {
          return (
            <div className="link-wiki" key={result.objectId}>
              <Card>
                <Card.Body>
                  <Link to={"/wiki/" + result.objectId}>
                    Wiki: {result.wikiObject.title}
                  </Link>
                </Card.Body>
              </Card>
            </div>
          );
        })}

      {searchSortOption === "upvotes" &&
        searchFilterOptions.User &&
        searchResults.userResultsByUpvote.map((result) => {
          return (
            <div className="link-user" key={result.userID}>
              <Card>
                <Card.Body>
                  <Link to={"/account/" + result.userID}>
                    User: {result.user_name}
                  </Link>
                </Card.Body>
              </Card>
            </div>
          );
        })}
      {searchSortOption === "upvotes" &&
        searchFilterOptions.Project &&
        searchResults.wikiResultsByUpvote.map((result) => {
          return (
            <div className="link-wiki" key={result.objectId}>
              <Card>
                <Card.Body>
                  <Link to={"/wiki/" + result.objectId}>
                    Wiki: {result.wikiObject.title}
                  </Link>
                </Card.Body>
              </Card>
            </div>
          );
        })}
    </div>
  );
}
