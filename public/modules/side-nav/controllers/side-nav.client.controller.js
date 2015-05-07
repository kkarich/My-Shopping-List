'use strict';

angular.module('side-nav').controller('SideNavController', ['$scope', '$modal', '$window',
	function($scope,$modal, $window) {
		// Side nav controller logic
		// ...
	//init open based on screan size
    $scope.open = false;



    $scope.toggle = function(){
        $scope.open = !$scope.open;
    };
		
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