/**
 * Created by I97143 on 6/7/2016.
 */
(function(){
    'use strict';

    angular.module('ride-along', [
        
        //Angular Libraries
        'ui.router',
        'ngAnimate',
        'ngMaterial',
        'ngAria',
        'ngMessages',
        'ngRoute',
        
        //Directives
        "list-sections",
        
        //Filters
        "regions-filter",
        "long-date-filter",
        
        //Services
        

        //Factories
        "list-factory",
        
        //Controllers
        'nav-controller',
        'home-controller',
        'report-controller',
        'events-controller',
        'event-creator-controller',
        
        //Animations
        'ui-window-animate',
        'fold-animate'

    ])

    .config(["$stateProvider", "$urlRouterProvider", "$mdThemingProvider", "$mdIconProvider",
        function($stateProvider, $urlRouterProvider, $mdThemingProvider, $mdIconProvider){

            $mdIconProvider.fontSet('md', 'material-icons');

            $mdThemingProvider
                .theme('default')
                .primaryPalette("indigo")
                .accentPalette('green')
                .warnPalette('blue');

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
                })
                .state('events', {
                    url: '/events',
                    templateUrl: 'templates/events.html',
                    controller: 'events-controller as ec'
                })
                .state('eventCreator', {
                    url: '/eventCreator',
                    templateUrl: 'templates/eventCreator.html',
                    controller: 'event-creator-controller as ecc'
                });

            $urlRouterProvider.otherwise("/main");

        }
    ]);

})();