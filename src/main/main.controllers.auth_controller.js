(function(){
    'use strict'

    angular.module('MainApp')
        .controller('AuthController', AuthController)
    ;

    AuthController.$inject = ['$http', 'CurrentUserService', 'API_BASE_URL'];
    function AuthController($http, CurrentUserService, API_BASE_URL){
        var $ctrl = this;
        $ctrl.email = '';
        $ctrl.password = '';
        $ctrl.error = '';

        $ctrl.login = function() {
            var data = {email: $ctrl.email, password: $ctrl.password};
            return $http.post(API_BASE_URL + '/auth/login', data).then(
                function (response) {
                    CurrentUserService.set_user(response.data);
                    $ctrl.error = 'Done!  =]';
                },
                function (response) {
                    $ctrl.error = 'Unable to login with credentials provided.'
                }
            );
        }
    }
})();
