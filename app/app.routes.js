'use strict';

angularModule.config(function ($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/');

    $stateProvider        
        .state('login', {
            url: '/',
            templateUrl: 'app/components/login/login.html',
            controller: 'LoginController'
        })       
        .state('admin', {
            url: '/admin',
            views: {
                '': { templateUrl: 'app/shared/header/header.html',
                      controller: 'HeaderController' },

                'container@admin': { templateUrl: 'app/components/admin/admin.html',
                                     controller: 'AdminController' }
            }
            
        })
        .state('jobs', {
            url: '/jobs',
            views: {
                '': { templateUrl: 'app/shared/header/header.html',
                      controller: 'HeaderController' },

                'container@jobs': { templateUrl: 'app/components/jobs/jobs.html',
                                    controller: 'JobsController' }
            }
        })
        .state('contacts', {
            url: '/contacts',
            views: {
                '': { templateUrl: 'app/shared/header/header.html',
                      controller: 'HeaderController' },

                'container@contacts': { templateUrl: 'app/components/contacts/contacts.html',
                                        controller: 'ContactsController' }
            }            
        });
});