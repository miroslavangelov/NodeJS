app.factory("auth", function($q, identity, $http, usersResource) {
    return {
        login: function(user) {
            var deferred = $q.defer();

            $http.post("/login", user).success(function(response) {
                if (response.success) {
                    var user = new usersResource();
                    angular.extend(user, response.user);
                    identity.currentUser = user;
                    deferred.resolve(true);
                }
                else {
                    deferred.resolve(false);
                }
            });

            return deferred.promise;
        },
        logout: function() {
            var deferred = $q.defer();
            $http.post("/logout").success(function(response) {
                    identity.currentUser = undefined;
                    deferred.resolve();
            });
            return deferred.promise;
        },
        isAuthorisedForRole: function(role) {
            if (identity.isAuthorisedForRole(role)) {
                return true;
            }
            else {
                return $q.reject("not authorized");
            }
           // return identity.currentUser.isAdmin();
        },
        register: function(user) {
            var deferred = $q.defer();
            var user = new usersResource(user);
            user.$save().then(function() {
                identity.currentUser = user;
                deferred.resolve();
            }, function(response) {
                deferred.reject(response);
            });

            return deferred.promise;
        },
        isAuthenticated: function() {
            if (identity.isAuthenticated()) {
                return true;
            }
            else {
                return $q.reject("not authorized");
            }
        },
        editProfile: function(user) {
            var updatedUser = new usersResource(user);
           // angular.extend(updatedUser, identity.currentUser);
            updatedUser._id = identity.currentUser._id;
            var deferred = $q.defer();
            updatedUser.$editProfile()
                .then(function() {
                    identity.currentUser.firstname = updatedUser.firstname;
                    identity.currentUser.lastname = updatedUser.lastname;
                    deferred.resolve();
                }, function(response) {
                    deferred.reject(response);
                });
            return deferred.promise;
        }
    }
});