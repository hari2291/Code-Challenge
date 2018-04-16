
// Controller for the view that displays the table.

app.controller('TableController',function(tableService){
	
	let vm = this;

	init();

  /*
    The init() function initiallizes the categories list (which we will be using the sort the different colums simultaneously),
    and also calls the function getTableData() in order to plug in the table data into the controller scope.
  */

	function init(){
		vm.categoriesToBeSorted = [];
    getTableData();
	}

  /* 
    The getTableData() function calls the method fetchTableData() of the tableService factory, which in turn makes a http request to the given
     URL in order to fetch the JSON response. The response data is then set added to the scope to be rendered in the view. 
  */

  function getTableData(){
    tableService.fetchTableData()
        .then(function(response){
            vm.tableData = response.data;
        },
        function(error){
            vm.tableData = error.message;
            console.log("There was an error while retrieving the data : "+error.message);
        });
  }

  /*
    sortColumn() is the function that facilitates sorting. 
    categoriesToBeSorted -> An array which stores the statuses of the sorted colums (eg. userId,or -userId). This is constantly udated and added to
    the scope to help the orderBy filter, that is used to filter the table content in the view.
    catIndexAsc -> variable that stotes index of the variable with name = <category>, in the categoriesToBeSorted array.
    catIndexDesc -> variable that stotes index of the variable with name = -<category>, in the categoriesToBeSorted array.
    lastSelectedCategory -> used to display the up arrow (ascending order) or the down arrow (descending order) beside the column headers.

    If the <category> is found in the array, then it will be removed, and "-<category>" would be inserted as the first element, to toggle the sort
    order (i.e. from ascending to descending).

    Else if -<category> is found in the array, it would be similary removed, and <category> would be inserted as the first element, to toggle the
    sort order. (i.e from descending to ascending).

    If both <category>, and -<category aren't present in the array, we insert the category name as the element to sort the table.

    These changes would happen on every click, so that the table is sorted (ascending or descending) according to the values in multiple columns 
    and not just one.

    Sample of how the 
  */

	vm.sortColumn = function (category){
		let catIndexAsc = vm.categoriesToBeSorted.indexOf(category);
		let catIndexDesc = vm.categoriesToBeSorted.indexOf("-"+category);

		if(catIndexAsc != -1){
			vm.categoriesToBeSorted.splice(catIndexAsc,1);
			vm.categoriesToBeSorted.splice(0,0,"-"+category);
		}
		else if(catIndexDesc != -1){
			vm.categoriesToBeSorted.splice(catIndexDesc,1);
			vm.categoriesToBeSorted.splice(0,0,category);
		}
		else{
			vm.categoriesToBeSorted.splice(0,0,category);
		}
		vm.lastSelectedCategory = vm.categoriesToBeSorted[0];
	}

  /*
    The below function will reset the categories list, and hence reset the table as per the original data.
  */

  vm.resetCategoryList = function(){
    vm.categoriesToBeSorted = [];
    vm.lastSelectedCategory = "";
  }
});





