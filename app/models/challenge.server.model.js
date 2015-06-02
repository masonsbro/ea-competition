'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Challenge Schema
 */
var ChallengeSchema = new Schema({
	created: {
		type: Date,
		default: Date.now
	},
	from: {
		type: Schema.ObjectId,
		ref: 'User'
	},
	to: {
		type: Schema.ObjectId,
		ref: 'User'
	},
	time: {
		type: Number
	},
	quiz: {
		type: Schema.ObjectId,
		ref: 'Quiz'
	},
});

mongoose.model('Challenge', ChallengeSchema);