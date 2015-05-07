'use strict';

(function() {
    
	// Items Controller Spec
	describe('Items Controller Tests', function() {
		// Initialize global variables
		var ItemsController,
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
		beforeEach(inject(function($controller, $rootScope, _$location_, _$stateParams_, _$httpBackend_,_Socket_) {
			// Set a new global scope
			scope = $rootScope.$new();
			
			var authentication = {user: {_id:'123123123'}};
		
		    
			// Point global variables to injected services
			$stateParams = _$stateParams_;
			$httpBackend = _$httpBackend_;
			$location = _$location_;
	
			// Initialize the Items controller.
			ItemsController = $controller('ItemsController', {
				$scope: scope,
				Authentication:authentication
			});
		}));
		
		it('should expose the authentication service', function() {
			expect(scope.authentication).toBeTruthy();
		});
		
        it('checkIfUserExists() should redirect to signin page without valid user', function() {
			scope.authentication.user = ''
            scope.checkIfUserExists();
			expect($location.url()).toBe('/signin');
		});
		
		 it('checkIfUserExists should remain on items page if user exists', function() {
			// Test expected GET request
			
		    scope.authentication.user = 'Fred'
            scope.checkIfUserExists();

			expect($location.url()).toBe('/items');
		});
		
        describe('Socket Implementation', function() {
            
         
            
            it('scope.appendItem(item) should add the passed in item to scope.items', inject(function(Items) {
            
				var old_item = new Items({
                    _id: '525cf20451979dea2c000001',
                    name: 'New Item'
                });	
                
                var updated_item = new Items({ 
                    _id : '525cf20451979dea2c000001',
                    name : 'New Item', 
                    } );	

                var items = [updated_item];

                scope.appendItem(old_item);
                
                expect(scope.items.length).toEqual(items.length);
			
		    }));
		  
		    
		    
		     it('scope.deleteItem(item) should remove the passed in item from scope.items', inject(function(Items) {
                
				var item = new Items({
                    _id: '525cf20451979dea2c000001',
                    name: 'New Item'
                });	
              

                scope.items = [item];

                scope.deleteItem(item);
                
                expect(scope.items).toEqual([]);
			
		    }));
		    
		    it('scope.updateItem(item) should set the associated scope item to the passed in item', inject(function(Items) {
                
				var old_item = new Items({
                    _id: '525cf20451979dea2c000001',
                    name: 'New Item',
                    inCart: false,
                    favorite:false,
                    bought:false
                });	
                
                var new_item = new Items({
                    _id: '525cf20451979dea2c000001',
                    name: 'New Item',
                    inCart: true,
                    favorite:true,
                    bought:false
                });	
                
              

                scope.items = [old_item];

                scope.updateItem(new_item);
                
                expect(scope.items[0].name).toEqual(new_item.name);
                expect(scope.items[0].inCart).toEqual(new_item.inCart);
                expect(scope.items[0].favorite).toEqual(new_item.favorite);
                expect(scope.items[0].bought).toEqual(new_item.bought);
			
		    }));
            
        });
		it('$scope.find() should create an array with at least one Item object fetched from XHR', inject(function(Items) {
			// Create sample Item using the Items service
			var sampleItem = new Items({
				name: 'New Item'
			});

			// Create a sample Items array that includes the new Item
			var sampleItems = [sampleItem];

			// Set GET response
			$httpBackend.expectGET('items').respond(sampleItems);

			// Run controller functionality
			scope.find();
			$httpBackend.flush();

			// Test scope value
			expect(scope.items).toEqualData(sampleItems);
		}));

		it('$scope.findOne() should create an array with one Item object fetched from XHR using a itemId URL parameter', inject(function(Items) {
			// Define a sample Item object
			var sampleItem = new Items({
				name: 'New Item'
			});

			// Set the URL parameter
			$stateParams.itemId = '525a8422f6d0f87f0e407a33';

			// Set GET response
			$httpBackend.expectGET(/items\/([0-9a-fA-F]{24})$/).respond(sampleItem);

			// Run controller functionality
			scope.findOne();
			$httpBackend.flush();

			// Test scope value
			expect(scope.item).toEqualData(sampleItem);
		}));

		it('$scope.create() with valid form data should send a POST request with the form input values and then locate to new object URL', inject(function(Items) {
			// Create a sample Item object
			var sampleItemPostData = new Items({
				name: 'New Item'
			});

			// Create a sample Item response
			var sampleItemResponse = new Items({
				_id: '525cf20451979dea2c000001',
				name: 'New Item'
			});

			// Fixture mock form input values
			scope.name = 'New Item';

			// Set POST response
			$httpBackend.expectPOST('items', sampleItemPostData).respond(sampleItemResponse);

			// Run controller functionality
			scope.create(sampleItemPostData.name);
			$httpBackend.flush();

			// Test form inputs are reset
			expect(scope.name).toEqual('');

			// Test URL redirection after the Item was created
			//expect($location.path()).toBe('/items/' + sampleItemResponse._id);
		}));
		
		it('$scope.create() withoutut name should not post', inject(function(Items) {
			// Create a sample Item object
			var sampleItemPostData = new Items({
				name: ''
			});

			// Run controller functionality
			scope.create(sampleItemPostData.name);
			

			
		}));

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

			// Test URL location to new object
			//expect($location.path()).toBe('/items/' + sampleItemPutData._id);
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
		
		it('$scope.favorite() should change the favorite status of the item and call the update function', inject(function(Items) {
			// Create new Item object
			var notFavoriteToFavorite = new Items({
				_id: '525a8422f6d0f87f0e407a33',
				favorite:false
			});
            
            var favoriteToNotFavorite = new Items({
				_id: '525a8422f6d0f87f0e407a34',
				favorite:true
			});
			
			spyOn(scope, 'update');
	
			// Run controller functionality
			scope.favorite(notFavoriteToFavorite);
			
			scope.favorite(favoriteToNotFavorite);
			
			
			

			// Test array after successful delete
			expect(notFavoriteToFavorite.favorite).toBe(true);
			
			expect(favoriteToNotFavorite.favorite).toBe(false);
			
			expect(scope.update).toHaveBeenCalled();
			
		}));
		
		it('$scope.addToCart() should change the cart status of the item and call the update function', inject(function(Items) {
			// Create new Item object
			var addToCart = new Items({
				_id: '525a8422f6d0f87f0e407a33',
				inCart:false
			});
            
            var removeFromCart = new Items({
				_id: '525a8422f6d0f87f0e407a34',
				inCart:true
			});
			
			spyOn(scope, 'update')
	
			// Run controller functionality
			scope.addToCart(addToCart);
			
			scope.addToCart(removeFromCart);
			

			// Test array after successful delete
			expect(addToCart.inCart).toBe(true);
			
			expect(removeFromCart.inCart).toBe(false);
		}));
		
		it('$scope.clearCart() should change all items that are in cart to bought and call update function for each one', inject(function(Items) {
		// Create new Item object
			var inCart_1 = new Items({
				_id: '525a8422f6d0f87f0e407a33',
				inCart:true,
				bought:false
			});
            
            var inCart_2 = new Items({
				_id: '525a8422f6d0f87f0e407a34',
				inCart:true,
				bought:false
			});
			
			spyOn(scope, 'update')
			
			scope.items = [inCart_1,inCart_2];
			
	
	
			// Run controller functionality
			scope.clearCart();
			

			// Test array after successful delete
			
			expect(scope.items[0].bought).toBe(true);
			expect(scope.items[1].bought).toBe(true);
		}));
		
		
	});
	


	
}());


//Socket Mock
var io = {
  connect: createMockSocketObject
};

function createMockSocketObject () {

  var socket = {
    on: function (ev, fn) {
      (this._listeners[ev] = this._listeners[ev] || []).push(fn);
    },
    once: function (ev, fn) {
      (this._listeners[ev] = this._listeners[ev] || []).push(fn);
      fn._once = true;
    },
    emit: function (ev, data) {
      if (this._listeners[ev]) {
        var args = arguments;
        this._listeners[ev].forEach(function (listener) {
          if (listener._once) {
            this.removeListener(ev, listener);
          }
          listener.apply(null, Array.prototype.slice.call(args, 1));
        }.bind(this));
      }
    },
    _listeners: {},
    removeListener: function (ev, fn) {
      if (fn) {
        var index = this._listeners[ev].indexOf(fn);
        if (index > -1) {
          this._listeners[ev].splice(index, 1);
        }
      } else {
        delete this._listeners[ev];
      }
    },
    removeAllListeners: function (ev) {
      if (ev) {
        delete this._listeners[ev];
      } else {
        this._listeners = {};
      }
    },
    disconnect: function () {},
    connect: function () {}
  };

  return socket;
}
