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
		ref: 'User',
		required: 'No from user.'
	},
	to: {
		type: Schema.ObjectId,
		ref: 'User',
		required: 'No to user.'
	},
	time: {
		type: Number,
		required: 'No time multiplier.'
	},
	quiz: {
		type: Schema.ObjectId,
		ref: 'Quiz',
		required: 'No quiz.'
	},
	state: {
		type: Number,
		default: 0
	}
});

mongoose.model('Challenge', ChallengeSchema);