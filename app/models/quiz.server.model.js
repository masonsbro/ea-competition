'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Quiz Schema
 */
var QuizSchema = new Schema({
    created: {
        type: Date,
        default: Date.now
    },
	subject: {
        type: Number
    },
    questions: [{ type: Schema.ObjectId, ref: 'Question' }],
});

mongoose.model('Quiz', QuizSchema);