app.controller("loginController", function($scope, $location, notifyService, identity, auth) {
    $scope.identity = identity;
    $scope.login = function(user) {
        auth.login(user)
            .then(function(success) {
                if (success) {
                    notifyService.showInfo("Login successful");
                }
                else {
                    notifyService.showError("Invalid username/password")
                }
            });
    };

    $scope.logout = function() {
        auth.logout()
            .then(function() {
                notifyService.showInfo("Logout successful");
                if ($scope.user) {
                    $scope.user.username = "";
                    $scope.user.password = "";
                    $location.path("/");
                }
            })

    }
});