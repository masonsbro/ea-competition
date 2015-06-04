'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users.server.controller');
	var challenges = require('../../app/controllers/challenges.server.controller');

	// Challenges Routes
	app.route('/challenges')
		.get(users.requiresLogin, challenges.list)
		.post(users.requiresLogin, challenges.create);
    app.route('/challenges/:challengeId')
        .delete(users.requiresLogin, challenges.delete)
        .put(users.requiresLogin, challenges.update);

    app.param('challengeId', challenges.challengeById);
};
