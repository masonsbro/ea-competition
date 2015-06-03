'use strict';

angular.module('challenges').controller('CreateChallengeController', ['$scope', '$stateParams', '$location', 'Authentication', 'Challenges', 'Users',
    function($scope, $stateParams, $location, Authentication, Challenges, Users) {
        $scope.authentication = Authentication;

        $scope.create = function() {
            // Create new Challenge object
            var challenge = new Challenges({
                to: $scope.users[$scope.selectedUser]._id,
                subject: $scope.selectedSubject,
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
            return $scope.selectedSubject === -1 ? 'Select Subject' : $scope.subjects[$scope.selectedSubject];
        };

        $scope.selectedSubject = -1;

        $scope.subjects = ['Art', 'Economics', 'Literature', 'Math', 'Music', 'Science', 'Social Science'];

        $scope.selectTime = function(time) {
            $scope.selectedTime = $scope.times.indexOf(time);
        };

        $scope.selectedTimeName = function() {
            return $scope.selectedTime === -1 ? 'Select Timing Option' : $scope.times[$scope.selectedTime];
        };

        $scope.selectedTime = -1;

        $scope.times = ['10 Seconds / Question', '20 Seconds / Question', '30 Seconds / Question', '40 Seconds / Question', '50 Seconds / Question', '60 Seconds / Question', 'Competition Timing'];

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