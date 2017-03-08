(function(){
    'use strict'

    angular.module('MainApp')
        .service('EventService', EventService)
    ;

    EventService.$inject = ['$http', '$state', 'CurrentUserService', 'API_BASE_URL'];
    function EventService($http, $state, CurrentUserService, API_BASE_URL){
        var service = this;

        service.getItems = function(objectType, objectId){
            var config = {headers:  {
                'Authorization': 'Token ' + CurrentUserService.getUserToken()
            }};

            if (objectType !== undefined && objectId !== undefined){
                config.params = {
                    object_id: objectId,
                    object_type: objectType
                };
            }

            return $http.get(API_BASE_URL + '/events', config).then(
                function (response) {
                    return response.data;
                },
                function (response) {
                    CurrentUserService.clearUser();
                    $state.go('login');
                }
            )
        }
    }
})();
