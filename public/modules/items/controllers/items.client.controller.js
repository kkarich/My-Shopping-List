'use strict';

// Items controller
angular.module('items').controller('ItemsController', ['$scope', '$stateParams', '$location', 'Authentication','$filter', 'Items',
	function($scope, $stateParams, $location, Authentication,$filter, Items) {
		$scope.authentication = Authentication;

		// Create new Item
		$scope.create = function(name) {
			// Create new Item object
			var item = new Items ({
				name: name
			});

			// Redirect after save
			item.$save(function(response) {
				// Clear form fields
				$scope.name = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing Item
		$scope.remove = function(item) {
			if ( item ) { 
				item.$remove();

				for (var i in $scope.items) {
					if ($scope.items [i] === item) {
						$scope.items.splice(i, 1);
					}
				}
			} else {
				$scope.item.$remove(function() {
					$location.path('items');
				});
			}
		};

		// Update existing Item
		$scope.update = function(item) {
		

			item.$update(function() {
			
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Items
		$scope.find = function() {
			$scope.items = Items.query();
		};

		// Find existing Item
		$scope.findOne = function() {
			$scope.item = Items.get({ 
				itemId: $stateParams.itemId
			});
		};
		
		// Favorite item
		$scope.favorite = function(item) {
			item.favorite = !item.favorite;
			$scope.update(item);
		};
		
		//Add item to cart
		$scope.addToCart = function(item) {
			item.inCart = !item.inCart;
			$scope.update(item);
		};
		
		//Clear Cart
		$scope.clearCart = function() {
			var itemsInCart = $filter('filter')($scope.items, {inCart:true, bought:false});
			
			for(var i in itemsInCart){
                itemsInCart[i].bought = true;
                $scope.update(itemsInCart[i]);
			}
			
			
		};
	}
]);