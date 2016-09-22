/**
 * Created by I97143 on 6/8/2016.
 */
(function(){
    'use strict';
    
    angular.module('events-controller', [])
        .controller('events-controller', eventsController);
    
    eventsController.$inject=["$http", "$mdDialog", "$mdMedia", "$timeout", "toaster", "getDataFactory", "$location", "loadingDialogFactory"];
    
    function eventsController($http, $mdDialog, $mdMedia, $timeout, toaster, getDataFactory, $location, loadingDialogFactory){
        var ec = this,
            ldf = loadingDialogFactory;

        ec.rideAlongs=[];
        ec.searchText="";
        ec.waitingForResponse=false;
        ec.filterByStatus="all";
        
        //If the user is directed to the page to a specific event, these are the variables which hold that data
        var openSpecific = $location.search().openSpecific,
            returnId = $location.search().returnId,
            returnPath = $location.search().returnPath,
            page = parseInt($location.search().page)||0;

        if(openSpecific)ldf.show({title: "getting ride-along..."});
        
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
                function pushRA(){
                    if(results.data[count]!==undefined){
                        ec.rideAlongs.push(results.data[count]);
                        count+=1;
                        if(results.data[count]!==undefined){
                            $timeout(function(){
                                pushRA();
                            }, 100)
                        }
                        else if(openSpecific){
                            ldf.hide(function() {
                                for (var i = 0; i < ec.rideAlongs.length; i++) {
                                    if (ec.rideAlongs[i].id == openSpecific) {
                                        showRADetails(null, i, ec.rideAlongs[i], page);
                                    }
                                }
                            });
                        }
                    }
                }
                $timeout(function(){
                    ec.waitingForResponse=false;
                    //ldf.hide();
                    if(results.data.length!==0)pushRA();
                }, 300);
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
                        }else if(openSpecific){
                            console.log(openSpecific);
                            for(var i=0;i<ec.rideAlongs.length;i++){
                                console.log(ec.rideAlongs[i].id);
                                if(ec.rideAlongs[i].id==openSpecific){
                                    showInfoDialog(null, i, ec.rideAlongs[i], page);
                                }
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

        function showRADetails(ev, ind, ra, page){
            ec.selectedRideAlong=ra;
            ec.selectedIndex=ind;
            $mdDialog.show({
                controller: DialogController,
                templateUrl: 'templates/dialogs/event-view-dialog.html',
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose:openSpecific==undefined
            });

            //Event Dialog Controller

            function DialogController($scope, $mdDialog){
                $scope.rideAlong = ec.selectedRideAlong;
                $scope.notified=[];
                $scope.selectedTab=0||page;
                getDataFactory.companiesByIds($scope.rideAlong.notified).then(results=>{
                    $scope.notified = results;
                    if($scope.rideAlong.status=="ACCEPTED"){
                        getDataFactory.companiesByIds([$scope.rideAlong.accepted.company]).then(results=>{
                            $scope.acceptingCompany=results[0];
                        }, err=>{
                            if(err)throw err;
                        });
                    }
                }, err=>{
                    if(err)throw err;
                });
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
                    if(openSpecific){
                        console.log();
                        if(returnPath){
                            if(returnId){
                                $location.search("openSpecific="+returnId+"&page="+returnPage||0);
                            }else{
                                $location.search("/")
                            }
                            $location.path(returnPath)
                        }else{
                            $location.search('/');
                        }
                    }
                };
            }
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
        
        

        getEvents();
    }
    
    
})();