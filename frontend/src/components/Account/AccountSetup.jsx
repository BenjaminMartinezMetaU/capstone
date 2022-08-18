import * as React from "react";
import "./Account.css";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";

export default function AccountSetup({ data, setData }) {
  const user_name = React.createRef();
  const blurb = React.createRef();
  const email = React.createRef();
  const [favGenres, setFavGenres] = useState({
    "Video games": false || data?.favGenres["Video games"],
    Apps: false || data?.favGenres["Apps"],
    Crafts: false || data?.favGenres["Crafts"],
    Writing: false || data?.favGenres["Writing"],
    Misc: false || data?.favGenres["Misc"],
  });

  
  const [displayRealName, setDisplayRealName] = useState(data.displayRealName);

  let navigate = useNavigate();
  const API_BASE_URL = "http://localhost:3001";

  const handleSubmit = (event) => {
    event.preventDefault();

    const register = async () => {
      try {
        const res = await axios.post(`${API_BASE_URL}/register`, {
          user_name: user_name.current.value,
          blurb: blurb.current.value,
          email_custom: email.current.value,
          favGenres: favGenres,
          displayRealName: displayRealName,
        });
        console.log("User updated: ", res.data.currentUser);
        const userID = data.userID;
        setData(res.data.currentUser);
  
        //go to profile page according to userID
        navigate(`/account/${userID}`);
      } catch (err) {
        alert(err);
        console.log(err);
      }
    };
    register();
  };
  // Handler for clicking checkboxes
  const handleToggle = ({ target }) =>
    setFavGenres((s) => ({ ...s, [target.name]: !s[target.name] }));

  const handleNameToggle = () => {
    setDisplayRealName(!displayRealName);
  };

  return (
    <div className="account-setup">
      <form onSubmit={handleSubmit}>
        <div className="title text-center p-3">Edit account info</div>
        <div className="flex flex-col">
          {/* Username input */}
          <label className="p-3">
            <span className="font-bold text-base">Username (required): </span>
            <input
              ref={user_name}
              required={true}
              defaultValue={data.user_name}
              className="p-2 pl-10 w-40 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            ></input>
          </label>
          {/* Blurb input */}
          <label className="p-3">
            <div className="font-bold text-base pb-2">Blurb: </div>
            <textarea
              ref={blurb}
              rows="4"
              cols="300"
              placeholder="Describe yourself..."
              className="ml-2 p-2 pl-10 w-50 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              {data.blurb ? data.blurb : ""}
            </textarea>
          </label>

          {/* Email Input */}
          <label className="p-3">
            <span className="font-bold text-base">Email: </span>
            <input
              ref={email}
              defaultValue={data.email_custom}
              className="p-2 pl-10 w-40 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            ></input>
          </label>

          {/* Fav Categories Selection */}
          <div className="favorite-categories p-3">
            <span className="font-bold text-base">
              Select project genres you're interested in:{" "}
            </span>
            {Object.keys(favGenres).map((key) => (
              <div className="category-checkbox">
                <label>
                  <input
                    type="checkbox"
                    onChange={handleToggle}
                    key={key}
                    name={key}
                    checked={favGenres[key]}
                    className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <span className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                    {key}
                  </span>
                </label>
              </div>
            ))}
          </div>
          {/* Display Name Selection */}
          <div className="m-3">
            <span className="font-bold text-base">
              Select to display your real name publicly:{" "}
            </span>
  
            <label>
              <input
                type="checkbox"
                onChange={handleNameToggle}
                key="displayName"
                name="displayName"
                checked={!!displayRealName}
                className="w-6 h-5 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600
                align-middle"
              />
            </label>
          </div>
        </div>
        <Button className="m-3" variant="outline-primary" type="submit">
          Save profile
        </Button>
      </form>
    </div>
  );
}
