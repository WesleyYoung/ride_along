/**
 * Created by I97143 on 9/20/2016.
 */
(function(){
    'use strict';

    angular.module('loading-dialog-factory', [])
        .factory('loadingDialogFactory', loadingDialogFactory);

    loadingDialogFactory.$inject=["$mdMedia", "$mdDialog"];

    function loadingDialogFactory($mdMedia, $mdDialog){
        return {
            show: function(options){
                $mdDialog.show({
                    controller: DialogController,
                    templateUrl: 'templates/dialogs/loading-dialog.html',
                    parent: angular.element(document.body),
                    targetEvent: null,
                    clickOutsideToClose:false
                });

                function DialogController($scope, $mdDialog){

                    var colors = [
                            "md-primary",
                            "md-accent",
                            "md-warn",
                            "md-primary md-hue-1",
                            "md-warn md-hue-1",
                            "md-accent md-hue-1",
                            "md-primary md-hue-2",
                            "md-warn md-hue-2",
                            "md-accent md-hue-2",
                            "md-primary md-hue-3",
                            "md-accent md-hue-3",
                            "md-warn md-hue-3"
                        ],
                        defaultColor = "md-primary";

                    $scope.color=options.color||defaultColor;
                    $scope.subtitle=options.subtitle||"please wait...";
                    $scope.title=options.title||"waiting for response...";

                    //Check if the color is valid
                    if(!new RegExp($scope.color).test(colors.join(" "))){
                        $scope.color=defaultColor;
                        console.log(`You've used an invalid class name for the progress bar, so it has been set to the default (${defaultColor}). valid class names are ${colors.join(", ")}`)
                    }

                    if(options.effect){

                        //Check if the call is to cycle through all the colors
                        if(options.effect=="cycle"){
                            var count = 0,
                                interval=options.interval||3000;
                            setInterval(function(){
                                $scope.$apply(function(){
                                    if(colors[count]==undefined)count=0;
                                    $scope.color=colors[count];
                                    count++;
                                })
                            }, interval)

                        }
                    }
                }

            },
            hide: function(){
                $mdDialog.cancel();
            }
        };

    }

})();