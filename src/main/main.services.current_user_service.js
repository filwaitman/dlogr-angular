(function(){
    'use strict'

    angular.module('MainApp')
        .service('CurrentUserService', CurrentUserService)
    ;

    CurrentUserService.$inject = [];
    function CurrentUserService(){
        var service = this;
        service.userData = null;
        service.userToken = '';

        service.setUser = function(data, resetToken){
            service.userData = data;

            if (resetToken === undefined || resetToken === true){
                service.userToken = data.auth_token;
            }
        }

        service.getUser = function(){
            return service.userData;
        }

        service.getUserToken = function(){
            return service.userToken;
        }

        service.clearUser = function(){
            service.userData = null;
            service.userToken = '';
        }
    }
})();
