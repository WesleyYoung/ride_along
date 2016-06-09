/**
 * Created by I97143 on 6/8/2016.
 */
(function(){
    'use strict';

    angular.module('list-section', [])
        .directive('list-section', listSection);

    listSection.$inject=[];

    function listSection(){
        var ls = this;

        return {
            restrict: "AE",
            replace: 'true',
            scope: {
                type: "=type"
            },
            template: `
            <div class="col-md-3 product-section psEven">
                <h2>Product 1</h2>

                <button class="btn btn-danger product-btn">Create!</button>

            </div>
            `
        }
    }

})();