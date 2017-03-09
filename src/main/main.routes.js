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
                        return EventService.getItems($stateParams.objectType, $stateParams.objectId).then(function(data){
                            var events = [];
                            var event_idx;

                            for (event_idx in data.results){
                                var event = data.results[event_idx];
                                var timestamp = new Date(event.timestamp);

                                var event_object = {
                                    'start_date': {
                                        'year': timestamp.getFullYear(),
                                        'month': timestamp.getMonth(),
                                        'day': timestamp.getDay(),
                                        'hour': timestamp.getHours(),
                                        'minute': timestamp.getMinutes(),
                                        'second': timestamp.getSeconds()
                                   },
                                    'text': {
                                        'headline': event.message,
                                        'text': event.message
                                    }
                                }
                                events.push(event_object);
                            }

                            $window.timeline_json = {'events': events}
                            return data;
                        });
                    }
                ],

            }
        })
    }
})();
