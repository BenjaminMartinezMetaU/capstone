const express = require('express');
const Parse = require('parse/node')


const router = express.Router();

const { BadRequestError, NotFoundError } = require('../utils/errors');

// Expects parameters for username, password, and any additional
// columns that you want in your user table (profile_picture_url, etc)
router.post('/sign-in', async (req, res) => {
    let user = new Parse.User(req.body)
    // Check if user already exists
    // TODO: make User model class to store common methods like this

    let queryUsersById = new Parse.Query(Parse.User);
    queryUsersById.equalTo("userID", req.body.userID);
    let usersWithSameId = await queryUsersById.find();
    let userExists = usersWithSameId.length > 0;


    // login to Parse session
    if (userExists) {
        try {
            const user = await Parse.User.logIn(req.body.username, req.body.password)
            
            const sessionToken = user.getSessionToken();
            console.log('sessionToken: ', sessionToken);
            Parse.User.enableUnsafeCurrentUser();
            Parse.User.become(sessionToken);

            res.send({ "user": user, "userExists": userExists })

            
            console.log("✅ Successfully logged in!!")
        } catch (error) {
            res.status(400)
            res.send({ "❌ error": "Login failed: " + error })
        }
    } else {
        // register on Parse db

        try {
            await user.signUp()

            const sessionToken = user.getSessionToken();
            console.log('sessionToken: ', sessionToken);
            Parse.User.enableUnsafeCurrentUser();
            Parse.User.become(sessionToken);

            res.status(201)
            res.send({ "user": user })
            console.log("✅ Successfully registered!")
        } catch (error) {
            res.status(400)
            res.send({ "❌ error": "Failed to create user: " + error })
        }
    }
})


// User inputs and saves their username, blurb
router.post('/register', async (req, res) => {

    const { user_name, blurb } = req.body;


    try {
        let currentUser = Parse.User.current();
    
        console.log('currentUser: ', currentUser);
        // update fields
        currentUser.set("user_name", user_name);
        currentUser.set("blurb", blurb);

        await currentUser.save()
        res.status(201).json({ currentUser });
        console.log("✅ Successfully added username, blurb")
    } catch (error) {
        res.status(400)
        res.send({ "❌ error": "Failed to add fields to user: " + error })
    }

})

// Get user info by userID
router.get('/account/:userID', async (req, res, next) => {

    try {
      const { userID } = req.params;
      console.log('userID: ', userID);
      //Fetch user info
      const queryUser = new Parse.Query(Parse.User);
      queryUser.equalTo("userID", userID);
      const userInfo = await queryUser.first();

      res.status(200).json({ userInfo });
      console.log("✅ Successfully retrieved user info!")

    } catch (error) {
        console.log('error: ', error);
      res.status(404);
      res.send({ "❌ error": "Failed to retrieve user info: " + error })
    
    }
  });

// Get array of users info by user_name (we just need user_name and userID)
router.post('/search', async (req, res, next) => {

    try {
      const { searchQuery } = req.body;
      console.log('req.body: ', req.body);
      const queryUsers = new Parse.Query(Parse.User);
      
      queryUsers.contains("user_name", searchQuery)
    
      const resUsersInfo = await queryUsers.find();
      res.status(201).json({ resUsersInfo });
      console.log("✅ Successfully retrieved user info!") 


    } catch (error) {
      console.log('error: ', error);
      res.status(400);
      res.send({ "❌ error": "Failed to retrieve any users info: " + error })
    
    }
  });

module.exports = router;