(function(){
    'use strict'

    angular.module('MainApp')
        .controller('SignupController', SignupController)
    ;

    SignupController.$inject = ['$http', '$state', 'CurrentUserService', 'API_BASE_URL'];
    function SignupController($http, $state, CurrentUserService, API_BASE_URL){
        var $ctrl = this;
        $ctrl.name = '';
        $ctrl.email = '';
        $ctrl.timezone = '';
        $ctrl.password = '';
        $ctrl.error = '';

        $ctrl.setError = function(msg){
            $ctrl.error = msg;
        }

        $ctrl.signUp = function() {
            var data = {
                name: $ctrl.name,
                email: $ctrl.email,
                timezone: $ctrl.timezone,
                password: $ctrl.password,
            };

            return $http.post(API_BASE_URL + '/customers', data).then(
                function (response) {
                    CurrentUserService.setUser(response.data);
                    $state.go("welcome");
                },
                function (response) {
                    $ctrl.setError(response.data);
                }
            );
        }
    }
})();
