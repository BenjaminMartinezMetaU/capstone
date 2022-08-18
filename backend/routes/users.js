const express = require("express");
const Parse = require("parse/node");
const router = express.Router();

const { BadRequestError, NotFoundError } = require("../utils/errors");

// Expects parameters for username, password, and any additional
// columns that you want in your user table (profile_picture_url, etc)
router.post("/sign-in", async (req, res) => {
  const user = new Parse.User(req.body);
  
  // Check if user already exists
  // TODO: make User model class to store common methods like this

  const queryUsersById = new Parse.Query(Parse.User);
  queryUsersById.equalTo("userID", req.body.userID);
  const usersWithSameId = await queryUsersById.find();
  const userExists = usersWithSameId.length > 0;
  console.log('userExists: ', userExists);

  // login to Parse session
  if (userExists) {
    try {
      const user = await Parse.User.logIn(req.body.username, req.body.password);

      const sessionToken = user.getSessionToken();
      console.log("sessionToken: ", sessionToken);
      Parse.User.enableUnsafeCurrentUser();
      Parse.User.become(sessionToken);

      res.send({ user: user, userExists: userExists });

      console.log("✅ Successfully logged in!!");
    } catch (error) {
      res.status(400);
      res.send({ "❌ error": "Login failed: " + error });
    }
  } else {
    // register on Parse db

    try {
      const user = await Parse.User.signUp(
        req.body.username, 
        req.body.password,
        );

      const sessionToken = user.getSessionToken();
      console.log("sessionToken: ", sessionToken);
      Parse.User.enableUnsafeCurrentUser();
      Parse.User.become(sessionToken);
      
      user.set("userID", req.body.userID);
      user.set("img_url", req.body.img_url);
      user.set("data", req.body.data);
      user.set("user_name", req.body.user_name);
      user.set("blurb", req.body.blurb);
  
      user.set("email_custom", req.body.email_custom);
     
      user.set("activity_log", req.body.activity_log);
      user.set("wikis_worked_on", req.body.wikis_worked_on);
      user.set("favGenres", req.body.favGenres);
      user.set("wikis_upvoted", req.body.wikis_upvoted);
      user.set("points", req.body.points);
  
      await user.save(null, {useMasterKey: true});
      
      console.log("worked til here");




      res.status(201);
      res.send({ user: user });
      console.log("✅ Successfully registered!");
    } catch (error) {
      throw(error);
      console.log('error: ', error);

      res.status(400);
      res.send({ "❌ error": "Failed to create user: " + error });
    }
  }
});

// Log out of Parse session, frontend resets current user data
router.post("/logout", async (req, res) => {
  try {
    Parse.User.logOut().then(() => {
      const currentUser = Parse.User.current(); // this will now be null
      res.status(201).json({ currentUser });
    });

    console.log("✅ Successfully logged out of Parse session");
  } catch (error) {
    res.status(400);
    res.send({ "❌ error": "Failed to log out: " + error });
  }
});

// User inputs and saves their username, blurb
router.post("/register", async (req, res) => {
  const { user_name, blurb, email_custom, favGenres, displayRealName } = req.body;

  try {
    let currentUser = Parse.User.current();

    console.log("currentUser: ", currentUser.attributes);
    // update fields
    currentUser.set("user_name", user_name);
    currentUser.set("blurb", blurb);
    currentUser.set("email_custom", email_custom);
    currentUser.set("favGenres", favGenres);
    currentUser.set("displayRealName", displayRealName);

    await currentUser.save();
    res.status(201).json({ currentUser });
    console.log("✅ Successfully added username, blurb, email, genres");
  } catch (error) {
    res.status(400);
    res.send({ "❌ error": "Failed to add fields to user: " + error });
  }
});

// 1. Adds wiki to user wikis_upvoted and
// 2. Adds point to wiki
router.post("/wiki/upvote", async (req, res) => {
  const { wikiID, wikiTitle } = req.body;

  try {
    // 1.
    const currentUser = Parse.User.current();
    console.log("currentUs att ", currentUser.attributes);
    // update fields
    const new_wiki_upvoted = {
      wikiID: wikiID,
      wikiTitle: wikiTitle,
    };
    currentUser.set("wikis_upvoted", [
      ...currentUser.attributes.wikis_upvoted,
      new_wiki_upvoted,
    ]);
    await currentUser.save();
    // 2.
    // find wiki object in database
    const queryWiki = new Parse.Query("Wiki");
    queryWiki.equalTo("objectId", wikiID);
    const wikiInfo = await queryWiki.first();

    const oldWikiObject = wikiInfo.attributes.wikiObject;
    const newPoints = oldWikiObject.points + 1;
    wikiInfo.set("wikiObject", {
      ...oldWikiObject,
      points: newPoints,
    });
    // save wiki
    await wikiInfo.save();

    res.status(201).json({ currentUser, wikiInfo });
    console.log("✅ Successfully added upvote to user and wiki");
  } catch (error) {
    res.status(400);
    res.send({ "❌ error": "Failed to upvote to user and wiki " + error });
  }
});

// Get user info by userID
router.get("/account/:userID", async (req, res, next) => {
  try {
    const { userID } = req.params;
    console.log("userID: ", userID);
    //Fetch user info
    const queryUser = new Parse.Query(Parse.User);
    queryUser.equalTo("userID", userID);
    const userInfo = await queryUser.first();

    res.status(200).json({ userInfo });
    console.log("✅ Successfully retrieved user info!");
  } catch (error) {
    console.log("error: ", error);
    res.status(404);
    res.send({ "❌ error": "Failed to retrieve user info: " + error });
  }
});

// Get array of users info by user_name (we just need user_name and userID)
router.post("/account/search", async (req, res, next) => {
  try {
    const { searchQuery } = req.body;
    console.log("req.body: ", req.body);
    const queryUsers = new Parse.Query(Parse.User);

    queryUsers.contains("user_name", searchQuery);

    const resUsersInfo = await queryUsers.find();
    res.status(201).json({ resUsersInfo });
    console.log("✅ Successfully retrieved user info!");
  } catch (error) {
    console.log("error: ", error);
    res.status(400);
    res.send({ "❌ error": "Failed to retrieve any users info: " + error });
  }
});

module.exports = router;
