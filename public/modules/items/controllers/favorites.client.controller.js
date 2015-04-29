'use strict';

angular.module('items').controller('FavoritesController', ['$scope','Items',
	function($scope,Items) {
		// Favorites controller logic
		// ...
		
	    
		
		$scope.find = function(){
		    $scope.favorites = Items.favorites();
            console.log($scope.favorites)
            
            $scope.favorites.$promise.then(function (result) {
                $scope.favorites = result;
                for (var i = 0; i <  $scope.favorites.length; i++) { 
                    
                     $scope.favorites[i].addToList = true;
                    
                    console.log($scope.favorites);
                }
            });
          
                
           
		};
		
		$scope.addToList = function(){
		
            for(var i in $scope.favorites){
                var item = $scope.favorites[i];
                
                if(item.addToList){
                    item.bought = false;
                    item.inCart =false;
                
                    item.$update(function() {
                        }, function(errorResponse) {
				            $scope.error = errorResponse.data.message;
                    });
                }
		    }
            
		};
		
		$scope.checkAddToList = function(item){
		
            item.addToList = !item.addToList;
            
		};
		
	}
]);