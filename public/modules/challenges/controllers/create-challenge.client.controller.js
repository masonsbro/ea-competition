'use strict';

angular.module('challenges').controller('CreateChallengeController', ['$scope', '$stateParams', '$location', 'Authentication', 'Challenges', 'Users',
    function($scope, $stateParams, $location, Authentication, Challenges, Users) {
        $scope.authentication = Authentication;

        $scope.create = function() {
            // Create new Challenge object
            var challenge = new Challenges({
                to: $scope.users[$scope.selectedUser],
                time: $scope.selectedTime,
                length: $scope.numberOfQuestions.value,
            });

            // Redirect after save
            challenge.$save(function(response) {
                $location.path('challenges');

                // Clear form fields
                $scope.numberOfQuestions = {};
                $scope.selectedTime = -1;
                $scope.selectedSubject = -1;
                $scope.selectedUser = -1;
            }, function(errorResponse) {
                $scope.error = errorResponse.data.message;
            });
        };

        $scope.formComplete = function() {
            if ($scope.selectedUser === -1 ||
                $scope.selectedSubject === -1 ||
                $scope.selectedTime === -1 ||
                !(parseInt($scope.numberOfQuestions.value) >= 1 && parseInt($scope.numberOfQuestions.value) <= 100)) {
                return false;
            }
            return true;
        };

        $scope.numberOfQuestions = {};

        $scope.selectSubject = function(subject) {
            $scope.selectedSubject = $scope.subjects.indexOf(subject);
        };

        $scope.selectedSubjectName = function() {
            return $scope.selectedSubject === -1 ? 'Select Subject' : $scope.subjects[$scope.selectedSubject].name;
        };

        $scope.selectedSubject = -1;

        $scope.subjects = [
            {
                id: 1,
                name: 'Art',
            },
            {
                id: 2,
                name: 'Economics',
            },
            {
                id: 3,
                name: 'Literature',
            },
            {
                id: 4,
                name: 'Math',
            },
            {
                id: 5,
                name: 'Music',
            },
            {
                id: 6,
                name: 'Science',
            },
            {
                id: 7,
                name: 'Social Science',
            },
        ];

        $scope.selectTime = function(time) {
            $scope.selectedTime = $scope.times.indexOf(time);
        };

        $scope.selectedTimeName = function() {
            return $scope.selectedTime === -1 ? 'Select Timing Option' : $scope.times[$scope.selectedTime].name;
        };

        $scope.selectedTime = -1;

        $scope.times = [
            {
                id: 1,
                name: '10 Seconds / Question',
            },
            {
                id: 2,
                name: '20 Seconds / Question',
            },
            {
                id: 3,
                name: '30 Seconds / Question',
            },
            {
                id: 4,
                name: '40 Seconds / Question',
            },
            {
                id: 5,
                name: '50 Seconds / Question',
            },
            {
                id: 6,
                name: '60 Seconds / Question',
            },
            {
                id: 7,
                name: 'Competition Timing',
            },
        ];

        $scope.selectUser = function(user) {
            $scope.selectedUser = $scope.users.indexOf(user);
        };

        $scope.isUserSelected = function(user) {
            return $scope.users[$scope.selectedUser] === user;
        };

        $scope.selectedUser = -1;
        
        // Get user list
        $scope.users = Users.query();

    }
]);