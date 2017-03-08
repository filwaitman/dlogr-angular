(function(){
    'use strict'

    angular.module('MainApp')
        .service('CurrentUserService', CurrentUserService)
    ;

    CurrentUserService.$inject = [];
    function CurrentUserService($http, API_BASE_URL){
        var service = this;
        service.user_data = null;
        service.user_token = '';

        service.set_user = function(data){
            service.user_data = data;
            service.user_token = data.auth_token
        }

        service.clear_user = function(){
            service.user_data = null;
            service.user_token = '';
        }
    }
})();
