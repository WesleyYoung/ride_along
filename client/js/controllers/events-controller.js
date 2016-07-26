/**
 * Created by I97143 on 6/8/2016.
 */
(function(){
    'use strict';
    
    angular.module('events-controller', [])
        .controller('events-controller', eventsController);
    
    eventsController.$inject=["$http", "$mdDialog", "$mdMedia", "$timeout", "toaster"];
    
    function eventsController($http, $mdDialog, $mdMedia, $timeout, toaster){
        var ec = this;

        ec.rideAlongs=[];
        ec.counts={Total: 0, Open: 0, Unapproved: 0, Cancelled: 0, Accepted: 0};
        ec.searchText="";
        ec.waitingForResponse=false;
        ec.filterByStatus="all";
        
        ec.showRADetails=showRADetails;
        ec.sortEvents=sortEvents;
        ec.resendNotifications=resendNotifications;
        
        ec.removeRA=function(index, ev){
            // Appending dialog to document.body to cover sidenav in docs app
            var confirm = $mdDialog.confirm()
                .title('Are you sure you\'d like to delete this ride-along?')
                .textContent('As of now, this action cannot be undone')
                .ariaLabel('Delete ride along')
                .targetEvent(ev)
                .ok('Delete')
                .cancel('Cancel');
            $mdDialog.show(confirm).then(function() {
                $http.post('/deleteRideAlong', ec.rideAlongs[index]).then(results=>{
                    if(results.data.success==true){
                        getEvents()
                    }else{
                        console.log("There was an issue deleting the ride-along")
                    }
                })
            }, function() {
                
            });
        };
        
        ec.changeStatus=function(index, status){
            ec.rideAlongs[index].status=status;
            $http.post('/changeRAStatus', ec.rideAlongs[index]).then(results=>{
                if(results.data.success==true){
                    sortEvents(ec.filterByStatus)
                }else{
                    console.log("There was an issue changing the status of the ride-along")
                }
            })
        };

        function getEvents(){
            ec.waitingForResponse=true;
            getEventsData().then(results=>{
                var count=0;
                ec.rideAlongs=[];
                ec.counts.Total=0;
                ec.counts.Open=0;
                ec.counts.Unapproved=0;
                ec.counts.Accepted=0;
                ec.counts.Cancelled=0;
                for(var i=0;i<results.data.length;i++){
                    if(results.data[i].status=="OPEN")ec.counts.Open+=1;
                    else if(results.data[i].status=="UNAPPROVED")ec.counts.Unapproved+=1;
                    else if(results.data[i].status=="ACCEPTED")ec.counts.Accepted+=1;
                    else if(results.data[i].status=="CANCELLED")ec.counts.Cancelled+=1;
                    ec.counts.Total+=1;
                }
                function pushRA(){
                    if(results.data[count]!==undefined){
                        ec.rideAlongs.push(results.data[count]);
                        count+=1;
                        if(results.data[count]!==undefined){
                            $timeout(function(){
                                pushRA();
                            }, 200)
                        }
                    }
                }
                $timeout(function(){
                    ec.waitingForResponse=false;
                    if(results.data.length!==0)pushRA();
                }, 750);
                //console.log(results.data);
            }, error=>{
                ec.waitingForResponse=false;
            })
        }
        
        function sortEvents(status){
            ec.filterByStatus=status;
            ec.waitingForResponse=true;
            ec.rideAlongs=[];
            if(status!=='all') {
                getEventsData().then(results=> {
                    var count=0;
                    results.data = results.data.filter(ra=> {
                        return ra.status == status;
                    });
                    function pushRA(){
                        if(results.data[count]!==undefined){
                            ec.rideAlongs.push(results.data[count]);
                            count+=1;
                            if(results.data[count]!==undefined){
                                $timeout(function(){
                                    pushRA();
                                }, 200)
                            }
                        }
                    }
                    $timeout(function(){
                        ec.waitingForResponse=false;
                        if(results.data.length!==0)pushRA();
                    }, 750);
                }, error=> {
                    console.log(error);
                });
            }else{
                getEvents();
            }
        }

        function getEventsData(){
            return $http.get('/openRideAlongs').then(results=>{
                results.data=results.data.reverse();
                return results;
            }, error=>{
                ec.waitingForResponse=false;
            })
        }

        function showRADetails(ev, ind, ra){
            ec.selectedRideAlong=ra;
            ec.selectedIndex=ind;
            $mdDialog.show({
                controller: DialogController,
                templateUrl: 'templates/dialogs/event-view-dialog.html',
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose:true
            })
        }
        
        function resendNotifications(ra){
            $http.post('/resendNotifications', ra).then(results=>{
                console.log("Notifications were successfully sent");
                toaster.pop('success', "Success!", "All previously notified companies have been re-notified")
            }, error=>{
                console.log("There was an error resending the notifications!", error);
                toaster.pop('error', "Error!", error)
            })
        }
        
        //Event Dialog Controller

        function DialogController($scope, $mdDialog){
            $scope.rideAlong = ec.selectedRideAlong;
            $scope.selectedIndex=ec.selectedIndex;
            $scope.isOpen=$scope.rideAlong.status=='OPEN'||$scope.rideAlong.status=='ACCEPTED';
            $scope.waiting=false;
            
            $scope.reschedule=function(ra){
                console.log("You tried to reschedule this Ride Along!")
            };

            $scope.editInfo=function(ra){
                console.log("You tried to edit the info of this Ride Along")
            };
            
            $scope.changeOpenStatus=function(ra){
                if(ra.status=='OPEN'){
                    ra.status='CANCELLED';
                    $scope.isOpen=false;
                }else if(ra.status=='CANCELLED'){
                    ra.status='OPEN';
                    $scope.isOpen=true;
                }
            };
            
            $scope.specificNotification=function(){
                console.log("you tried to send a specific notification")
            };
            
            $scope.resendNotifications=resendNotifications;
            $scope.remove = ec.removeRA;
            $scope.changeStatus = function(ind, status){
                $scope.waiting=true;
                $timeout(function(){
                    $scope.waiting=false;
                }, 1000);
                ec.changeStatus(ind, status);
                $scope.rideAlong.status=status;
            };

            $scope.close=function(){
                $mdDialog.cancel();
            }
        }

        getEvents();
    }
    
    
})();