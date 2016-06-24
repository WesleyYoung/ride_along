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
                return $animateCss(element, {
                    event: 'enter',
                    structural: true
                });
            }
        }
    }
})();