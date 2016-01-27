app.factory("courseResource", function($resource) {
    var courseResource = $resource("api/courses/:id", {id: '@id'}, {
        editCourse: {
            method: "PUT",
            isArray: false
        }
    });
    return courseResource;
});