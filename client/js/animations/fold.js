/**
 * Created by I97143 on 6/13/2016.
 */
(function(){
    'use strict';

    angular.module('fold-animate', [])
        .animation('.fold', fold);

    fold.$inject=["$animateCss"];

    function fold($animateCss){
        return {
            enter: function(element, doneFn) {
                return $animateCss(element, {
                    from: {width: '85%', opacity: 0 },
                    to: {width: '100%', opacity: 1 },
                    duration: .3
                });
            },
            leave: function(element, doneFn){
                return $animateCss(element, {
                    from: {width: '100%', opacity: 1},
                    to: {width: '50%', opacity: 0},
                    duration: .2
                });
            },
            move: function(element, doneFn){
                return $animateCss(element, {
                    from: { opacity: 1 },
                    to: { opacity: 0 },
                    duration: .3
                });
            }
        }
    }

})();