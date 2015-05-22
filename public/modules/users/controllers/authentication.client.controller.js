'use strict';

angular.module('users').controller('AuthenticationController', ['$scope', '$http', '$location', 'Authentication',
	function($scope, $http, $location, Authentication) {
		$scope.authentication = Authentication;
        $scope.credentials = {username:'tryout',password:'tryout2'}
		// If user is signed in then redirect back to the items page 
		if ($scope.authentication.user) $location.path('/items');

		$scope.signup = function() {
			$http.post('/auth/signup', $scope.credentials).success(function(response) {
				// If successful we assign the response to the global user model
				$scope.authentication.user = response;

				// And redirect to the items page
				$location.path('/items');
			}).error(function(response) {
				$scope.error = response.message;
			});
		};

		$scope.signin = function() {
			$http.post('/auth/signin', $scope.credentials).success(function(response) {
				// If successful we assign the response to the global user model
				$scope.authentication.user = response;

				// And redirect to the items page
				$location.path('/items');
			}).error(function(response) {
				$scope.error = response.message;
			});
		};
	}
]);