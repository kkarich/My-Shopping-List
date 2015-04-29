'use strict';

(function() {
	// Favorites Controller Spec
	describe('Favorites Controller Tests', function() {
		// Initialize global variables
		var FavoritesController,
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

			// Initialize the Favorites controller.
			FavoritesController = $controller('FavoritesController', {
				$scope: scope
			});
		}));

		it('$scope.find() should create an array with at least one Favorite Item object defaulted to addToList = true', inject(function(Items) {
			// Create sample Item using the Items service
			var sampleItem = new Items({
				name : 'New Item', 
				favorite : true, 
				addToList : false
			});

			// Create a sample Items array that includes the new Item
			var sampleItems = [sampleItem];

			// Set GET response
			$httpBackend.expectGET('favorites').respond(sampleItems);

			// Run controller functionality
			scope.find();
			$httpBackend.flush();

			// Test scope value
		
			expect(scope.favorites[0].addToList).toEqual(true)
			
		}));
        
        	it('$scope.addToList() with valid form data should send a PUT request with the form input values and then locate to new object URL', inject(function(Items) {
			
			var sampleItem_1 = new Items({
				_id: '525cf20451979dea2c000001',
				name: 'New Item',
				bought:true,
				inCart:true,
				addToList:true
			});
			
			var sampleItem_2 = new Items({
				_id: '525cf20451979dea2c000002',
				name: 'New Item',
				bought:true,
				inCart:false,
				addToList:true
			});
			
			var sampleItem_3 = new Items({
				_id: '525cf20451979dea2c000003',
				name: 'New Item',
				bought:false,
				inCart:false,
				addToList:true
			});
			
				var sampleItem_4 = new Items({
				_id: '525cf20451979dea2c000004',
				name: 'New Item',
				bought:false,
				inCart:false,
				addToList:true
			});
			
			var sampleItem_5 = new Items({
				_id: '525cf20451979dea2c000004',
				name: 'New Item',
				bought:true,
				inCart:true,
				addToList:false
			});
			
			var sampleItem_1 = new Items({
				_id: '525cf20451979dea2c000001',
				name: 'New Item',
				bought:true,
				inCart:true,
				addToList:true
			});
			
			var sampleItem_2 = new Items({
				_id: '525cf20451979dea2c000002',
				name: 'New Item',
				bought:true,
				inCart:false,
				addToList:true
			});
			
			var sampleItem_3 = new Items({
				_id: '525cf20451979dea2c000003',
				name: 'New Item',
				bought:false,
				inCart:false,
				addToList:true
			});
			
				var sampleItem_4 = new Items({
				_id: '525cf20451979dea2c000004',
				name: 'New Item',
				bought:false,
				inCart:false,
				addToList:true
			});
			
			var sampleItem_5 = new Items({
				_id: '525cf20451979dea2c000004',
				name: 'New Item',
				bought:true,
				inCart:true,
				addToList:false
			});

		
            scope.favorites = [sampleItem_1,sampleItem_2,sampleItem_3,sampleItem_4,sampleItem_5];
			
			// Set PUT response for each item with addToList == true
			$httpBackend.expectPUT(/items\/([0-9a-fA-F]{24})$/).respond();
            $httpBackend.expectPUT(/items\/([0-9a-fA-F]{24})$/).respond();
            $httpBackend.expectPUT(/items\/([0-9a-fA-F]{24})$/).respond();
            $httpBackend.expectPUT(/items\/([0-9a-fA-F]{24})$/).respond();
        
            
			// Run controller functionality
			scope.addToList();
			$httpBackend.flush();
		    
		    //every item with addToList ==true should have bought = false and inCarrt = false
            expect(scope.favorites[0].bought).toEqual(false);
			expect(scope.favorites[0].inCart).toEqual(false);
			
			expect(scope.favorites[1].bought).toEqual(false);
			expect(scope.favorites[1].inCart).toEqual(false);
			
			expect(scope.favorites[2].bought).toEqual(false);
			expect(scope.favorites[2].inCart).toEqual(false);
			
			expect(scope.favorites[3].bought).toEqual(false);
			expect(scope.favorites[3].inCart).toEqual(false);
			
			//Last item with addToList == false should remain unchanged
			expect(scope.favorites[4].bought).toEqual(true);
			expect(scope.favorites[4].inCart).toEqual(true);
			
			
		}));
		
		it('$scope.checkAddToList() should reverse addToList value', inject(function(Items) {
			// Define a sample Item put data
			var sampleItemPutData = new Items({
				_id: '525cf20451979dea2c000001',
				name: 'New Item',
				addToList:true
			});

			// Mock Item in scope
			var item = sampleItemPutData;

			// Run controller functionality
			scope.checkAddToList(item);
			
			expect(item.addToList).toEqual(false);
			
			scope.checkAddToList(item);
			
			expect(item.addToList).toEqual(true);

			
		}));
       /*
		it('$scope.update() should update a valid Item', inject(function(Items) {
			// Define a sample Item put data
			var sampleItemPutData = new Items({
				_id: '525cf20451979dea2c000001',
				name: 'New Item'
			});

			// Mock Item in scope
			var item = sampleItemPutData;

			// Set PUT response
			$httpBackend.expectPUT(/items\/([0-9a-fA-F]{24})$/).respond();

			// Run controller functionality
			scope.update(item);
			$httpBackend.flush();

			
		}));
           
		it('$scope.remove() should send a DELETE request with a valid itemId and remove the Item from the scope', inject(function(Items) {
			// Create new Item object
			var sampleItem = new Items({
				_id: '525a8422f6d0f87f0e407a33'
			});

			// Create new Items array and include the Item
			scope.items = [sampleItem];

			// Set expected DELETE response
			$httpBackend.expectDELETE(/items\/([0-9a-fA-F]{24})$/).respond(204);

			// Run controller functionality
			scope.remove(sampleItem);
			$httpBackend.flush();

			// Test array after successful delete
			expect(scope.items.length).toBe(0);
		}));
        */

	
	});
}());