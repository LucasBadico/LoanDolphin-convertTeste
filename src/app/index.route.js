(function() {
  'use strict';
    
  angular
    .module('inspinia')
    .config(routerConfig);
	
//angular.module('inspinia')
//		.config(['uiMask.ConfigProvider', function(uiMaskConfigProvider) {
////  uiMaskConfigProvider.maskDefinitions({'A': /[a-z]/, '*': /[a-zA-Z0-9]/});
//  	uiMaskConfigProvider.modelViewValue(true);
////  uiMaskConfigProvider.eventsToHandle(['input', 'keyup', 'click']);
//}])

  /** @ngInject */
  function routerConfig($stateProvider, $urlRouterProvider) {
	  
    $stateProvider
	 .state('index', {
        abstract: true,
        url: "/index",
        templateUrl: "app/components/common/content.html",
        //controller:"navigationController",
        authRequired: false
      })
		.state('index.main', {
			url: "/main",
			templateUrl: "app/main/main.html",
			data: { pageTitle: 'Example view' },
			authRequired: false,
			controller: 'MainController as main'
		  })
		.state('index.clientes', {
        url: "/clientes/:id",
        templateUrl: "app/clientes/clientes.html",
        params: { 
            // here we define default value for foo
            // we also set squash to false, to force injecting
            // even the default value into url
              id: {
                value: 'undefined',
                squash: false,
              },
          // this param is not part of url
        // it could be passed with $state.go or ui-sref 
        hiddenParam: 'YES'

       },
        data: { pageTitle: 'Clientes' },
        authRequired: false,
        controller: 'ClientesController'
      })
	  .state('index.report', {
        url: "/conversor",
        templateUrl: "app/report/report.html",
        data: { pageTitle: 'Conversão' },
        authRequired: true,
        controller: 'ConvertController'
      })


    $urlRouterProvider.otherwise('/index/main');
  }

})();
