/* global angular */
'use strict';

angularModule.factory('apiFactory', ['$http', '$q', '$localStorage', function ($http, $q, $localStorage){
        var baseUrl = "http://beta.maptasking.com/";

        return {
            logout: function(success) {
                delete $localStorage.token;
                success();
            },
            session: function() {
                if($localStorage.token) {
                    if(Date.parse($localStorage.expires) > Date.parse(Date())) {
                        return true;
                    }
                    return false;
                } else {
                    return false;
                }
            },
            getData: function(url) {
                var deferred = $q.defer();
                $http.get(baseUrl + url,
                {
                    headers: {
                        'Authorization': 'bearer '+$localStorage.token
                    }
                })
                .then(
                    function (response) {               
                        deferred.resolve(response);
                    },
                    function (errorResponse) {
                        deferred.reject(errorResponse);
                    }
                );
                return deferred.promise;
            },
            postData: function(url, data) {
                var deferred = $q.defer();
                $http.post(baseUrl + url, data,
                {
                    headers: {
                        'Authorization': 'bearer '+$localStorage.token
                    }
                })
                .then(
                    function (response) {               
                        deferred.resolve(response);
                    },
                    function (errorResponse) {
                        deferred.reject(errorResponse);
                    }
                );
                return deferred.promise;
            },
            putData: function(url, data) {
                var deferred = $q.defer();
                $http.put(baseUrl + url, data,
                {
                    headers: {
                        'Authorization': 'bearer '+$localStorage.token
                    }
                })
                .then(
                    function (response) {               
                        deferred.resolve(response);
                    },
                    function (errorResponse) {
                        deferred.reject(errorResponse);
                    }
                );
                return deferred.promise;
            },
            login: function (loginData) {
                var deferred = $q.defer();
                var data = "grant_type=password&username=" + loginData.userName + "&password=" + loginData.password;
                $http.post(baseUrl + 'token', data,
                    {
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded'
                        }
                    })
                    .then(
                        function (response) {
                            deferred.resolve(response);
                        },
                        function (errorResponse) {
                            deferred.reject(errorResponse);
                        }
                    );
                return deferred.promise;
            }

        };
    }
]);