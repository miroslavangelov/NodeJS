app.controller("loginController", function($scope, $location, authService, notifyService) {
        $scope.login = function(userData) {
            console.log(userData);
            authService.login(userData)
                .then(function(success) {
                    if (success) {
                        notifyService.showInfo("Login successful");
                        $location.path("/");
                    }
                    else {
                        notifyService.showError("Invalid username/password")
                    }
                });
        }
});