(function(){
    'use strict'

    angular.module('MainApp')
        .controller('SettingsController', SettingsController)
    ;

    SettingsController.$inject = ['$http', '$state', 'user', 'CurrentUserService', 'API_BASE_URL'];
    function SettingsController($http, $state, user, CurrentUserService, API_BASE_URL){
        var $ctrl = this;
        $ctrl.user = user;
        $ctrl.error = '';

        $ctrl.setError = function(msg){
            $ctrl.error = msg;
        }

        $ctrl.updateUser = function(){
            var data = {
                name: $ctrl.user.name,
                email: $ctrl.user.email,
                timezone: $ctrl.user.timezone,
            };
            var config = {headers:  {
                'Authorization': 'Token ' + CurrentUserService.getUserToken()
            }};

            return $http.patch(API_BASE_URL + '/customers/' + $ctrl.user.id, data, config).then(
                function (response) {
                    CurrentUserService.setUser(response.data, false);
                    $state.go("dashboard");
                },
                function (response) {
                    $ctrl.setError(response.data);
                }
            );
        }
    }
})();
