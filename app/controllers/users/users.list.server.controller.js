'use strict';

/**
 * Module dependencies.
 */
var _ = require('lodash'),
    errorHandler = require('../errors.server.controller'),
    mongoose = require('mongoose'),
    User = mongoose.model('User');

/**
 * List of Users
 */
exports.list = function(req, res) { 
    User.find().where('_id').ne(req.user._id).exec(function(err, users) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            res.jsonp(users);
        }
    });
};