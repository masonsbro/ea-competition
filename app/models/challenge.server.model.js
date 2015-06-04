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
	match: {
		type: Schema.ObjectId,
		ref: 'Match',
		required: 'No match.'
	},
	state: {
		type: Number,
		default: 0
	}
});

mongoose.model('Challenge', ChallengeSchema);