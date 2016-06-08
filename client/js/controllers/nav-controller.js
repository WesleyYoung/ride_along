/**
 * Created by I97143 on 6/7/2016.
 */
(function(){
    'use strict';

    angular.module('nav-controller',[])
        .controller('nav-controller', navController);

    navController.$inject=["$location"];

    function navController($location){
        var nav = this;
        nav.isActive = isActive;

        function isActive(viewLocation) {
            return viewLocation === $location.path();
        }
    }
})();