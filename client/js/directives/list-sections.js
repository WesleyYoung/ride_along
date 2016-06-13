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
                info: "=info"
            },
            template: `
            <div class="col-md-3 product-section psEven">
                <h2>{{info.name}}</h2>
                <br>
                <br>
                <button class="{{'btn product-btn ' + info.theme.btn_class}}">Add</button>

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
            },
            template: `
            <div class="col-md-3 product-section psEven">
                <h2>{{region.name|regionToNormal}}</h2>

                <button class="{{'btn product-btn ' + region.theme.btn_class}}">Add</button>
                
                <!--<p ng-repeat="(provinces,) in subRegions"></p>-->

            </div>
            `
        }
    }

})();