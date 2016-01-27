var app = angular.module('app', ['ngRoute', 'ngResource']);

//app.constant('baseServiceUrl', 'http://softuni-ads.azurewebsites.net/api/');

app.config(function ($routeProvider) {
    $routeProvider.when('/login', {
        templateUrl: 'templates/login.html',
        controller: 'loginController'
    });
    $routeProvider.when('/register', {
        templateUrl: 'templates/register.html',
        controller: 'registerController'
    });
    $routeProvider.when('/edit/profile', {
        templateUrl: 'templates/edit-profile.html',
        controller: 'editProfileController'
    });
    $routeProvider.when('/upload', {
        templateUrl: 'templates/upload-file.html',
        controller: ''
    });
    $routeProvider.when('/all-files', {
        templateUrl: 'templates/all-files.html',
        controller: 'getFilesController'
    });
    $routeProvider.when('/user-files', {
        templateUrl: 'templates/user-files.html',
        controller: 'userFilesController'
    });

    $routeProvider.otherwise(
        { redirectTo: '/' }
    );
});

app.run(function ($route, $rootScope, $location, authService) {
    $rootScope.$on('$locationChangeStart', function (event) {
        if ($location.path().indexOf("/login") != -1 && authService.isLoggedIn()) {
            $location.path("/");
        }
        if ($location.path().indexOf("/register") != -1 && authService.isLoggedIn()) {
            $location.path("/");
        }
        if ($location.path().indexOf("/edit/profile") != -1 && !authService.isLoggedIn()) {
            $location.path("/");
        }
        if ($location.path().indexOf("/user-files") != -1 && !authService.isLoggedIn()) {
            $location.path("/");
        }
        if ($location.path().indexOf("/upload") != -1 && !authService.isLoggedIn()) {
            $location.path("/");
        }
    })
});