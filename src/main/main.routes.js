(function() {
    'use strict';

    angular.module('MainApp')
        .config(routeConfig)
    ;

    routeConfig.$inject = ['$stateProvider', '$urlRouterProvider'];
    function routeConfig ($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/');

        $stateProvider
        .state('index', {
            url: '/',
            templateUrl: 'src/main/templates/index.html',
        })

        .state('login', {
            url: '/login',
            templateUrl: 'src/main/templates/login.html',
            controller: 'AuthController as $ctrl',
        })

        .state('dashboard', {
            url: '/dashboard',
            templateUrl: 'src/main/templates/dashboard.html',
            controller: 'DashboardController as $ctrl',
            resolve: {
                user: [
                    'CurrentUserService', function(CurrentUserService) {
                        return CurrentUserService.getUser();
                    }
                ],
                itemsData: [
                    'EventService', function(EventService) {
                        return EventService.getItems();
                    }
                ],
            }
        })

        .state('dashboardItem', {
            url: '/dashboard/{objectType}/{objectId}',
            templateUrl: 'src/main/templates/dashboard_item.html',
            controller: 'DashboardController as $ctrl',
            resolve: {
                user: [
                    'CurrentUserService', function(CurrentUserService) {
                        return CurrentUserService.getUser();
                    }
                ],
                itemsData: [
                    'EventService', '$stateParams', '$window', function(EventService, $stateParams, $window) {
                        $window.timeline_json = {
                            'events': [
                                {
                                    'start_date': {
                                        'year': 2017,
                                        'month': 1,
                                        'day': 1,
                                        'hour': 12,
                                        'minute': 12,
                                        'second': 12,
                                   },
                                    'text': {
                                        'headline': 'Gone',
                                        'text': 'Died',
                                    },
                                },
                            ]
                        }
                        return EventService.getItems($stateParams.objectType, $stateParams.objectId);
                    }
                ],

            }
        })
    }
})();
