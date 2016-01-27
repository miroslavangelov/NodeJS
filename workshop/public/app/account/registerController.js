app.controller("registerController", function($scope, $location, auth, notifyService) {
    $scope.register = function(user) {
        auth.register(user).then(function(success) {
            notifyService.showInfo("Register successful");
            $location.path("/");
        });
    }
});
