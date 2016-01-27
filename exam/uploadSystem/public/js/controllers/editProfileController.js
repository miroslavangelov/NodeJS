app.controller("editProfileController", function($scope, $location, authService, notifyService) {
    function getUserProfile() {
        authService.getUserProfile()
            .then(function(success) {
                if (success) {
                    $scope.userData = success;
                }
                else {
                    notifyService.showError("Could not load user profile")
                }
            })

    }
    getUserProfile();
    $scope.editProfile = function(userData) {
        authService.editProfile(userData)
            .then(function() {
                    notifyService.showInfo("Edit profile successful");
                    $location.path("/");
            }, function(err) {
                notifyService.showError(err);
            })
        ;
    }
});