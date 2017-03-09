(function(){
    'use strict'

    angular.module('MainApp')
        .controller('LogoutController', LogoutController)
    ;

    LogoutController.$inject = ['$state', 'CurrentUserService'];
    function LogoutController($state, CurrentUserService){
        CurrentUserService.clearUser();
        $state.go("index");
    }
})();
