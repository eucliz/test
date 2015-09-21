'use strict';

angularModule.controller('AdminController', function($rootScope, $scope, $localStorage) {
	
    $scope.dataAdmin = function() {
        $scope.token = $localStorage.token;
	    $scope.userName = $localStorage.userName;
	    $scope.expires = $localStorage.expires;
    }

})