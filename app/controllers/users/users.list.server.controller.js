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
    User.find().exec(function(err, users) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            // Remove this user
            users.splice(users.indexOf(req.user), 1);
            res.jsonp(users);
        }
    });
};