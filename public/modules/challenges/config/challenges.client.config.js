'use strict';

// Configuring the Articles module
angular.module('challenges').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('topbar', 'Challenges', 'challenges', 'item', '/challenges(/create)?');
	}
]);