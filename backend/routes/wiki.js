const express = require('express');
const Parse = require('parse/node')


const router = express.Router();

const { BadRequestError, NotFoundError } = require('../utils/errors');

// Store wiki object, generating id and saving html
router.post('/wiki/new', async (req, res, next) => {

    try {
        // req.body contains title and html body as string
      const wiki = new Parse.Object("Wiki", req.body)
      wiki.save();
     
      res.status(201).json({ wiki });
      console.log("✅ Successfully saved new wiki !") 


    } catch (error) {
      console.log('error: ', error);
      res.status(400);
      res.send({ "❌ error": "Failed to save new wiki: " + error })
    
    }
  });

module.exports = router;