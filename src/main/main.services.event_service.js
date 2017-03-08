(function(window){
    'use strict'

    angular.module('MainApp')
        .service('EventService', EventService)
    ;

    EventService.$inject = ['$http', 'CurrentUserService', 'API_BASE_URL'];
    function EventService($http, CurrentUserService, API_BASE_URL){
        var service = this;

        service.getItems = function(objectType, objectId){
            var token = 'Token ' + CurrentUserService.get_user_token();
            var config = {headers:  {'Authorization': token}};
            var url = API_BASE_URL + '/events';

            if (objectType !== undefined && objectId !== undefined){
                config.params = {
                    object_id: objectId,
                    object_type: objectType
                };
            }

            return $http.get(url, config).then(
                function (response) {
                    return response.data
                },
                function (response) {
                    window.location.replace("/#/login");
                }
            )
        }
    }
})(window);
