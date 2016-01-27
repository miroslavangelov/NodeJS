app.controller("coursesController", function($scope, cashedCourses) {
    $scope.courses = cashedCourses.query();
});