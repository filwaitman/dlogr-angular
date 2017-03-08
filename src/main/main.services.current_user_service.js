(function(){
    'use strict'

    angular.module('MainApp')
        .service('CurrentUserService', CurrentUserService)
    ;

    CurrentUserService.$inject = [];
    function CurrentUserService(){
        var service = this;
        service.user_data = null;
        service.user_token = '';

        service.set_user = function(data){
            service.user_data = data;
            service.user_token = data.auth_token
        }

        service.get_user = function(){
            return service.user_data;
        }

        service.get_user_token = function(){
            return service.user_token;
        }

        service.clear_user = function(){
            service.user_data = null;
            service.user_token = '';
        }
    }
})();
