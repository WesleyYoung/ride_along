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
                var height = element[0].offsetHeight;
                return $animateCss(element, {
                    from: { height:'0px', opacity: 0 },
                    to: { height:'100%', opacity: 1 },
                    duration: .4
                });
            },
            leave: function(element, doneFn){
                return $animateCss(element, {
                    from: { opacity: 1},
                    to: { opacity: 0},
                    duration: .3
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