'use strict';

// Challenge module config
angular.module('challenge').run(['Menus',
	function(Menus) {
        Menus.addMenuItem('topbar', 'Challenge', 'challenge', 'item');
	}
]);