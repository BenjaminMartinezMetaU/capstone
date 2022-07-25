const express = require('express');
const Parse = require('parse/node');
const {WIKI_DEFAULT_HTML} = require('./constants.js')


const router = express.Router();

const { BadRequestError, NotFoundError } = require('../utils/errors');

// Store wiki object, generating id and saving default html
router.post('/wiki/new', async (req, res, next) => {

    try {
        // req.body contains title and html body as string
      let wikiObject = {...req.body, "html" : "<h1>"+ req.body.title +"</h1>" + WIKI_DEFAULT_HTML}
      const wiki = new Parse.Object("Wiki", {wikiObject})
      await wiki.save();
     
      res.status(201).json({ wiki });
      console.log("✅ Successfully saved new wiki !") 


    } catch (error) {
      console.log('error: ', error);
      res.status(400);
      res.send({ "❌ error": "Failed to save new wiki: " + error })
    
    }
  });

  // Get wiki info by wikiID
router.get('/wiki/:wikiID', async (req, res, next) => {

    try {
      const { wikiID } = req.params;
      console.log('wikiID: ', wikiID);
      //Fetch wiki info
      const queryWiki = new Parse.Query("Wiki");
      queryWiki.equalTo("objectId", wikiID);
      const wikiInfo = await queryWiki.first();

      res.status(200).json({ wikiInfo });
      console.log("✅ Successfully retrieved wiki info!")

    } catch (error) {
        console.log('error: ', error);
      res.status(404);
      res.send({ "❌ error": "Failed to retrieve wiki info: " + error })
    
    }
  });


  // Update wiki changes (just html for now)
router.post('/wiki/save', async (req, res, next) => {

    try {
      // get params to update
      const {wikiID, htmlValue} = req.body;

      // find wiki object in database
      const queryWiki = new Parse.Query("Wiki");
      queryWiki.equalTo("objectId", wikiID);
      const wikiInfo = await queryWiki.first();

      // update information
      const oldWikiObject = wikiInfo.attributes.wikiObject;
      wikiInfo.set("wikiObject", {...oldWikiObject, "html" : htmlValue})
      console.log("new wiki info: ", wikiInfo.attributes);

      // save
      await wikiInfo.save();

      res.status(201).json({ wikiInfo });
      console.log("✅ Successfully save changes to wiki !") 


    } catch (error) {
      console.log('error: ', error);
      res.status(400);
      res.send({ "❌ error": "Failed to save changes to wiki: " + error })
    
    }
  });

  // Get array of wikis info by title (we just need title and wikiID)
router.post('/wiki/search', async (req, res, next) => {

    try {
      const { searchQuery } = req.body;
      const queryWikis = new Parse.Query("Wiki");
      queryWikis.contains("wikiObject.title", searchQuery);

    
      const resWikisInfo = await queryWikis.find();
      console.log('resWikisInfo: ', resWikisInfo);

      res.status(201).json({ resWikisInfo });
      console.log("✅ Successfully retrieved wikis info!") 


    } catch (error) {
      console.log('error: ', error);
      res.status(400);
      res.send({ "❌ error": "Failed to retrieve any wikis info: " + error })
    
    }
  });

module.exports = router;