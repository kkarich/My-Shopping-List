'use strict';

// Items controller
angular.module('items').controller('ItemsController', ['$scope', '$stateParams', '$location', 'Authentication','$filter', 'Items','Socket',
	function($scope, $stateParams, $location, Authentication,$filter, Items,Socket) {
		$scope.authentication = Authentication;
		
		
		
		$scope.checkIfUserExists = function(){
		    if (!$scope.authentication.user) $location.path('/signin');
		};
		
		$scope.checkIfUserExists();
		//If user is not logged in, redirect to signin page
		
		
		
		$scope.items = [];
		
		$scope.appendItem = function(item){
		    var resource = new Items();
		    var updated_item = angular.copy( item, resource);
		    console.log(updated_item)
            $scope.items.push(updated_item);
        };
        
        $scope.updateItem = function(item){
       
           
            var resource = new Items();
            console.log(resource)
            var oldItem = $filter('filter')($scope.items, {_id:item._id})[0];
            var index = $scope.items.indexOf(oldItem);
           
            $scope.items[index] = angular.copy( item, resource)
            console.log($scope.items[index])
            
        };
        
        $scope.deleteItem = function(item){
           
            var index = $scope.items.indexOf(item);
            $scope.items.splice(index,1);
        };
          
            
		
		Socket.on('item.created', function(item) {
            $scope.appendItem(item);
        });
        
        Socket.on('item.updated', function(item) {
            $scope.updateItem(item);
        });
		
		

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
		    item.$update();

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
		    console.log('test')
			var itemsInCart = $filter('filter')($scope.items, {inCart:true, bought:false});
		
			for(var i in itemsInCart){
                itemsInCart[i].bought = true;
                $scope.update(itemsInCart[i]);
                console.log('bought',itemsInCart[i])
			}
			
			
		};
		
		
		
	}
]);