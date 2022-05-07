const mongoose = require('mongoose');
const shortid = require('shortid');
const time = require('./../libs/timeLib');
const response = require('./../libs/responseLib')
const logger = require('./../libs/loggerLib');
const check = require('./../libs/checkLib')
/* Models */
const FeedModel = mongoose.model('Feed');

/**
 * function to read all Feeds.
 */
let getAllFeeds = async(req,res)=> {

    try {
        const allFeeds = await FeedModel.find();
        let apiResponse = response.generate(false, 'All Feeds Details Found', 200, allFeeds)
        res.send(apiResponse)

    }
    catch (err) {
        console.log(err)
        logger.error(err.message, 'Feed Controller: getAllFeeds', 10)
        let apiResponse = response.generate(true, 'Failed To Find feed Details', 500, null)
        res.send(apiResponse)
    }

}// end get all Feeds

/**
 * function to read single Feed.
 */
let viewByFeedId = async (req, res) => {

    try {
        const singleFeed = await FeedModel.findOne({ 'feedId': req.params.feedId });
        let apiResponse = response.generate(false, 'All Feed Details Found', 200, singleFeed)
        res.send(apiResponse)

    }
    catch (err) {
        console.log('Error Occured.')
        logger.error(`Error Occured : ${err}`, 'Database at viewByFeedId', 10)
        let apiResponse = response.generate(true, 'Error Occured at viewByFeedId.', 500, null)
        res.send(apiResponse)
    }

}

/**
 * function to edit feed by admin.
 */
let editFeed = async (req, res) => {
    try {
        let options = req.body;
        console.log(options);
        console.log(req.params.feedId);
        const editedFeed = await FeedModel.update({ 'feedId': req.params.feedId }, options, { multi: true })
        let apiResponse = response.generate(false, 'Feed edited', 200, editedFeed)
        console.log(apiResponse);
        res.send(apiResponse)

    }
    catch (err) {
        console.log('Error Occured.')
        logger.error(`Error Occured : ${err}`, 'Database error at editFeed', 10)
        let apiResponse = response.generate(true, 'Error Occured at editFeed.', 500, null)
        res.send(apiResponse)
    }
}

/**
 * function to delete Feed by admin.
 */
let deleteFeed = async (req, res) => {
    try {
        const deletedFeed = await FeedModel.remove({ 'feedId': req.body.feedId });
        let apiResponse = response.generate(false, 'Feed deleted', 200, deletedFeed)
        res.send(apiResponse)

    }
    catch (err) {
        console.log('Error Occured.')
        logger.error(`Error Occured : ${err}`, 'Database error at deleteFeed', 10)
        let apiResponse = response.generate(true, 'Error Occured at deleteFeed.', 500, null)
        res.send(apiResponse)
    }
}

/**
 * function to create the feed.
 */
let createFeed = async (req, res) => {
    if(req.paramsMismatch!=true){
        try {
            const singleFeed = await FeedModel.findOne({ 'publishedAt': new Date(req.body.publishedAt), 'soucse':req.body.soucse });
            // console.log(check.isEmpty(singleFeed));
            if(check.isEmpty(singleFeed)){
                var today = Date.now();
                let feedId = shortid.generate();
                let newFeed= new FeedModel({
        
                    feedId: feedId,
                    title: req.body.title,
                    description: req.body.description,
                    category: ['sports'],
                    publishedAt: req.body.publishedAt,
                    createdAt: today,
                    lastModified: today,
                }) // end new feed model
        
                const createdFeed = await newFeed.save()
                let apiResponse = response.generate(false, 'Feed Created successfully', 200, createdFeed)
                res.send(apiResponse)
            } else {
                let apiResponse = response.generate(false, 'Feed already Exists', 200, null);
                res.send(apiResponse)
            }
            
    
        }
        catch (err) {
            console.log('Error Occured.')
            logger.error(`Error Occured : ${err}`, 'Database', 10)
            let apiResponse = response.generate(true, 'Error Occured in Create Feed.', 500, null)
            res.send(apiResponse)
        }
    }
    else{
        let apiResponse = response.generate(true, 'input params missing in Create Feed', 403,{'expected':req.paramsExpected,'received':req.paramsReceived})
        res.send(apiResponse)
    }
    
}







module.exports = {

    getAllFeeds,
    createFeed,
    viewByFeedId,
    deleteFeed,
    editFeed
}// end exports