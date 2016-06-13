/**
 * Created by I97143 on 6/8/2016.
 */
(function(){
    'use strict';
    
    angular.module('event-creator-controller', [])
        .controller('event-creator-controller', eventCreatorController);

    eventCreatorController.$inject=["listFactory"];
    
    function eventCreatorController(listFactory){
        var ecc = this;

        ecc.regions=listFactory.regions();
        ecc.products=listFactory.products();

        ecc.selectedProducts=[];
        ecc.selectedRegions=[];
        ecc.selectedSubRegions=[];
        
    }
})();