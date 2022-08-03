const express = require('express');
const Parse = require('parse/node');
const { WIKI_DEFAULT_HTML } = require('./constants.js')
const diff = require('../utils/htmldiff')

const router = express.Router();

const { BadRequestError, NotFoundError } = require('../utils/errors');

// Store wiki object, generating id and saving default html
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
            "activity_log": [],
            "points": 0,
        }
        const wiki = new Parse.Object("Wiki", { wikiObject })
        await wiki.save();
        console.log('wiki:att ', wiki.attributes);


        // USER updates: connect it to user
        // add new Wiki started to wikis_worked_on

        let currentUser = Parse.User.current();

        /* User does not contain the current wiki */
        const new_wiki_worked_on = {
            "wikiID": wiki.id,
            "wikiTitle": wiki.attributes.wikiObject.title,
            "userRoleOnWiki": "founder"
        }
        currentUser.set("wikis_worked_on", [...currentUser.attributes.wikis_worked_on, new_wiki_worked_on])

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


        // check what was edited by looking at diff
        // 3 options modified, added to, deleted from

        const oldWikiObject = wikiInfo.attributes.wikiObject;

        // Diff HTML strings

        const htmlDiff = diff(oldWikiObject.html_curr, htmlValue);
        console.log('htmlDiff: ', htmlDiff);
        // Find change
        let change = "modified project";
        if (htmlDiff.includes("ins") && !htmlDiff.includes("del")) {
            change = "added to project"
        } else if (htmlDiff.includes("del") && !htmlDiff.includes("ins")) {
            change = "deleted from project"
        }




        // Change log stores on the wiki: the change and who did it
        // We store redundant information so we can have same object for user and wiki storage
        // (not necessary just easier to read and track)
        const activityKey = oldWikiObject.activity_log.length
        const newActivity = {
            "change": change,
            "key": activityKey,
            "userID": userData.userID,
            "user_name": userData.user_name,
            "wikiID": wikiID,
            "wikiTitle": wikiTitle,
            "points": 0,
            "htmlDiff": htmlDiff
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
                "wikiID": wikiID,
                "wikiTitle": wikiTitle,
                "userRoleOnWiki": "contributor"
            }
            currentUser.set("wikis_worked_on", [...currentUser.attributes.wikis_worked_on, new_wiki_worked_on])
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
        let wikiIDs = [];
        currentUser.attributes.wikis_worked_on.map((wiki) => {
            wikiIDs.push(wiki.wikiID);
        });
        const wikiIDsUpvoted = [];
        currentUser.attributes.wikis_upvoted.map((wiki) => {
            wikiIDsUpvoted.push(wiki.wikiID);
        });
        const favGenres = currentUser.attributes.favGenres;

        // 2. get wikiInfo from wikisWorkedOn
        const wikisWorkedOnObjects = await Promise.all(wikiIDs.map(async wikiID => {
            const queryWiki = new Parse.Query("Wiki");
            queryWiki.equalTo("objectId", wikiID);
            const wikiInfo = await queryWiki.first();
            console.log('wikiInfo: att', wikiInfo.attributes);
            return wikiInfo.attributes.wikiObject;
        }));

        // 3. get wikiInfo from ALL wikis where at least one genre matches user favGenres
        // prob not efficient
        const queryWiki = new Parse.Query("Wiki");
        const results = await queryWiki.find();
        const wikisWithWeights = results.map((wiki) => {
            const wikiGenres = wiki.attributes.wikiObject.genres;
            let weight = 0;
            // Loop through genres
            Object.keys(favGenres).forEach(function (key) {
                if (favGenres[key] && wikiGenres[key]) {
                    // 1 matching genre = 1 more weight
                    weight += 1;
                }
            });
            // Check if we've worked on the wiki to give it more weight
            const hasWorkedOn = wikiIDs.some((wikiID) => wikiID === wiki.id);
            weight = hasWorkedOn ? weight + 4 : weight;
            // Check if upvoted wiki to give it more weight
            const hasUpvoted = wikiIDsUpvoted.some((wikiID) => wikiID === wiki.id);
            weight = hasUpvoted ? weight + 3 : weight;

            if (weight > 0) {

                return { wiki, weight };
            } else {
                return null;
            }

        });




        //  2. for each wiki find and get the wiki info
        //  3. store it 

        const wikiFeeds = await Promise.all(wikiIDs.map(async wikiID => {
            const queryWiki = new Parse.Query("Wiki");
            queryWiki.equalTo("objectId", wikiID);
            const wikiInfo = await queryWiki.first();
            console.log('wikiInfo: att', wikiInfo.attributes);
            return wikiInfo.attributes.wikiObject.activity_log;
        }));

        res.status(200).json({ wikiFeeds, wikisWithWeights });
        console.log("✅ Successfully retrieved wiki info!")

    } catch (error) {
        console.log('error: ', error);
        res.status(404);
        res.send({ "❌ error": "Failed to retrieve wiki info: " + error })

    }
});

module.exports = router;