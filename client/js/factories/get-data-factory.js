/**
 * Created by I97143 on 7/27/2016.
 */
(function(){
    'use strict';
    
    angular.module('get-data-factory', [])
        .factory('getDataFactory', getData);
    
    getData.$inject=["$http"];
    
    function getData($http){
        
        
        return {
            companies: function(){
                return $http.get('/getCompanies').then(results=>{
                    return results.data;
                }, err=>{
                    return err;
                })
            },
            companiesById: function(ids){
                return $http.get('/getCompanies').then(results=>{
                    return results.data.filter(function(co){
                        var correct=false;
                        for(var i=0;i<ids.length;i++){
                            if(co.id==ids[i]){
                                correct=true;
                            }
                        }
                        return correct;
                    })
                }, err=>{
                    return err;
                })
            },
            rideAlongs: function(){
                return $http.get('/activeRideAlongs').then(results=>{
                    return results.data;
                }, err=>{
                    return err;
                })
            }
        }
    }
    
})();