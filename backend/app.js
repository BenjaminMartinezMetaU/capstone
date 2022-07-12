const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const Parse = require('parse/node')

const app = express()

Parse.initialize(
    "gE7GwC0Ga8GbURK9NEdDI3Xmx3EMNCpapr6keW8f", 
    "SRU9rih4vB2rjxPFS9MHDPI7dZtVPbEXfSr0DDQm")

Parse.serverURL = "https://parseapi.back4app.com"


