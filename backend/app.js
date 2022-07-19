const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const Parse = require('parse/node')
const { NotFoundError } = require('./utils/errors');
const userRouter = require('./routes/users');
const wikiRouter = require('./routes/wiki');

const app = express()

Parse.initialize(
    "gE7GwC0Ga8GbURK9NEdDI3Xmx3EMNCpapr6keW8f",
    "SRU9rih4vB2rjxPFS9MHDPI7dZtVPbEXfSr0DDQm")

Parse.serverURL = "https://parseapi.back4app.com"

app.use(express.json())
app.use(morgan("tiny"))
app.use(cors())

app.use('/', userRouter);
app.use('/', wikiRouter);


app.use((req, res, next) => next(new NotFoundError()));


module.exports = app;