app.controller("userFilesController", function($scope, notifyService, authService) {
    $scope.getUserFiles = function() {
        authService.getUserFiles(
            $scope.userFilesData,
            function success(data) {
                $scope.userFilesData = data;
            },
            function error(err) {
                console.log(err);
            }
        );
    };
    $scope.getUserFiles();
});