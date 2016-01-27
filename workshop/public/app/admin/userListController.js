app.controller("userListController", function($scope, usersResource) {
    $scope.users = usersResource.query();
});