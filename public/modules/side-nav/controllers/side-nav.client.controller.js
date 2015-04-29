'use strict';

angular.module('side-nav').controller('SideNavController', ['$scope', '$modal',
	function($scope,$modal) {
		// Side nav controller logic
		// ...
		
    $scope.openRecipe = function (size) {

        var modalInstance = $modal.open({
          templateUrl: '/modules/recipe/views/recipe.client.view.html',
          controller: 'RecipeController',
          size: size
        });
	};
	
	 $scope.openFavorites = function (size) {

        var modalInstance = $modal.open({
          templateUrl: '/modules/items/views/favorites.client.view.html',
          controller: 'FavoritesController',
          size: size
        });
	};

		
	}
]);