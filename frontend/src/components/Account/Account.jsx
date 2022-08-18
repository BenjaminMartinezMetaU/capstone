import * as React from "react";
import "./Account.css";
import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { Card, Image, Button } from "react-bootstrap";
import { AiFillEdit } from "react-icons/ai";
import ProjectPost from "../Home/ProjectPost";

export default function Account({ data, picture }) {
  const [isLoading, updateIsLoading] = useState(false);
  const [accountData, setAccountData] = useState({});
  const [reverseActivityLog, setReverseActivityLog] = useState([]);
  console.log("accountData: ", accountData);
  const { userID } = useParams();
  const API_BASE_URL = "http://localhost:3001/account";

  let accountIsCurrentUser = accountData && accountData.userID == data.userID;
  console.log("data: IN THE ACCOUNT VIEW", data);

  //Get user info on load
  useEffect(() => {
    async function fetchUserData() {
      updateIsLoading(true);

      await axios(API_BASE_URL + "/" + userID)
        .then(({ data }) => {
          console.log("data: ", data);
          setAccountData(data.userInfo);
          setReverseActivityLog([...data?.userInfo?.activity_log].reverse());
        })
        .catch((error) => {
          alert(error);
          console.log("error: ", error);
        });
      updateIsLoading(false);
    }
    fetchUserData();
  }, []);

  return (
    <div className="account">
      {/* Header */}
      <div className="header-profile p-2">
        {isLoading ? "Loading..." : accountData?.user_name + "'s profile"}

        <Card>
          <Card.Header>
            <div className="flex flex-row">
              {!isLoading && (
                <Image
                  src={accountData?.img_url}
                  roundedCircle
                  className="w-28 h-28"
                />
              )}
              <div className="px-5 pt-10 text-4xl">
                {!isLoading &&
                  accountData?.displayRealName &&
                  accountData?.username}
                {!isLoading &&
                  !accountData?.displayRealName &&
                  accountData?.user_name}
              </div>
              {/* Edit profile button */}
              <div className="ml-auto">
                {accountIsCurrentUser && (
                  <Link to="/account/account-setup">
                    <Button variant="outline-primary">
                      <AiFillEdit size={28} />
                    </Button>
                  </Link>
                )}
              </div>
            </div>
          </Card.Header>
        </Card>
      </div>
      <div className="sidebar-profile ">
        <div className="wrapper-side-profile m-2 w-5/12">
          {/* Blurb Card */}
          <Card className="m-1">
            {!isLoading && (
              <Card.Body>
                <Card.Title>Blurb</Card.Title>
                <Card.Text>{accountData?.blurb}</Card.Text>
              </Card.Body>
            )}
          </Card>
          {/* Email Card */}

          {!isLoading && accountData?.email_custom && (
            <Card className="m-1">
              <Card.Body>
                <Card.Title>Email</Card.Title>
                <Card.Text>{accountData?.email_custom}</Card.Text>
              </Card.Body>
            </Card>
          )}

          {/* Genres Card */}
          <Card className="m-1">
            {!isLoading && (
              <Card.Body>
                <Card.Title>Project types interested in:</Card.Title>
                <Card.Text>
                  {!isLoading &&
                    accountData?.favGenres && 
                    Object.keys(accountData?.favGenres).map(function (
                      key,
                      index
                    ) {
                      return accountData.favGenres[key] ? key + ", " : null;
                    })}
                </Card.Text>
              </Card.Body>
            )}
          </Card>
        </div>

        <div className="wrapper-profile m-2">
          {/* Wikis worked on Card */}
          <Card className="p-3 m-1">
            <Card.Title>Projects worked on:</Card.Title>
            {!isLoading && accountData?.wikis_worked_on && accountData?.wikis_worked_on?.length > 0 &&
              accountData?.wikis_worked_on?.map((wiki) => {
                return (
                  <Card className="m-1">
                    <Card.Body>
                      <Link
                        to={"/wiki/" + wiki.wikiID}
                        className="font-bold underline"
                      >
                        Wiki: {wiki.wikiTitle}
                      </Link>
                      {wiki.userRoleOnWiki == "founder"
                        ? " FOUNDED this project"
                        : " CONTRIBUTED to this project"}
                    </Card.Body>
                  </Card>
                );
              })}
            {!isLoading && accountData?.wikis_worked_on?.length == 0 && "No projects worked on yet."}
          </Card>

          {/* Activity log Card */}
          <Card className="p-3 m-1">
            <Card.Title>Activity:</Card.Title>
            {!isLoading && reverseActivityLog?.length > 0 &&
              reverseActivityLog.map((change) => {
                return (
                  <ProjectPost
                    change={change}
                    displayUserInfo={false}
                    displayWikiInfo={true}
                  />
                );
              })}
            {!isLoading && reverseActivityLog?.length == 0 && "No account activity yet."}
          </Card>
        </div>
      </div>
    </div>
  );
}
