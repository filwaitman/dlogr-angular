(function(){
    'use strict'

    angular.module('MainApp')
        .controller('DashboardController', DashboardController)
    ;

    DashboardController.$inject = ['user'];
    function DashboardController(user) {
        var $ctrl = this;
        $ctrl.user = user;
    }

})();
