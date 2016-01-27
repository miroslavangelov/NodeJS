app.controller("getFilesController", function($scope, notifyService, authService) {
    $scope.getFiles = function() {
        authService.getFiles(
            $scope.filesData,
            function success(data) {
                $scope.filesData = data;
            },
            function error(err) {
                console.log(err);
            }
        );
    };
    $scope.getFiles();
});
