const express = require('express');
const router = express.Router();
const feedController = require("../controllers/feedController");
const mainConfig = require("../../config/mainConfig")
const auth = require("../middlewares/auth")


module.exports.setRouter = function(app){

	let baseUrl = '/feedsDb';
	
	

    app.get(baseUrl+'/all',feedController.getAllFeeds);

  
    app.get(baseUrl+'/view/:feedId',feedController.viewByFeedId);

    
    app.post(baseUrl+'/delete/',feedController.deleteFeed);

    app.put(baseUrl+'/edit/:feedId',feedController.editFeed);

    app.post(baseUrl+'/create',feedController.createFeed);



}


