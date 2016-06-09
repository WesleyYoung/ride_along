/**
 * Created by I97143 on 6/9/2016.
 */
(function(){
    'use strict';

    angular.module('ui-window-animate', [])
        .animation('.ui-window', uiWindow);

    uiWindow.$inject=["$animateCss"];

    function uiWindow($animateCss){
        return {
            enter: function(element) {
                // this will trigger `.slide.ng-enter` and `.slide.ng-enter-active`.
                return $animateCss(element, {
                    event: 'enter',
                    structural: true
                });
            }
        }
    }
})();