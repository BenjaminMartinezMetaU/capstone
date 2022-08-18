import * as React from "react";
import "./Navbar.css";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import SearchResults from "../SearchResults/SearchResults";
import { Button } from "react-bootstrap";
import { AiOutlineSearch } from "react-icons/ai";

export default function Searchbar({ data, setSearchResults, searchResults }) {
  const [isLoading, setIsLoading] = useState(false);
  const query = React.createRef();
  const API_BASE_URL = "http://localhost:3001";

  let navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    setIsLoading(true);
    console.log("isLoading: ", isLoading);

    const search = async () => {
      try {
        const query_req = { searchQuery: query.current.value };
        const res_users = await axios.post(
          `${API_BASE_URL}/account/search`,
          query_req
        );
        const res_wikis = await axios.post(
          `${API_BASE_URL}/wiki/search`,
          query_req
        );
        const results = [
          ...res_users.data.resUsersInfo,
          ...res_wikis.data.resWikisInfoRecency,
        ];
        console.log("res_wikis.data: ", res_wikis.data);

        console.log(
          "res_wikis.data.resWikisInfo: ",
          res_wikis.data.resWikisInfoUpvote
        );

        setSearchResults({
          results: results,
          wikiResultsByRecency: res_wikis.data.resWikisInfoRecency,
          wikiResultsByUpvote: res_wikis.data.resWikisInfoUpvote,
          userResultsByRecency: res_users.data.resUsersInfo,
          userResultsByUpvote: res_users.data.resUsersInfo,
        });
      } catch (err) {
        alert(err);
        console.log(err);
      }
    };
    search().then(() => {
      navigate(`/search-results/`);
      setIsLoading(false);
    });
  };

  return (
    <div className="searchbar">
      <form onSubmit={handleSubmit} className="relative">
        <label>
          <input
            className="block p-2 pl-10 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            ref={query}
            placeholder={"Find users or projects"}
            style={{ width: "300px" }}
          ></input>
        </label>

        <Button
          className="text-white right-4 bottom-0.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-3 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          type="submit"
        >
          {isLoading ? "Loading..." : <AiOutlineSearch size={20} />}
        </Button>
      </form>
    </div>
  );
}
