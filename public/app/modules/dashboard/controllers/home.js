dashboard.controller("HomeController", ['$rootScope', '$scope', '$state', '$location', 'dashboardService', 'Flash',
function ($rootScope, $scope, $state, $location, dashboardService, Flash) {
    var vm = this;

    vm.showDetails = true;
    vm.home = {};
    
    dashboardService.getTopics().then(function (response) {
        $scope.topics = response.data;
    });

    $scope.pesquisar = function(topic){
        dashboardService.getRespository(topic).then(function (response) {
            $scope.repositories = response.data.items;
        });
    }

}]);

