'use strict';

angular.module('inspinia')
  .controller('ClientesController', function ($rootScope,$scope,$stateParams,$http,$timeout) {
    
	$scope.params = {
			id : $stateParams.id,
		};
	
	if($stateParams.id != 'undefined'){
		$scope.filterId =  $stateParams.id;
	}
	console.log($scope.params);
	$scope.user =[];
	$scope.page = 1;
	
	
	$scope.next= function(){
		$scope.page++;
		getData();
	}	
	
	$scope.prev = function(){
		if($scope.page == 1){
			return false;
		}
		$scope.page--;
		getData();
	}
	
	function getData(){
		$http({
			method: 'GET',
			url: 'https://reqres.in/api/user?page='+$scope.page
		}).then(function successCallback(response) {
			// this callback will be called asynchronously
			// when the response is available
			console.log('success',response);
		
			$timeout(function(){
				$scope.user = response;
				
			})
		
		  }, function errorCallback(response) {
			// called asynchronously if an error occurs
			// or server returns response with an error status.
			console.log('error',response);
		
		  });
	}
	
	getData();
  });
