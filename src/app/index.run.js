(function() {
  'use strict';

  angular
    .module('inspinia')
    .run(runBlock)
    

  /** @ngInject */
  function runBlock($log,$rootScope) {
    $log.debug('runBlock end');

    
  }


})();
