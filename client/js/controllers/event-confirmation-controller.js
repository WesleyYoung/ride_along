/**
 * Created by I97143 on 6/15/2016.
 */
(function(){
    'use strict';
    
    angular.module('event-confirmation-controller', [])
        .controller('event-confirmation-controller', eventConfirmation);

    eventConfirmation.$inject=["$stateParams"];
    
    function eventConfirmation($stateParams){
        var ecc = this;
        
        console.log($stateParams);

        ecc.region = $stateParams.region;
        ecc.province = $stateParams.province;
        ecc.county = $stateParams.county;
        ecc.products = $stateParams.products.split(",");
        ecc.startDate = $stateParams.startDate;
        ecc.endDate = $stateParams.endDate;
        ecc.notes = $stateParams.notes;

    }
})();