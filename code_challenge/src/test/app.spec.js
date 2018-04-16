/*
	The below code tests the TableController
*/

describe('TableController Tests',function(){
	var $controller;

	beforeEach(function(){
		module('ngRoute');
		module('myTableApp');
	});

	beforeEach(inject(function(_$controller_){
    	$controller = _$controller_;
  	}));

	it('should successfully execute the init() method',function(){
		var controller = $controller('TableController');
		expect(controller.categoriesToBeSorted).toEqual([]);
		expect(controller.tableData).not.toBe(null);
	});

	it('should add the category name (column) to the category array, on click of the header',function(){
		var controller = $controller('TableController');
		
		expect(controller.categoriesToBeSorted).toEqual([]);
		
		controller.sortColumn("a");
		expect(controller.categoriesToBeSorted).toEqual(['a']);
	});

	it('should insert the category at the 0th index of category array on subsequent clicks',function(){
		var controller = $controller('TableController');
		
		expect(controller.categoriesToBeSorted).toEqual([]);
		
		controller.sortColumn("d");
		controller.sortColumn("c");

		expect(controller.categoriesToBeSorted).toEqual(['c','d']);


		controller.sortColumn("b");
		controller.sortColumn("a");
		expect(controller.categoriesToBeSorted).toEqual(['a','b','c','d']);
	});

	it('should remove the category from the category array if already present, and insert -<category> at the 0th position of the category array',function(){
		var controller = $controller('TableController');
		
		expect(controller.categoriesToBeSorted).toEqual([]);
		
		controller.categoriesToBeSorted = ['a','b','c','d'];
		controller.sortColumn("d");
		expect(controller.categoriesToBeSorted).toEqual(['-d','a','b','c']); 
	});

	it('should reset the table to the original state and undo all the sorting',function(){
		var controller = $controller('TableController');
		
		controller.resetCategoryList();
		expect(controller.categoriesToBeSorted).toEqual([]); 
	});
});

/*
	The below code tests the tableService factory.
*/

describe('TableService factory tests',function(){
	var tableService;

	beforeEach(function(){
		module('myTableApp');

		inject(function($injector){
      		tableService = $injector.get('tableService');
    	});
	});

	it('should return data from the given source',function(){
		var url = "http://jsonplaceholder.typicode.com/posts";
		var response = tableService.fetchTableData(url);

		expect(response).not.toBe(null);
		expect(response).not.toBe(undefined);
	});
});

/*
	The below code tests the router
*/

describe('Application routing tests', function(){
  var $route, $rootScope, $location;

  beforeEach(function(){
    module('myTableApp');

    inject(function($injector){
      $route = $injector.get('$route');
      $rootScope = $injector.get('$rootScope');
      $location = $injector.get('$location');
    });
  })

  it('should navigate to the viewTable page', function(){
    
    $rootScope.$apply(function() {
      $location.path('/viewTable');
    });
    expect($location.path()).toBe('/viewTable');
    expect($route.current.templateUrl).toBe('components/table/table.html');
    expect($route.current.controller).toBe('TableController');
    expect($route.current.controllerAs).toBe('vm');
  })

  it('should redirect not registered urls to /viewTable', function(){
    
    $rootScope.$apply(function() {
      $location.path('/other');
    });
    expect($location.path()).toBe('/viewTable');
    expect($route.current.templateUrl).toBe('components/table/table.html');
    expect($route.current.controller).toBe('TableController');
    expect($route.current.controllerAs).toBe('vm');
  })
})




