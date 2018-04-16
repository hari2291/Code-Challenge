
/* 
	Create the module and inject ngRoute dependency.
*/

var app = angular.module('myTableApp',['ngRoute']);

/* 
	Routing logic. Although we have just one URL, it is important to assume that the application would be enhanced in the future and make room for the same.
*/

app.config(['$routeProvider','$locationProvider', function($routeProvider,$locationProvider){
	$routeProvider
		.when('/viewTable', {
			templateUrl : 'components/table/table.html',
			controller : 'TableController',
			controllerAs : 'vm'
		})
		.otherwise({
			redirectTo:'/viewTable'
		});
	$locationProvider.html5Mode(true);
}]);