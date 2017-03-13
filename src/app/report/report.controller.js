'use strict';

angular
	.module('inspinia')
  	.controller('ConvertController', ConvertController);

  	ConvertController.$inject = ['$scope','$rootScope','$timeout','EventDispatcher','DateService','$http'];

  	function ConvertController($scope,$rootScope,$timeout,EventDispatcher,DateService,$http) {
	    console.log('conversor Controller');
		$scope.coins=[];
		$scope.data = {};
		
		function getData(){
		$http({
			method: 'GET',
			url: 'http://api.fixer.io/latest'
		}).then(function successCallback(response) {
			// this callback will be called asynchronously
			// when the response is available
			console.log('success',response);
		
				
			$timeout(function(){
				$scope.coins = [];
				for (var key in response.data.rates){
					$scope.coins.push(key);
				}
				console.log($scope)
			})
			
		
		  }, function errorCallback(response) {
			// called asynchronously if an error occurs
			// or server returns response with an error status.
			console.log('error',response);
		
		  });
	}
	
	getData();
		
	$scope.getRates = function(){
		$http({
				method: 'GET',
				url: 'http://api.fixer.io/latest?base=' + $scope.data.origem //+ '?symbols=' +$scope.data.destino
			})
			.then(function successCallback(response) {
				// this callback will be called asynchronously
				// when the response is available
				console.log('success proccess',response);


				$timeout(function(){
					$scope.data.rates = response.data.rates
					
				})

		
		  }, function errorCallback(response) {
			// called asynchronously if an error occurs
			// or server returns response with an error status.
			console.log('error',response);
		
		  });
	}
		
	$scope.proccess = function(){
		var origem, destino, result, data;
		
		if($scope.data.origem && $scope.data.destino){
			var result =  $scope.data.valor * $scope.data.rates[$scope.data.destino] + '';
			 var split = result.split('.');
			
			$scope.data.result = $scope.data.destino+ ' ' +$scope.data.valor * $scope.data.rates[$scope.data.destino];
		
//		 	console.log($scope.result)
		}else{
			window.alert('escolha uma origem e um destino');
			
		}
		
		
	}
	}
