(function(){
    'use strict'

    angular.module('MainApp')
        .controller('DashboardController', DashboardController)
    ;

    DashboardController.$inject = ['user', 'items_data'];
    function DashboardController(user, items_data) {
        var $ctrl = this;
        $ctrl.user = user;
        $ctrl.items_data = items_data;
    }
})();
