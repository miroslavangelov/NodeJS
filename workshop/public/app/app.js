var app = angular.module("app", ["ngResource", "ngRoute"]);

app.config(function ($routeProvider, $locationProvider) {
   /* $locationProvider.html5Mode({
        enabled: true,
        requireBase: false
    });*/

    var routeUserChecks = {
        adminRole: {
            authenticate: function(auth) {
                return auth.isAuthorisedForRole("admin")
            }
        },
        authenticated: {
            authenticate: function(auth) {
                return auth.isAuthenticated();
            }
        }
    };
    $routeProvider.when('/', {
        templateUrl: '/partials/main/home',
        controller: 'mainController'
    });
    $routeProvider.when('/courses', {
        templateUrl: '/partials/courses/courses-list',
        controller: 'coursesController'
    });
    $routeProvider.when('/courses/:id', {
        templateUrl: '/partials/courses/course-details',
        controller: 'courseDetailsController'
    });
    $routeProvider.when('/admin/users', {
        templateUrl: '/partials/admin/users-list',
        controller: 'userListController',
        resolve: routeUserChecks.adminRole
    });
    $routeProvider.when('/register', {
        templateUrl: '/partials/account/register',
        controller: 'registerController'
    });
    $routeProvider.when('/profile', {
        templateUrl: '/partials/account/profile',
        controller: 'profileController',
        resolve: routeUserChecks.authenticated
    });
});


app.run(function($rootScope, $location) {
    $rootScope.$on("$routeChangeError", function(event, current, previous, rejection) {
        if (rejection === "not authorized") {
            $location.path("/");
        }

    });
});