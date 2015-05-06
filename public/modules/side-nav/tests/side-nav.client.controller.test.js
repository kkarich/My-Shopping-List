'use strict';

(function() {
	// Side nav Controller Spec
	describe('Side nav Controller Tests', function() {
		// Initialize global variables
		var SideNavController,
			scope,
			$httpBackend,
			$stateParams,
			modal,
			$location;

		// The $resource service augments the response object with methods for updating and deleting the resource.
		// If we were to use the standard toEqual matcher, our tests would fail because the test values would not match
		// the responses exactly. To solve the problem, we define a new toEqualData Jasmine matcher.
		// When the toEqualData matcher compares two objects, it takes only object properties into
		// account and ignores methods.
		beforeEach(function() {
			jasmine.addMatchers({
				toEqualData: function(util, customEqualityTesters) {
					return {
						compare: function(actual, expected) {
							return {
								pass: angular.equals(actual, expected)
							};
						}
					};
				}
			});
		});

		// Then we can start by loading the main application module
		beforeEach(module(ApplicationConfiguration.applicationModuleName));

		// The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
		// This allows us to inject a service but then attach it to a variable
		// with the same name as the service.
		beforeEach(inject(function($controller, $rootScope, _$location_, _$stateParams_, _$httpBackend_) {
			// Set a new global scope
			scope = $rootScope.$new();
			
			modal = jasmine.createSpyObj('modal', ['show', 'hide','open']);

			// Point global variables to injected services
			$stateParams = _$stateParams_;
			$httpBackend = _$httpBackend_;
			$location = _$location_;

			// Initialize the Side nav controller.
			SideNavController = $controller('SideNavController', {
				$scope: scope,
				$modal:modal
			});
		}));
		
		it('toggle() should reverse scope.open', inject(function() {
		    
		  scope.open = false;
		  
		  scope.toggle();
		  
		  expect(scope.open).toBe(true);
		  
		  scope.toggle();
		  
		  expect(scope.open).toBe(false);
			
		}));
		

		it('openProfile() Should open user profile in modal', inject(function() {
		    
		  var modalInstance = {
                  templateUrl: '/modules/users/views/settings/edit-profile.client.view.html',
                  controller: 'SettingsController'
                };
			scope.openProfile();
			expect(modal.open).toHaveBeenCalledWith(modalInstance);
			
		}));
		
		it('openRecipe() Should open recipe modal', inject(function() {
			// The test logic
			// ...
			
			  var modalInstance = {
                  templateUrl: '/modules/recipe/views/recipe.client.view.html',
                  controller: 'RecipeController'
                };
			scope.openRecipe();
			expect(modal.open).toHaveBeenCalledWith(modalInstance);
		}));
		
		it('openFavorites() Should open favorites modal', inject(function() {
			// The test logic
			// ...
			
			 var modalInstance = {
                  templateUrl: '/modules/items/views/favorites.client.view.html',
                  controller: 'FavoritesController'
                };
			
			scope.openFavorites();
			expect(modal.open).toHaveBeenCalledWith(modalInstance);
		}));
	});
}());