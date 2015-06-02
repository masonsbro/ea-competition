'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Question Schema
 */
var QuestionSchema = new Schema({
	// Question model fields   
	// ...
    subject: {
        type: Number
    },
    stem: {
        type: String
    },
    answers: [{ type: String }],
    correct: {
        type: Number
    }
});

mongoose.model('Question', QuestionSchema);