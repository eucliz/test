'use strict';

angularModule.controller('HeaderController', function($rootScope, $scope, $location, $localStorage, apiFactory) {      

    $scope.session = function() {
        if(!apiFactory.session()) {
            window.location = "#/";
        }
    }

    $scope.logout = function() {
        apiFactory.logout(function() {
            window.location = "#/"
        }, function() {
            alert("Failed to logout!");
        });
    };

})