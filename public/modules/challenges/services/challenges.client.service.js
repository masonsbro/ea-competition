'use strict';

//Challenges service used to communicate Challenges REST endpoints
angular.module('challenges').factory('Challenges', ['$resource',
	function($resource) {
		return $resource('/challenges/:challengeId', {challengeId: '@id'}, {update: {method: 'PUT'}});
	}
]);