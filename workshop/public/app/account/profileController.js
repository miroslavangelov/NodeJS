app.controller("profileController", function($scope, $location, notifyService, identity, auth) {
    $scope.user = {
        firstname: identity.currentUser.firstname,
        lastname: identity.currentUser.lastname
    };

    $scope.editProfile = function(user) {
        auth.editProfile(user)
            .then(function() {
                $scope.firstname = user.firstname;
                $scope.lastname = user.lastname;
                $location.path("/")
        });
    }
});