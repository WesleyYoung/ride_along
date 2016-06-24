/**
 * Created by I97143 on 6/8/2016.
 */
(function(){
    'use strict';
    
    angular.module('event-creator-controller', [])
        .controller('event-creator-controller', eventCreatorController);

    eventCreatorController.$inject=["listFactory", "$mdDialog", "$mdMedia", "$timeout", "$http"];
    
    function eventCreatorController(listFactory, $mdDialog, $mdMedia, $timeout, $http){
        var ecc = this;
        var today = new Date();

        ecc.$http=$http;

        ecc.regions=listFactory.regions();
        ecc.products=listFactory.products();
        //Having a bug where if you add a product, then leave the page and come back to it, the ecc.product.added boolean is still true but not added to the list. This seems to solve that issue
        for(var i=0;i<ecc.products.length;i++){ecc.products[i].added=false}
        for(var i=0;i<ecc.regions.length;i++){ecc.regions[i].added=false}

        ecc.assignProvinces=assignProvinces;
        ecc.assignCounties=assignCounties;
        
        ecc.minDate1=new Date(today.getFullYear(), today.getMonth(), today.getDate()+2);
        ecc.minDate2=new Date(today.getFullYear(), today.getMonth(), today.getDate()+9);
        ecc.selectedProducts=[];
        //ecc.selectedCounty='';
        //ecc.selectedRegion={};
        ecc.selectedProvince={};
        ecc.notes = "";
        
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
                templateUrl: 'templates/confirmation-dialog.html',
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

            //$scope.selectedProducts=ecc.selectedProducts;
            $scope.selectedRegion=ecc.selectedRegion;
            //$scope.selectedProvince=ecc.selectedProvince;
            //$scope.selectedCounty=ecc.selectedCounty;
            $scope.countyName=ecc.countyName;
            $scope.provinceName=ecc.provinceName;

            $scope.startDate=ecc.startDate;
            $scope.endDate=ecc.endDate;

            $scope.notes=ecc.notes;

            $scope.email=ecc.email;
            $scope.name = ecc.name;

            $scope.hide = function() {
                $mdDialog.hide();
            };
            $scope.cancel = function() {
                $mdDialog.cancel();
            };
            $scope.confirm = function() {
                //window.alert('You confirmed the ride-along');
                var postObj = {
                    name: $scope.name,
                    email: $scope.email,
                    startDate: $scope.startDate,
                    endDate: $scope.endDate,
                    region: $scope.selectedRegion.name,
                    province: $scope.provinceName,
                    county: $scope.countyName
                };

                $http.post('/formSubmit', postObj).then(function() {
                    window.alert('Submition successful!');
                });
                $mdDialog.hide();


            };

        }
        
    }
    
    
    
})();