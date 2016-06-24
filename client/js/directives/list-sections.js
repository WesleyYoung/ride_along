/**
 * Created by I97143 on 6/8/2016.
 */
(function(){
    'use strict';

    var module = angular.module('list-sections', ["ngMaterial"]);
        
    
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
            <div class="product-section col-sm-3" id="info.name" ng-class="{'product-section-selected': info.added}">
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
                <img class="flag" src="{{'imgs/' + region.theme.flag}}">
                <br>
                <br>
            </div>
            `
        }
    }

    //Date selector section
    module.directive('dateSection', dateSection);

    function dateSection(){
        return {
            restrict: "AE",
            replace: "true",
            scope: {
                start: "=start",
                end: "=end"
            },
            template: `
            <div class="date-section">
            <h4>Date Range</h4>
                <md-content>
                    <md-datepicker class="col-sm-6" ng-model="start"></md-datepicker>
                    <md-datepicker class="col-sm-6" ng-model="end"></md-datepicker>
                </md-content>
            </div>
            
            `
        }
    }
    
    //Additional Notes Section
    module.directive('noteSection', noteSection);
    
    function noteSection(){
        return{
            restrict: "AE",
            replace: "true",
            scope: {
                maxChars: "=maxChars",
                message: "=message"
            },
            template:`
            <div class="col-lg-5 info-box note-section">
                <h2>Notes</h2>
                <textarea class="form-control note-textarea">

                </textarea>
            </div>
            `
        }
    }

})();