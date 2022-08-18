import * as React from "react";
import "./Wiki.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Button } from "react-bootstrap";

export default function WikiSetup({ data, setData }) {
  const [genres, setGenres] = useState({
    "Video games": false,
    Apps: false,
    Crafts: false,
    Writing: false,
    Misc: false,
  });
  const title = React.createRef();
  const description = React.createRef();

  let navigate = useNavigate();
  const API_BASE_URL = "http://localhost:3001";

  const handleSubmit = (event) => {
    event.preventDefault();

    const registerWiki = async () => {
      try {
        const res = await axios.post(`${API_BASE_URL}/wiki/new/`, {
          title: title.current.value,
          description: description.current.value,
          genres: genres,
        });

        let wikiID = res.data.wiki.objectId;
        console.log("wikiID: ", wikiID);
        console.log("res.data: ", res.data);

        //go to wiki page by new wikiID
        navigate(`/wiki/${wikiID}`);
      } catch (err) {
        alert(err);
        console.log(err);
      }
    };
    registerWiki();
  };
  // Handler for clicking checkboxes
  const handleToggle = ({ target }) =>
    setGenres((s) => ({ ...s, [target.name]: !s[target.name] }));

  return (
    <div className="account-setup">
      <form onSubmit={handleSubmit}>
        <div className="title title text-center p-3">New Wiki Setup</div>
        <div className="flex flex-col">
          <label className="p-3">
            <span className="font-bold text-base">Title (required): </span>
            <input
              ref={title}
              required={true}
              className="p-2 pl-10 w-40 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            ></input>
          </label>
          <label className="p-3">
            <div className="font-bold text-base pb-2">Description: </div>
            <textarea
              ref={description}
              rows="3"
              cols="100"
              placeholder="Describe the new project..."
              className="ml-2 p-2 pl-10 w-90 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            ></textarea>
          </label>
          <div className="categories mb-2 p-3">
            <span className="font-bold text-base">
              Select genre of project:{" "}
            </span>
            {Object.keys(genres).map((key) => (
              <div className="category-checkbox">
                <label>
                  <input
                    type="checkbox"
                    onChange={handleToggle}
                    key={key}
                    name={key}
                    checked={genres[key]}
                    className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <span className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                    {key}
                  </span>
                </label>
              </div>
            ))}
          </div>
        </div>
        <Button className="m-3" variant="outline-primary" type="submit">
          Generate new project Wiki
        </Button>
      </form>
    </div>
  );
}
