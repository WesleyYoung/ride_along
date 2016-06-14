/**
 * Created by I97143 on 6/8/2016.
 */
(function(){
    'use strict';

    var module = angular.module('list-sections', []);
        
    
    //Product list section
    module.directive('productList', productList);
    
    function productList(){
        return {
            restrict: "AE",
            replace: 'true',
            scope: {
                info: "=info",
                select: "=select"
            },
            template: `
            <div class="product-section col-md-3" id="info.name" ng-class="{'product-section-selected': info.added}">
                <div class="">
                    <!--<h2>{{info.name}}</h2>-->
                    <img src="{{'imgs/' + info.theme.logo}}" class="product-logo">
                    <br>
                    <br>
                    <button class="{{'btn product-btn ' + info.theme.btn_class}}" ng-click="select(info.name)">{{info.added?'Remove':'Add'}}</button>
                    </div>
            </div>
            
            `
        }
    }
    
    //Region list section
    module.directive('regionList', regionList);
    
    function regionList(){
        return {
            restrict: "AE",
            replace: "true",
            scope: {
                region: "=region",
                select: "=select"
            },
            template: `
            <div class="{{'col-md-6 region-section'}}" ng-click="select(region)" ng-class="{'region-section-selected': region.added}">
                <h2>{{region.name|regionToNormal}}</h2>
                <img class="flag" src="{{'imgs/' + region.name + '_flag.png'}}">
                <!--<button class="{{'btn region-btn btn-info'}}" ng-click="select(region)"><img class="flag" src="{{'imgs/' + region.name + '_flag.png'}}"></button>-->
                
                <!--<p ng-repeat="(provinces,) in subRegions"></p>-->

            </div>
            `
        }
    }

})();