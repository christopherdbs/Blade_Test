angular
    .module('BladeTest')
    .config(function ($routeProvider,$locationProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'views/index.html',
                controller: 'defaultCtrl as bladeTest'
            })
            .otherwise({
                redirectTo: '/'
            });
        $locationProvider.hashPrefix('');
        /*	  .html5Mode(true);*/
    });
