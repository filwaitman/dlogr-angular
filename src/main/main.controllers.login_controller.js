(function(){
    'use strict'

    angular.module('MainApp')
        .controller('LoginController', LoginController)
    ;

    LoginController.$inject = ['$http', '$state', 'CurrentUserService', 'API_BASE_URL'];
    function LoginController($http, $state, CurrentUserService, API_BASE_URL){
        var $ctrl = this;
        $ctrl.email = '';
        $ctrl.password = '';
        $ctrl.error = '';

        $ctrl.setError = function(msg){
            $ctrl.error = msg;
        }

        $ctrl.login = function() {
            var data = {email: $ctrl.email, password: $ctrl.password};
            return $http.post(API_BASE_URL + '/auth/login', data).then(
                function (response) {
                    CurrentUserService.setUser(response.data);
                    $state.go("dashboard");
                },
                function (response) {
                    $ctrl.setError('Unable to login with credentials provided.');
                }
            );
        }
    }
})();
