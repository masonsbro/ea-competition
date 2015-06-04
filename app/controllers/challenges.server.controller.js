'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    errorHandler = require('./errors.server.controller'),
    Challenge = mongoose.model('Challenge'),
    Match = mongoose.model('Match'),
    Quiz = mongoose.model('Quiz'),
    Question = mongoose.model('Question'),
    _ = require('lodash');

function shuffle(o){
    for(var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
    return o;
}

exports.challengeById = function(req, res, next, challengeId) {
    if (!mongoose.Types.ObjectId.isValid(challengeId)) {
        return res.status(400).send({
            message: 'Challenge is invalid'
        });
    }

    Challenge.findById(challengeId).populate('to').populate('from').exec(function(err, challenge) {
        if (err) return next(err);
        if (!challenge) {
            return res.status(404).send({
                message: 'Challenge not found'
            });
        }
        req.challenge = challenge;
        next();
    });
};

/**
 * Create a Challenge
 */
exports.create = function(req, res) {
    var challenge = new Challenge({to: req.body.to});
    challenge.from = req.user;

    // Generate quiz
    Question.find({subject: req.body.subject}).exec(function(err, questions) {
        if (!err) {

            questions = shuffle(questions);

            var quiz = new Quiz({subject: req.body.subject, questions: questions.slice(0, req.body.numQuestions)});
            quiz.save(function(err) {
                if (err) {
                    return res.status(400).send({
                        error: errorHandler.getErrorMessage(err)
                    });
                }
            });

            var match = new Match({quiz: quiz._id, time: req.body.time});
            match.save(function(err) {
                if (err) {
                    return res.status(400).send({
                        error: errorHandler.getErrorMessage(err)
                    });
                }
            });

            challenge.match = match._id;

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
    Challenge.find({$or: [{to: req.user._id, accepted: false}, {from: req.user._id, reaccepted: false}]})
        .sort('-created')
        .populate('from')
        .populate('to')
        .populate('match')
        .exec(function(err, challenges) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            Quiz.populate(challenges, {
                path: 'match.quiz',
            }, function(err, challenges) {
                if (err) {
                    return res.status(400).send({
                        message: errorHandler.getErrorMessage(err)
                    });
                } else {
                    res.jsonp(challenges);
                }
            });
        }
    });
};

/**
 * Delete a Challenge
 */
exports.delete = function(req, res) {
    if ((req.challenge.to.id !== req.user.id && req.challenge.from.id !== req.user.id) ||
        req.challenge.accepted) {
        return res.status(400).send('No permission.');
    }
    req.challenge.remove();
    res.jsonp(req.challenge);
};

exports.update = function(req, res) {
    if (req.challenge.to.id === req.user.id && req.body.accepted) {
        req.challenge.accepted = true;
    } else if (req.challenge.from.id === req.user.id && req.challenge.accepted && req.body.reaccepted) {
        req.challenge.reaccepted = true;
    } else {
        return res.status(400).send('No permission.');
    }
    req.challenge.save(function(err) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            res.json(req.challenge);
        }
    });
};