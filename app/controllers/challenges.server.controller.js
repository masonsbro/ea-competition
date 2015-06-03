'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	Challenge = mongoose.model('Challenge'),
	Quiz = mongoose.model('Quiz'),
	Question = mongoose.model('Question'),
	_ = require('lodash');

function shuffle(o){
    for(var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
    return o;
}

/**
 * Create a Challenge
 */
exports.create = function(req, res) {
	var challenge = new Challenge(req.body);
	challenge.from = req.user;

	// Generate quiz
	Question.find({subject: req.body.subject}).exec(function(err, questions) {
		if (!err) {
			questions = shuffle(questions);
			var quiz = new Quiz({subject: req.body.subject, questions: questions.slice(0, req.body.length)});
			quiz.save(function(err) {
				if (err) {
					return res.status(400).send({
						error: errorHandler.getErrorMessage(err)
					});
				}
			});

			challenge.quiz = quiz;

			challenge.save(function(err) {
				if (err) {
					return res.status(400).send({
						error: errorHandler.getErrorMessage(err)
					});
				} else {
					res.jsonp(challenge);
				}
			});
		}
	});
};

/**
 * List of Challenges
 */
exports.list = function(req, res) { 
	Challenge.find({$or: [{to: req.user._id}, {from: req.user._id}]}).sort('-created').populate('from').populate('to').populate('quiz').limit(20).exec(function(err, challenges) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(challenges);
		}
	});
};
