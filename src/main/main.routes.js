(function() {
    'use strict';

    angular.module('MainApp')
        .config(routeConfig)
    ;

    routeConfig.$inject = ['$stateProvider', '$urlRouterProvider'];
    function routeConfig ($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/login');

        $stateProvider
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
                    'EventService', '$stateParams', function(EventService, $stateParams) {
                        return EventService.getItems($stateParams.objectType, $stateParams.objectId);
                    }
                ],
            }
        })
    }
})();
