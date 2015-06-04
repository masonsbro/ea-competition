'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

/**
 * Match Schema
 */
var MatchSchema = new Schema({
    created: {
        type: Date,
        default: Date.now
    },
    time: {
        type: Number,
        required: 'No time multiplier.'
    },
    quiz: {
        type: Schema.ObjectId,
        ref: 'Quiz',
        required: 'No match.'
    },
    results: [{
        user: {
            type: Schema.ObjectId,
            ref: 'User'
        },
        answers: [{
            type: Number
        }],
        numCorrect: {
            type: Number
        }
    }]
});

mongoose.model('Match', MatchSchema);