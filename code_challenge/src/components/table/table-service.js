
/* 
	Factory method to retrieve the data from the given source and pass it on to the controller calling it.
*/

app.factory('tableService',function($http){
	let url = "http://jsonplaceholder.typicode.com/posts";
	return {
		fetchTableData : function(){
			return $http.get(url);
		}
	}
})