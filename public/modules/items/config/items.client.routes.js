'use strict';

//Setting up route
angular.module('items').config(['$stateProvider',
	function($stateProvider) {
		// Items state routing
		$stateProvider.
		state('listItems', {
			url: '/items',
			templateUrl: 'modules/items/views/list-items.client.view.html'
		});
	}
]);