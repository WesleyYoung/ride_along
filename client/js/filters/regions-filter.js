/**
 * Created by I97143 on 6/13/2016.
 */
(function(){
    'use strict';

    var module = angular.module('regions-filter', []);

    
    //Takes the regions from how they are being stored in JavaScript to legal names
        module.filter('regionToNormal', regionToNormal);

    regionToNormal.$inject=[];

    function regionToNormal(){
        return function(input){
            if(input!==undefined&&input!==null){
                var inpArr=input.split('_');
                var out = [];
                for(var i=0;i<inpArr.length;i++){
                    var cap=inpArr[i][0].toUpperCase();
                    var low=inpArr[i].split("").splice(1, inpArr[i].length-1).join("").toLowerCase();
                    out.push(cap+low);
                }
                return out.join(" ");
            }else{
                return input;
            }
        }
    }
    
    //Takes region names and converts them to how they are written in the script file
        module.filter('regionToScript', regionToScript);

    regionToScript.$inject=[];

    function regionToScript(){
        return function(input){
            if(input!==undefined&&input!==null){
                return input.toLowerCase().split(" ").join("_");
            }else{
                return input;
            }
        }
    }

})();