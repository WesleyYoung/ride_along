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
        "get-data-factory",
        
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

            var mainThemeBlue = $mdThemingProvider.extendPalette('blue', {
                '500': '#006F9F',
                'contrastDefaultColor': 'light'
            });

            $mdThemingProvider.definePalette('mainBlue', mainThemeBlue);

            $mdIconProvider.fontSet('md', 'material-icons');

            $mdThemingProvider
                .theme('default')
                .primaryPalette("mainBlue", {
                    'default': '500'
                })
                .accentPalette('green', {
                    'default': '600', 
                    'hue-1': '100', 
                    'hue-2': '600', 
                    'hue-3': 'A100' 
                })
                .warnPalette('red', {
                    'default': '500',
                    'hue-1': '100', 
                    'hue-2': '600', 
                    'hue-3': 'A100'
                });

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