const express = require('express');
const Parse = require('parse/node');
const { WIKI_DEFAULT_HTML } = require('./constants.js')


const router = express.Router();

const { BadRequestError, NotFoundError } = require('../utils/errors');

// Store wiki object, generating id and saving default html
// TODO: Connect this to user
router.post('/wiki/new', async (req, res, next) => {

    try {
        // req.body contains title and html body as string
        // on edit, user will change current html and compares it to previous
        // to see edit diff
        // TODO: realized there's little point to doing above ^ unless we wanna store a cache of prev pages
        let wikiObject = {
            ...req.body,
            "html_curr": "<h1>" + req.body.title + "</h1>" + WIKI_DEFAULT_HTML,
            "html_prev": "<h1>" + req.body.title + "</h1>" + WIKI_DEFAULT_HTML,
            "activity_log": []
        }
        const wiki = new Parse.Object("Wiki", { wikiObject })
        await wiki.save();
        console.log('wiki:att ', wiki.attributes);
       

        // USER updates: connect it to user
        // add new Wiki started to wikis_worked_on

        let currentUser = Parse.User.current();
    
        /* User does not contain the current wiki */
            const new_wiki_worked_on = {
                "wikiID" : wiki.id,
                "wikiTitle" : wiki.attributes.wikiObject.title,
                "userRoleOnWiki" : "founder"
                }
            currentUser.set("wikis_worked_on", [...currentUser.attributes.wikis_worked_on, new_wiki_worked_on ])
          

        await currentUser.save()

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
// Handle changelog
router.post('/wiki/save', async (req, res, next) => {

    try {
        // get params to update
        const { wikiID, htmlValue, userData, wikiTitle } = req.body;

        // find wiki object in database
        const queryWiki = new Parse.Query("Wiki");
        queryWiki.equalTo("objectId", wikiID);
        const wikiInfo = await queryWiki.first();


        // check what was edited
        //    for now keeping it very simple with
        //    just information showing if wiki was lengthened or not
        //    TODO: Get more specific with quill deltas
        const oldWikiObject = wikiInfo.attributes.wikiObject;
        const change = oldWikiObject.html_curr.length < htmlValue.length ?
            "added to project" : "did not add to project";
        console.log('userData: ', userData);



        // Change log stores on the wiki: the change and who did it
        // We store redundant information so we can have same object for user and wiki storage
        // (not necessary just easier to read and track)
        const activityKey = oldWikiObject.activity_log.length
        const newActivity = {
            "change": change,
            "key": activityKey,
            "userID": userData.userID,
            "user_name" : userData.user_name,
            "wikiID" : wikiID,
            "wikiTitle" : wikiTitle
        }

        // USER updates
        // add activity to user info
        let currentUser = Parse.User.current();
    
    
        console.log('currentUser: ', currentUser);
        // update activity log fields
        currentUser.set("activity_log", [...currentUser.attributes.activity_log, newActivity]);
        // update wikis worked on fields if not already worked on
        if (currentUser.attributes.wikis_worked_on.filter(wiki => wiki.wikiID === wikiID).length === 0) {
            /* User does not contain the current wiki */
            const new_wiki_worked_on = {
                "wikiID" : wikiID,
                "wikiTitle" : wikiTitle,
                "userRoleOnWiki" : "contributor"
                }
            currentUser.set("wikis_worked_on", [...currentUser.attributes.wikis_worked_on, new_wiki_worked_on ])
          }

        await currentUser.save()

        // update information on wiki storage
        //    store previous without changes then store current with changes
        wikiInfo.set("wikiObject", {
            ...oldWikiObject,
            "html_prev": oldWikiObject.html_curr,
            "html_curr": htmlValue,
            "activity_log": [...oldWikiObject.activity_log, newActivity]
        })
        //    store current with changes


        // save
        await wikiInfo.save();

        res.status(201).json({ wikiInfo });
        console.log("✅ Successfully save changes to wiki and added change to user!")


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


// Get project feeds from wikis by user wikis_worked_on
router.get('/home', async (req, res, next) => {

    try {
        // 1. get curr user's wikis_worked on 
        let currentUser = Parse.User.current();
        console.log('currentUser: ', currentUser);
        let wikiIDs_to_fetch = [];
        currentUser.attributes.wikis_worked_on.map((wiki)=>{
            wikiIDs_to_fetch.push(wiki.wikiID);
        });

        //  2. for each wiki find and get the wiki info
        //  3. store it 

        const wikiFeeds = await Promise.all(wikiIDs_to_fetch.map(async wikiID => {
            const queryWiki = new Parse.Query("Wiki");
            queryWiki.equalTo("objectId", wikiID);
            const wikiInfo = await queryWiki.first();
            console.log('wikiInfo: att', wikiInfo.attributes);
            return wikiInfo.attributes.wikiObject.activity_log;
          }));
    
        res.status(200).json({ wikiFeeds });
        console.log("✅ Successfully retrieved wiki info!")

    } catch (error) {
        console.log('error: ', error);
        res.status(404);
        res.send({ "❌ error": "Failed to retrieve wiki info: " + error })

    }
});

module.exports = router;