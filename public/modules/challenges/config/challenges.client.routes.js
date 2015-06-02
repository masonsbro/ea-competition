'use strict';

//Setting up route
angular.module('challenges').config(['$stateProvider',
	function($stateProvider) {
		// Challenges state routing
		$stateProvider.
		state('listChallenges', {
			url: '/challenges',
			templateUrl: 'modules/challenges/views/list-challenges.client.view.html'
		}).
		state('createChallenge', {
			url: '/challenges/create',
			templateUrl: 'modules/challenges/views/create-challenge.client.view.html'
		});
	}
]);