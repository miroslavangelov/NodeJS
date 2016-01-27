app.factory("cashedCourses", function(courseResource) {
    var cashedCourses;

    return {
        query: function() {
            if (!cashedCourses) {
                cashedCourses = courseResource.query();
            }

            return cashedCourses;
        }
    }
});