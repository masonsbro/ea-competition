'use strict';

// Challenges controller
angular.module('challenges').controller('ChallengesController', ['$scope', '$stateParams', '$location', 'Authentication', 'Challenges',
	function($scope, $stateParams, $location, Authentication, Challenges) {
		$scope.authentication = Authentication;

		// Create new Challenge
		$scope.create = function() {
			// Create new Challenge object
			var challenge = new Challenges ({
				
			});

			// Redirect after save
			challenge.$save(function(response) {
				$location.path('challenges/' + response._id);

				// Clear form fields
				$scope.name = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Challenges
		$scope.find = function() {
			$scope.challenges = Challenges.query();
		};
	}
]);