'use strict';

// Challenges controller
angular.module('challenges').controller('ChallengesController', ['$scope', '$stateParams', '$location', 'Authentication', 'Challenges',
	function($scope, $stateParams, $location, Authentication, Challenges) {
		$scope.authentication = Authentication;

		$scope.subjects = ['Art', 'Economics', 'Literature', 'Math', 'Music', 'Science', 'Social Science'];
		$scope.times = ['10 Seconds / Question', '20 Seconds / Question', '30 Seconds / Question', '40 Seconds / Question', '50 Seconds / Question', '60 Seconds / Question', 'Competition Timing'];

		// Get incoming Challenges
		$scope.challenges = Challenges.query();

		$scope.delete = function(challenge) {
			
		};
	}
]);