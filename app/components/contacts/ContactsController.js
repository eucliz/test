'use strict';

/* Controllers */

angularModule.controller('ContactsController', function($rootScope, $scope, $location, $localStorage, apiFactory) {

	$scope.views = {};
	$scope.views.list = true; 

	$scope.formData = {};
	$scope.contacts = [];

	$scope.loadContacts = function () {
		apiFactory.getData('api/contacts').then(
			function (response) {
				$scope.contacts = [];
	        	for(var ind in response.data) {        		
	        		$scope.contacts.push(response.data[ind]);
	        	}
			},
			function (errorResponse) {
				console.log("error cargando contactos", errorResponse);
			}
		);
	};

	$scope.submitForm = function (formData) {	    
	    if($scope.views.add) {
	    	var data = JSON.stringify({ "ContactTypeID": 1, "ContactInfo": formData.ContactInfo });
		    apiFactory.postData('api/contacts', data).then(
				function (response) {
		        	console.log("add", response);
		        	$scope.viewListContacts();
				},
				function (errorResponse) {
					console.log("error agregando contacto", errorResponse);
				}
			);
		} else {
			var data = JSON.stringify({ "ContactID": formData.ContactID,"ContactTypeID": formData.ContactTypeID, "ContactInfo": formData.ContactInfo });
			apiFactory.putData('api/contacts', data).then(
				function (response) {
		        	console.log("edit", response);
		        	$scope.viewListContacts();
				},
				function (errorResponse) {
					console.log("error editando contacto", errorResponse);
				}
			);
		}
	};

	$scope.removeContact = function (index) {
		$scope.contacts.splice(index, 1);
	};

	$scope.viewListContacts = function () {
		$scope.loadContacts();
		$scope.views.list = true;
	    $scope.views.add = false;
	    $scope.views.edit = false;		
	};

	$scope.viewAddContact = function () {
		$scope.formData = {};
		$scope.views.list = false;
	    $scope.views.add = true;
	    $scope.views.edit = false;			
	};

	$scope.viewEditContact = function (index) {
		$scope.formData = $scope.contacts[index];
		$scope.views.list = false;
	    $scope.views.add = false;
	    $scope.views.edit = true;			
	};
        
})