'use strict';

angular.module('side-nav').controller('SideNavController', ['$scope', '$modal',
	function($scope,$modal) {
		// Side nav controller logic
		// ...
		
	$scope.openProfile = function () {

        var modalInstance = $modal.open({
          templateUrl: '/modules/users/views/settings/edit-profile.client.view.html',
          controller: 'SettingsController'
        });
	};
		
    $scope.openRecipe = function () {

        var modalInstance = $modal.open({
          templateUrl: '/modules/recipe/views/recipe.client.view.html',
          controller: 'RecipeController'
        });
	};
	
	 $scope.openFavorites = function () {

        var modalInstance = $modal.open({
          templateUrl: '/modules/items/views/favorites.client.view.html',
          controller: 'FavoritesController'
        });
	};

		
	}
]);