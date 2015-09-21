'use strict';

/* Controllers */

angularModule.controller('JobsController', function($rootScope, $scope, $location, $localStorage, apiFactory) {

	$scope.token = $localStorage.token;

	$scope.views = {};
	$scope.views.list = true;

	$scope.jobs = [];
	$scope.contacts = [];
	$scope.formData = {};

    $scope.initMap = function () {
    	$scope.map = { 
			center: { latitude: 8.97, longitude: -79.52 },
			zoom: 10,
			markers: [],
			events: { 
				click: function (thisMap, nameEvent, arg) {
					$scope.placeMarker(arg[0].latLng, 1);
			    }
	    	}
	    };
    };

    $scope.refreshMarkers = function (jobs) {
    	var mks = [];
    	for(var index in jobs) {
    		var marker = {
    			id : jobs[index].ID,
				latitude: jobs[index].Lat,
				longitude: jobs[index].Lng,
				title: jobs[index].Name
    		}
    		mks.push(marker); 		
    	}
    	$scope.mapMarkers = mks;
    };

    $scope.placeMarker = function (location, index) {
    	if($scope.views.add) {
    		$scope.formData.Lat = location.lat();
    		$scope.formData.Lng = location.lng();
    		var marker = {
    			id : index,
				latitude: location.lat(),
				longitude: location.lng(),
				title: "Nueva Tarea"
    		}
    		$scope.mapMarkers.push(marker);
    		$scope.$apply();
    	}
    };

	$scope.loadContacts = function () {
		apiFactory.getData('api/contacts').then(
			function (response) {
				$scope.contacts = [];
	        	for(var ind in response.data) {        		
	        		$scope.contacts.push(response.data[ind]);
	        	}
			},
			function (errorResponse) {
				$rootScope.error = 'error cargando contactos';
			}
		);
	};

	$scope.loadJobs = function () {
		apiFactory.getData('api/jobs').then(
			function (response) {
				$scope.jobs = [];
	        	for(var ind in response.data) {        		
	        		$scope.jobs.push(response.data[ind]);
	        	}
	        	$scope.refreshMarkers($scope.jobs);       	
			},
			function (errorResponse) {
				console.log("error cargando tareas", errorResponse);
			}
		);
	};

	$scope.submitForm = function (formData) {
	    var data = JSON.stringify(formData);
	    if($scope.views.add) {
		    apiFactory.postData('api/jobs', data).then(
				function (response) {
		        	console.log("add", response);
		        	$scope.viewListJobs();
				},
				function (errorResponse) {
					console.log("error agregando tarea", errorResponse);
				}
			);
		} else {
			apiFactory.putData('api/jobs', data).then(
				function (response) {
		        	console.log("add", response);
		        	$scope.viewListJobs();
				},
				function (errorResponse) {
					console.log("error editando tarea", errorResponse);
				}
			);
		}
	};

	$scope.removeJob = function (index) {
		$scope.jobs.splice(index, 1);
		$scope.refreshMarkers();
	};

	$scope.viewListJobs = function () {
		$scope.loadJobs();
		$scope.refreshMarkers();
		$scope.views.list = true;
	    $scope.views.add = false;
	    $scope.views.edit = false;		
	};

	$scope.viewAddJob = function () {
		$scope.loadContacts();
		$scope.formData = {};
		$scope.mapMarkers = [];
		$scope.views.list = false;
	    $scope.views.add = true;
	    $scope.views.edit = false;		
	};

	$scope.editJob = function (index) {
		$scope.loadContacts();
		$scope.formData = $scope.jobs[index];
		$scope.mapMarkers = [];
		$scope.views.list = false;
	    $scope.views.add = false;
	    $scope.views.edit = true;	
	};
})