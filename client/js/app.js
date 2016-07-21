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
        'toaster',
        
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
        'companyController',

        //Animations
        'ui-window-animate',
        'fold-animate'

    ])

    .config(["$stateProvider", "$urlRouterProvider", "$mdThemingProvider", "$mdIconProvider",
        function($stateProvider, $urlRouterProvider, $mdThemingProvider, $mdIconProvider){

            $mdIconProvider.fontSet('md', 'material-icons');

            $mdThemingProvider
                .theme('default')
                .primaryPalette("indigo", {
                    'default': '500', // by default use shade 400 from the pink palette for primary intentions
                    'hue-1': '100', // use shade 100 for the <code>md-hue-1</code> class
                    'hue-2': '600', // use shade 600 for the <code>md-hue-2</code> class
                    'hue-3': 'A100' // use shade A100 for the <code>md-hue-3</code> class
                })
                .accentPalette('green', {
                    'default': '700', // by default use shade 400 from the pink palette for primary intentions
                    'hue-1': '100', // use shade 100 for the <code>md-hue-1</code> class
                    'hue-2': '600', // use shade 600 for the <code>md-hue-2</code> class
                    'hue-3': 'A100' // use shade A100 for the <code>md-hue-3</code> class
                })
                .warnPalette('red');

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
                })
                .state('companies', {
                    url: '/companies',
                    templateUrl: 'templates/company-manager.html',
                    controller: 'companyController as cc'
                });

            $urlRouterProvider.otherwise("/main");

        }
    ]);

})();