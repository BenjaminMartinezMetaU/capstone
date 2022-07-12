const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const Parse = require('parse/node')

const app = express()

Parse.initialize(
    "gE7GwC0Ga8GbURK9NEdDI3Xmx3EMNCpapr6keW8f", 
    "SRU9rih4vB2rjxPFS9MHDPI7dZtVPbEXfSr0DDQm")

Parse.serverURL = "https://parseapi.back4app.com"

app.use(express.json())
app.use(morgan("tiny"))
app.use(cors())


// Expects parameters for username and password
app.post('/login', async (req, res) => {
    try {
      const user = await Parse.User.logIn(req.body.username, req.body.password)
      res.send({"user" : user})
    } catch (error) {
      res.status(400)
      res.send({"error" : "Login failed: " + error })
    }
  })
  
  // Expects paramters for username, password, and any additional
  // columns that you want in your user table (profile_picture_url, etc)
  app.post('/register', async (req, res) => {
    let user = new Parse.User(req.body)
  
    try {
        await user.signUp()
        res.status(201)    
        res.send({"user" : user})
    } catch (error) {
        res.status(400)
        res.send({"error" : "Failed to create user: " + error })
    }
  })

  module.exports = app;