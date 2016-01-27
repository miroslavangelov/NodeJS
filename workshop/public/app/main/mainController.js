app.controller("mainController", function($scope, cashedCourses) {
    $scope.courses = cashedCourses.query();
});