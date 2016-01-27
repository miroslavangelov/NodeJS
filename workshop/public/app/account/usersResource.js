app.factory("usersResource", function($resource) {
    var usersResource = $resource("api/users/:id", {_id: '@id'}, {
        editProfile: {
            method: "PUT",
            isArray: false
        }
    });
    usersResource.prototype.isAdmin = function() {
        return this.roles && this.roles.indexOf("admin") > -1;
    };
    return usersResource;
});