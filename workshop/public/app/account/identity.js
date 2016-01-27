app.factory("identity", function($window, usersResource) {
    var user;
    if(window.bootstrappedUserObject) {
        user = new usersResource();
        angular.extend(user, $window.bootstrappedUserObject);
    }

    return {
        currentUser: user,
        isAuthenticated: function() {
            return !!this.currentUser;
        },
        isAuthorisedForRole: function(role) {
            return !!this.currentUser && this.currentUser.roles.indexOf(role) > -1;
        }
    }
});