'use strict';

angular.module('challenge').controller('ChallengeController', ['$scope',
	function($scope) {

        $scope.selectUser = function($index) {
            $scope.selectedUser = $scope.selectedUser == $index ? -1 : $index;
        };

        $scope.isSelected = function($index) {
            return $scope.selectedUser == $index;
        };

        $scope.selectedUser = -1;
        
        $scope.users = [
            {
                id: 2,
                name: "Jimmy Thai",
                school: "Pearland High School",
                rating: 2000,
            },
            {
                id: 3,
                name: "Sara Matthews",
                school: "Pearland High School",
                rating: 1900,
            },
            {
                id: 4,
                name: "Micah Gautney",
                school: "Pearland High School",
                rating: 1800,
            },
            {
                id: 5,
                name: "Garret Mattila",
                school: "Pearland High School",
                rating: 1700,
            },
            {
                id: 6,
                name: "Samuel Holmes",
                school: "Pearland High School",
                rating: 1600,
            },
            {
                id: 7,
                name: "Zachary Watson",
                school: "Pearland High School",
                rating: 1500,
            },
            {
                id: 8,
                name: "Dakota Dock",
                school: "Pearland High School",
                rating: 1500,
            },
            {
                id: 9,
                name: "Savannah Segura",
                school: "Pearland High School",
                rating: 1400,
            },
        ];
	}
]);