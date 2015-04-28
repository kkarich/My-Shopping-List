'use strict';

(function() {
	// Recipe Controller Spec
	describe('Recipe Controller Tests', function() {
		// Initialize global variables
		var RecipeController,
			scope,
			$httpBackend,
			$stateParams,
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

			// Point global variables to injected services
			$stateParams = _$stateParams_;
			$httpBackend = _$httpBackend_;
			$location = _$location_;

			// Initialize the Recipe controller.
			RecipeController = $controller('RecipeController', {
				$scope: scope
			});
		}));

		it('Should split recipe into items by "carrage return" and send POST request for each item', inject(function(Items) {
		    
            scope.recipe = "item 1 \n item 2 \n item 3";
            
            var sampleItemPostData1 = new Items({
				name: 'item 1'
			});
			
			var sampleItemPostData2 = new Items({
				name: 'item 2'
			});
			
			var sampleItemPostData3 = new Items({
				name: 'item 3'
			});
			
			var sampleItemResponse1 = new Items({
				_id: '525cf20451979dea2c000001',
				name: 'item 1'
			});
			
			var sampleItemResponse2 = new Items({
				_id: '525cf20451979dea2c000002',
				name: 'item 2'
			});
			
			var sampleItemResponse3 = new Items({
				_id: '525cf20451979dea2c000003',
				name: 'item 3'
			});
            
           
            
            $httpBackend.expectPOST('items', sampleItemPostData1).respond(sampleItemResponse1);
            $httpBackend.expectPOST('items', sampleItemPostData2).respond(sampleItemResponse2);
            $httpBackend.expectPOST('items', sampleItemPostData3).respond(sampleItemResponse3);
            
            scope.convertRecipe();
            $httpBackend.flush();
            
            expect(scope.recipe).toEqual('');
		}));
	});
}());