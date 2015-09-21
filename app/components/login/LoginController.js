'use strict';

angularModule.controller('LoginController', function($scope, $location, $localStorage, apiFactory) {   

    $scope.sessionOpen = function() {
        if(apiFactory.session()) {
            window.location = "#/admin";
        }
    }

    $scope.signin = function() {
        var loginData = {
            userName: $scope.email,
            password: $scope.password
        }

        apiFactory.login(loginData).then(
            function (response) {
                var data = [];
                $.map( response.data, function( value, key ) {
                    data[key] = value;
                });
                $localStorage.token = data['access_token'];
                $localStorage.expires = data['.expires'];
                $localStorage.userName = data['userName'];

                window.location = "#/admin";
            },
            function (errorResponse) {
                console.log("error haciendo login", errorResponse);
                alert("error haciendo login", errorResponse);
            }
        );
    }; 
    
})