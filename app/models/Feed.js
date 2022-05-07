/**
 * Module Dependencies
 */
const mongoose = require('mongoose'),
    Schema = mongoose.Schema;

let feedSchema = new Schema({

    feedId: {
        type: String,
        unique: true
    },
    title: {
        type: String,
        default: ''
    },
    description: {
        type: String,
        default: ''
    },
    category : [{
        type: String,
        default: ''
    }],
    publishedAt :{
        type: Date,
        default: Date.now
    },
    createdAt: {
        type: Date,
        default: Date.now
    }, 
    lastModified: {
        type: Date,
        default: Date.now
    },

})


feedSchema.index({feedId:1}); // schema level


mongoose.model('Feed', feedSchema);