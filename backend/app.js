const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const Parse = require('parse/node')
const { NotFoundError } = require('./utils/errors');

const app = express()

Parse.initialize(
    "gE7GwC0Ga8GbURK9NEdDI3Xmx3EMNCpapr6keW8f",
    "SRU9rih4vB2rjxPFS9MHDPI7dZtVPbEXfSr0DDQm")

Parse.serverURL = "https://parseapi.back4app.com"

app.use(express.json())
app.use(morgan("tiny"))
app.use(cors())




// Expects paramters for username, password, and any additional
// columns that you want in your user table (profile_picture_url, etc)
app.post('/sign-in', async (req, res) => {
    let user = new Parse.User(req.body)
    // Check if user already exists

    let myquery = new Parse.Query(Parse.User);
    myquery.equalTo("userID", req.body.userID);
    let usersWithSameId = await myquery.find();
    let userExists = usersWithSameId.length > 0;
    console.log("User exists? ", userExists);

    // login to Parse session
    if (userExists) {
        try {
            const user = await Parse.User.logIn(req.body.username, req.body.password)
            res.send({ "user": user })
            console.log("✅ Successfully logged in!!")
        } catch (error) {
            res.status(400)
            res.send({ "❌ error": "Login failed: " + error })
        }
    } else {
        // register on Parse db

        try {
            await user.signUp()
            res.status(201)
            res.send({ "user": user })
            console.log("✅ Successfully registered!")
        } catch (error) {
            res.status(400)
            res.send({ "❌ error": "Failed to create user: " + error })
        }
    }
})

app.use((req, res, next) => next(new NotFoundError()));


module.exports = app;