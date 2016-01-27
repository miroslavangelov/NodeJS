app.controller("courseDetailsController", function($scope, $routeParams, cashedCourses) {
    //$scope.course = cashedCourses.get({id: $routeParams.id});
    $scope.course = cashedCourses.query().$promise
        .then(function(collection) {
            collection.forEach(function(course) {
                if (course._id === $routeParams.id) {
                    $scope.course = course;
                }
            });
        })
});