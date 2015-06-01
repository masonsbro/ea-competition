'use strict';

//Setting up route
angular.module('challenge').config(['$stateProvider',
	function($stateProvider) {
		// Challenge state routing
		$stateProvider.
		state('challenge', {
			url: '/challenge',
			templateUrl: 'modules/challenge/views/challenge.client.view.html'
		});
	}
]);