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
                        return CurrentUserService.get_user();
                    }
                ]
            }
        })
    }
})();
