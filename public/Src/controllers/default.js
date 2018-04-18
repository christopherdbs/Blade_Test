angular.module('BladeTest')
    .controller('defaultCtrl', function(AuthService) {

        this.userid=localStorage.getItem('userid');
        this.getProfile(userid){

            AuthService
                .getProfile(userid)
                .then(function(data){
                    console.log(data);
                    $location.path('./../Views/profile.html');
                    var profile = document.getElementById('profile');
                    profile.write(data);
                })

        }

        $scope.signin = function () {
            AuthService
                .signin($scope.user)
                .then(function (data) {
                    console.log(data.token+" "+ data.userid);
                    $window.localStorage.setItem('dashboardtoken', data.token)
                    $window.localStorage.setItem('dashboarduser', data.userid);
                    $location.path('./../Views/signin.html');
                })
                .catch(function (error) {
                    console.error(error);
                });
        };
    })