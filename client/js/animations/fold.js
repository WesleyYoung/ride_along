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
                var height = element[0].clientHeight;
                //console.log(element);
                return $animateCss(element, {
                    from: {opacity: 0 },
                    to: {opacity: 1 },
                    duration: .4
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