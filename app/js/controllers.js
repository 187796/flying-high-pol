'use strict';

/* Kontrolery */

angular.module('flyinghigh.controllers', []).

    controller('LoginCtrl', function ($scope, $location, authentication) {
        var users = [
            {email: 'janina.kowalska@acme.com', password: 's3cr3t', firstName: 'Janina', lastName: 'Kowalska'},
            {email: 'janusz.bloger@acme.com', password: 's3cr3t2', firstName: 'Janusz', lastName: 'Bloger'}
        ];

        $scope.status = 'Złoty';
        $scope.auth = function () {
            var user
            for (var i = 0; i < users.length; i++) {
                if ((users[i].email == $scope.email) && (users[i].password == $scope.password)) {
                    user = users[i];
                }
            }
            if (user) {
                authentication.authenticateWith(user);
                $location.url('/home');
                $scope.authenticationError = '';
            } else {
                $scope.authenticationError = 'Błędna nazwa użytkownika lub hasło';
            }
        };
    })
    .controller('HomeCtrl', function ($scope, authentication) {
        $scope.user = authentication.getUser();

        $scope.featured = [
            {title: "Singapur", price: 900, image: "img/singapore.png" },
            {title: "Londyn", price: 1800, image: "img/london.jpg" },
            {title: "Sydney", price: 700, image: "img/sydney.png" }
        ]
    })
    .controller('BookCtrl', function ($scope, authentication) {
        $scope.user = authentication.getUser();
        $scope.travelClass = 'Ekonomiczna';
        $scope.travelClasses = ['Ekonomiczna', 'Ekonomiczna Premium', 'Biznes', 'Pierwsza'];

        $scope.depart = undefined;
        $scope.from = undefined;
        $scope.to = undefined;

        $scope.cities = function() {
            return ['Sydney', 'Melbourne', 'Brisbane', 'Perth', 'Auckland', 'Wellington', 'Londyn', 'San Francisco',
                'Nowy Jork', 'Los Angeles', 'Toronto', 'Singapur', 'Hong Kong', 'Seattle', 'Shanghai', 'Seul', 'Sao Paulo'];
        };

        $scope.startsWith = function (state, viewValue) {
            return state.substr(0, viewValue.length).toLowerCase() == viewValue.toLowerCase();
        }
    });

