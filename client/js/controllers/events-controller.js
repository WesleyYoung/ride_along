/**
 * Created by I97143 on 6/8/2016.
 */
(function(){
    'use strict';
    
    angular.module('events-controller', [])
        .controller('events-controller', eventsController);
    
    eventsController.$inject=["$http", "$mdDialog", "$mdMedia"];
    
    function eventsController($http, $mdDialog, $mdMedia){
        var ec = this;

        ec.rideAlongs=[];
        ec.searchText="";
        
        ec.showRADetails=showRADetails;
        
        ec.removeRA=function(index){
            console.log(index);

            $http.post('/deleteRideAlong', ec.rideAlongs[index]).then(results=>{
                if(results.data.success==true){
                    getEvents()
                }else{
                    console.log("There was an issue deleting the ride-along")
                }
            })
        };
        
        ec.changeStatus=function(index, status){
            ec.rideAlongs[index].status=status;
            $http.post('/changeRAStatus', ec.rideAlongs[index]).then(results=>{
                if(results.data.success==true){
                    getEvents();
                }else{
                    console.log("There was an issue changing the status of the ride-along")
                }
            })
        };

        function getEvents(){
            $http.get('/openRideAlongs').then(results=>{
                ec.rideAlongs=results.data;
                console.log(ec.rideAlongs);
            })
        }

        function showRADetails(ev, ra){
            ec.selectedRideAlong=ra;
            $mdDialog.show({
                controller: DialogController,
                templateUrl: 'templates/event-view-dialog.html',
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose:true
            })
        }

        function DialogController($scope, $mdDialog){
            $scope.rideAlong = ec.selectedRideAlong;
            
            $scope.close=function(){
                $mdDialog.cancel();
            }
        }

        getEvents();
    }
    
    
})();