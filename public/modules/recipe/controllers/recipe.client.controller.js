'use strict';

angular.module('recipe').controller('RecipeController', ['$scope','Items','$modalInstance',
	function($scope,Items,$modalInstance) {
        $scope.convertRecipe= function() {
            
            var items = [];
            if($scope.recipe)
                items = $scope.recipe.split('\n');
                
                
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
		    
		    $modalInstance.close();

		};
		
		$scope.cancel = function(){
		
            $modalInstance.dismiss('cancel');
            
		};
	}
]);