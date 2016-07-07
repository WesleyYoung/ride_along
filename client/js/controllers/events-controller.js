/**
 * Created by I97143 on 6/8/2016.
 */
(function(){
    'use strict';
    
    angular.module('events-controller', [])
        .controller('events-controller', eventsController);
    
    eventsController.$inject=["$http"];
    
    function eventsController($http){
        var ec = this;

        ec.rideAlongs = [];

        $http.get('/openRideAlongs').then(results=>{
            ec.rideAlongs=results.data;
            console.log(ec.rideAlongs);
        })

    }
    
    
})();