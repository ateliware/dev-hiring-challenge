
dashboard.service('dashboardService', ['$http', '$q', 'Flash', 'apiService', function ($http, $q, Flash, apiService) {

    var dashboardService = {};

    var getTopics = function () {
        var deferred = $q.defer();
        apiService.get("topics").then(function (response) {
            if (response)
                deferred.resolve(response);
            else
                deferred.reject("Something went wrong while processing your request. Please Contact Administrator.");
        },
            function (response) {
                deferred.reject(response);
            });
        return deferred.promise;
    };

    var getRespository = function (topic) {
        var deferred = $q.defer();
        apiService.get("github?topics="+topic).then(function (response) {
            if (response)
                deferred.resolve(response);
            else
                deferred.reject("Something went wrong while processing your request. Please Contact Administrator.");
        },
            function (response) {
                deferred.reject(response);
            });
        return deferred.promise;
    };

    dashboardService.getTopics = getTopics;
    dashboardService.getRespository = getRespository;

    return dashboardService;

}]);
