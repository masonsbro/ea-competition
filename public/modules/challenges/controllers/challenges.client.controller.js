'use strict';

// Challenges controller
angular.module('challenges').controller('ChallengesController', ['$scope', '$stateParams', '$location', 'Authentication', 'Challenges',
	function($scope, $stateParams, $location, Authentication, Challenges) {
		$scope.authentication = Authentication;

		// Find a list of Challenges
		$scope.find = function() {
			$scope.challenges = Challenges.query();
		};
	}
]);