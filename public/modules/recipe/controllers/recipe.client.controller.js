'use strict';

angular.module('recipe').controller('RecipeController', ['$scope','Items',
	function($scope,Items) {
        $scope.convertRecipe= function() {
			var items = $scope.recipe.split('\n');

            for(var i in items){
                var item = new Items ({
                    name: items[i].trim()
                });
                item.$save(function(response) {
                    
                }, function(errorResponse) {
                    $scope.error = errorResponse.data.message;
			    });
                $scope.recipe = '';
		    };

		};
	}
]);