app.factory("authService", function($http, $q, $resource) {
    return {
        login: function(user) {
            var deferred = $q.defer();

            $http.post("/login", user).success(function(response) {
                    if (response.success) {
                        sessionStorage['currentUser'] = JSON.stringify(response.user);
                        deferred.resolve(true);
                    }
                    else {
                        deferred.resolve(false);
                    }
            });

            return deferred.promise;
        },
        register: function(userData) {


            var deferred = $q.defer();
            if (userData.username === '' || !userData.username) {
                deferred.reject("Username should not be empty");
            }
            if (userData.password === '' || !userData.password) {
                deferred.reject("Password should not be empty");
            }
            if (userData.username.length < 6 || userData.username.length > 20) {
                deferred.reject("Username length should be between 6 and 20 characters");
            }

            $http.post("/register", userData).success(function(response) {
                if (response.success) {
                    sessionStorage['currentUser'] = JSON.stringify(response.user);
                    deferred.resolve(true);
                }
                else {
                    deferred.resolve(false);
                }
            })
                .error(function(err) {
                    deferred.reject(err.err);
            });

            return deferred.promise;
        },
        editProfile: function(userData) {
            var deferred = $q.defer();
            if (userData.username === '' || !userData.username) {
                deferred.reject("Username should not be empty");
            }
            var userResource = $resource("edit/profile/:id", {_id: '@id'}, {
                editProfile: {
                    method: "PUT",
                    isArray: false
                }
            });
            var updatedUser = new userResource(userData);
            updatedUser._id = JSON.parse(sessionStorage['currentUser'])._id;
            updatedUser.$editProfile()
                .then(function(response) {
                    sessionStorage['currentUser'] = JSON.stringify(response);
                    deferred.resolve();
                }, function(response) {
                    deferred.reject(response);
                });

            return deferred.promise;
        },
        getUserProfile: function() {
            var deferred = $q.defer();
            var userResource = $resource("edit/profile/:id", {_id: '@id'}, {
                getUserProfile: {
                    method: "GET",
                    isArray: false
                }
            });
            var userProfile = new userResource();
            userProfile.$getUserProfile()
                .then(function(response) {
                    console.log(response)
                    deferred.resolve(response);
                }, function(response) {
                    deferred.reject(response);
                });
            return deferred.promise;
        },
        getFiles: function(filesData, success, error) {
            var request = {
                method: 'GET',
                url: '/all-files',
                data: filesData
            };
            $http(request).success(success).error(error);
        },
        getUserFiles: function(userFilesData, success, error) {
            var request = {
                method: 'GET',
                url: '/user-files',
                data: userFilesData
            };
            $http(request).success(success).error(error);
        },
        getCurrentUser: function() {
            var userObject = sessionStorage["currentUser"];
            //console.log(userObject)
            if (userObject) {
                return JSON.parse(sessionStorage["currentUser"]);
            }
        },
        logout: function() {
            delete sessionStorage["currentUser"];
        },
        isNormalUser: function() {
            var currentUser = this.getCurrentUser();
            return (currentUser !== undefined) && (!currentUser.isAdmin);
        },
        isAdmin: function() {
            var currentUser = this.getCurrentUser();
            return (currentUser !== undefined) && (currentUser.isAdmin);
        },
        isLoggedIn: function() {
            return sessionStorage["currentUser"] !== undefined;
        },
        isAnonymous: function() {
            return sessionStorage["currentUser"] === undefined;
        }
    }
});