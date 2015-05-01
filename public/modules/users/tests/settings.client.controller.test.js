'use strict';

(function() {
	// Settings Controller Spec
	describe('Settings Controller Tests', function() {
		// Initialize global variables
		var SettingsController,
			scope,
			$httpBackend,
			$stateParams,
			modalInstance,
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
			
			 modalInstance = {                    // Create a mock object using spies
                    close: jasmine.createSpy('modalInstance.close'),
                    dismiss: jasmine.createSpy('modalInstance.dismiss'),
                    result: {
                      then: jasmine.createSpy('modalInstance.result.then')
                    }
			    }

			// Point global variables to injected services
			$stateParams = _$stateParams_;
			$httpBackend = _$httpBackend_;
			$location = _$location_;

			// Initialize the Settings controller.
			SettingsController = $controller('SettingsController', {
				$scope: scope,
				$modalInstance: modalInstance
			});
		}));

		it('Should do some controller test', inject(function() {
			// The test logic
			// ...
		}));
		
		it('cancel() Should dismiss modal', inject(function(Items) {
		     scope.cancel()
			// Define a sample Item put data
		    expect(modalInstance.dismiss).toHaveBeenCalledWith('cancel');

          
		}));
		
	});
}());