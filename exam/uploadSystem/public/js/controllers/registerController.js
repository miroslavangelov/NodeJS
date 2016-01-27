app.controller("registerController", function($scope, $location, authService, notifyService) {
    $scope.register = function(userData) {
        authService.register(userData)
            .then(function(success) {
                if (success) {
                    notifyService.showInfo("Register successful");
                    $location.path("/");
                }
                else {
                    notifyService.showError("Register failed")
                }
            }, function(err) {

                notifyService.showError(err);
            })
        };
});