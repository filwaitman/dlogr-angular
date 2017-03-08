(function(){
    'use strict'

    angular.module('MainApp')
        .controller('DashboardController', DashboardController)
    ;

    DashboardController.$inject = ['user', 'itemsData'];
    function DashboardController(user, itemsData) {
        var $ctrl = this;
        $ctrl.user = user;
        $ctrl.itemsData = itemsData;
    }
})();
