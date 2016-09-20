/**
 * Created by I97143 on 6/8/2016.
 */
(function(){
    'use strict';
    
    angular.module('event-creator-controller', [])
        .controller('event-creator-controller', eventCreatorController);

    eventCreatorController.$inject=["listFactory", "$mdDialog", "$mdMedia", "$timeout", "$http", "toaster", "loadingDialogFactory"];
    
    function eventCreatorController(listFactory, $mdDialog, $mdMedia, $timeout, $http, toaster, loadingDialogFactory){
        var ecc = this;
        var today = new Date();

        //Injected variables
        var ldf=loadingDialogFactory;

        //ldf.show({
        //    color: "kth",
        //    effect: "cycle",
        //    interval: 3000
        //});

        ecc.$http=$http;

        ecc.regions=listFactory.regions();
        ecc.products=listFactory.products();

        ecc.assignProvinces=assignProvinces;
        ecc.assignCounties=assignCounties;
        ecc.assignRegions=assignRegions;
        
        ecc.minDate1=new Date(today.getFullYear(), today.getMonth(), today.getDate()+2);
        ecc.minDate2=new Date(today.getFullYear(), today.getMonth(), today.getDate()+9);
        ecc.selectedProducts=[];
        ecc.selectedProvince={};
        ecc.notes = "";

        function assignRegions(section, name){
            if(section=='provinces'){
                for(var i=0;i<ecc.regions.length;i++){
                    if(ecc.regions[i].name==name){
                        ecc.selectedRegion=ecc.regions[i];
                        return;
                    }
                }
            }else if(section=='counties'){
                for(var i=0;i<ecc.selectedRegion.provinces.length;i++){
                    if(ecc.selectedRegion.provinces[i].name==name){
                        ecc.selectedProvince=ecc.selectedRegion.provinces[i];
                        return;
                    }
                }
            }else{
                console.log("there was an issue loading the different regions")
            }
        }
        
        function assignProvinces(reg){
            return $timeout(function(){
                for(var i=0;i<ecc.regions.length;i++){
                    if(ecc.regions[i].name==reg){
                        ecc.selectedRegion=ecc.regions[i];
                        //ecc.selectedProvince = ecc.regions[i].provinces;
                        console.log(ecc.regions[i].name, reg)
                    }
                }
                console.log("hello")
            }, 650)

        }
        
        function assignCounties(prov){
            return $timeout(function(){
                for(var i=0;i<ecc.selectedRegion.provinces.length;i++){
                    if(ecc.selectedRegion.provinces[i].name==prov){
                        ecc.selectedProvince=ecc.selectedRegion.provinces[i];
                    }
                }
            }, 650)
        }

        ecc.showTabDialog = function(ev) {
            $mdDialog.show({
                controller: DialogController,
                templateUrl: 'templates/dialogs/confirmation-dialog.html',
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose:true
            }).then(function(answer) {
                    
                }, function() {
                    
                }
            );
        };

        function DialogController($scope, $mdDialog) {
            
            var $http = ecc.$http;
            
            var id = uniqueId();
            
            $scope.ra={
                //selectedRegion:ecc.selectedRegion,
                region: ecc.selectedRegion.name,
                county:ecc.countyName,
                province:ecc.provinceName,
                startDate:ecc.startDate,
                endDate:ecc.endDate,
                department: ecc.department,
                phone: ecc.phone,
                notes: $scope.notes,
                email: ecc.email,
                creationDate: new Date(),
                name: ecc.name,
                status: "OPEN",
                notified: [],
                id: id,
                accepted:{
                    acceptedCompany: "",
                    acceptedContact: "",
                    rap: {},
                    manager: {}
                }
            };
            $scope.edits={
                region: false,
                province: false,
                county: false,
                dates: false,
                department: false,
                phone: false,
                email: false,
                name: false
            };
            $scope.hide = function() {
                $mdDialog.hide();
            };
            $scope.cancel = function() {
                $mdDialog.cancel();
            };
            $scope.confirm = function(ev) {
                var confirm = $mdDialog.confirm()
                    .title('Are you sure you\'d like to schedule this ride-along?')
                    .textContent(`
                        DISCLAIMER: By clicking 'confirm' you (${$scope.ra.name}) agree to accept any valid responses from ride along partners from ${new Date($scope.ra.startDate).legibleDate()} to ${new Date($scope.ra.endDate).legibleDate()}
                    `)
                    .ariaLabel('Confirm your ride-along')
                    .targetEvent(ev)
                    .ok('Confirm')
                    .cancel('Cancel');
                $mdDialog.show(confirm).then(function(result) {
                    var postObj = $scope.ra;
                    $http.post('/formSubmit', postObj).then(function(results){
                        ldf.hide();
                        console.log('Submission successful!');
                        console.log(postObj.id);
                        if(results.data.companies.length>0)toaster.pop('success', 'The appropriate companies have been notified of your ride-along');
                        else toaster.pop('warning', 'Your ride-along has been successfully saved, but no contacts met the criteria');
                    }, function(err){
                        toaster.pop('error', 'There was an error while attempting to submit your ride-along');
                        ldf.hide();
                        if(err)throw err;
                    });
                    $mdDialog.hide();
                    ldf.show({
                        color: "md-warn",
                        effect: "cycle",
                        interval: 3000
                    });
                }, function() {
                    console.log('ride-along cancelled')
                });

            };

            function uniqueId(){
                var letters = ["A", "E", "I", "O", "U"];
                return Math.floor((Math.random() * 999999) + 100000) + letters[Math.floor((Math.random()*(letters.length-1)))] + Math.floor((Math.random() * 999999) + 100000);
            }

            Date.prototype.legibleDate=function(){
                var input = this;
                var monthNames = [
                    "January", "February", "March",
                    "April", "May", "June", "July",
                    "August", "September", "October",
                    "November", "December"
                ];
                var day = input.getDate(),
                    month = input.getMonth(),
                    year = input.getFullYear(),
                    suffix = day=="1"||day=="21"||day=="31"?"st":day=="2"||day=="22"?"nd":day=="3"||day=="23"?"rd":"th";

                return monthNames[month] + " " + day + suffix + " " + year;
            };
        }
    }
})();