angular.module('inspinia')
  .controller('navigationController', function ($scope,$rootScope) {

  	var queryMenu = ParseService.query('Service');
        queryMenu.equalTo('client', $rootScope.session);
        queryMenu.equalTo('type', 'custom');
        queryMenu.find()
            .then(function (menu_) {
              console.log(menu_);

              $rootScope.menus = menu_;
              console.log($scope);
              $scope.$apply();


            })

 
  });
