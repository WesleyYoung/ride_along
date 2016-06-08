/**
 * Created by I97143 on 6/7/2016.
 */
(function(){
    'use strict';

    angular.module('ride-along', [
        'ui.router',
        'ngAnimate',
        'nav-controller',
        'home-controller',
        'report-controller'
    ])

    .config(["$stateProvider", "$urlRouterProvider",
        function($stateProvider, $urlRouterProvider){

            $stateProvider
                .state('main', {
                    url: '/main',
                    templateUrl: 'templates/main.html',
                    controller: 'home-controller as hc'
                })
                .state('reporting', {
                    url: '/reporting',
                    templateUrl: 'templates/reporting.html',
                    controller: 'report-controller as rc'
                });

            $urlRouterProvider.otherwise("/main");

        }
    ]);

})();