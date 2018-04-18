angular.module('BladeTest')
    .factory('AuthService',['$http','$q', function ($http, $q) {


        var service = {
            getProfile:getProfile,
            signIn:signIn
        };

        function getProfile (userid){
            return $http({
                method: "POST",
                url: "/v1/user/:userid/profile",
                // clarify on data format
                data: JSON.stringify(userid)
            }).then(function(res) {
                return res.data;
            });

        };

        function signIn (userid){
            return $http({
                method: "POST",
                url: "/v1/auth/login",
                // clarify on data format
                data: JSON.stringify(userid)
            }).then(function(res) {
                return res.data;
            });

        };
        return service;
    }])