/**
 * Created by I97143 on 7/21/2016.
 */
(function(){

    angular.module('companyController', [])
        
        .controller('companyController', companyController);

    companyController.$inject=["$http", "$mdDialog", "$mdMedia", "$timeout", "toaster", "getDataFactory", "$location", "loadingDialogFactory"];

    function companyController($http, $mdDialog, $mdMedia, $timeout, toaster, getDataFactory, $location, loadingDialogFactory){
        var cc = this,
            ldf = loadingDialogFactory;

        //If the user has reached this page through clicking on a company's information, these variables will store that data
        var openSpecific = $location.search().openSpecific,
            returnId = $location.search().returnId,
            returnPath = $location.search().returnPath,
            returnPage = $location.search().returnPage,
            page = parseInt($location.search().page)||0;

        if(openSpecific)ldf.show({title: "getting company...", color: "md-accent"});
        
        cc.showCreatorDialog=showCreatorDialog;
        cc.showInfoDialog=showInfoDialog;
        cc.openCoDetails=openCODetails;
        cc.removeCo=removeCO;
        
        cc.companies = [];
        cc.selectedCompany = {};
        
        cc.waitingForResponse = true;
        
        function getCompanies(){
            cc.waitingForResponse = true;
            cc.companies=[];
            getDataFactory.companies().then(results=> {
                //ldf.hide();
                var count=0;
                function pushCO(){
                    if(results[count]!==undefined){
                        cc.companies.push(results[count]);
                        count+=1;
                        if(results[count]!==undefined){
                            $timeout(function(){
                                pushCO();
                            }, 100);
                        }
                        else if(openSpecific){
                            for(var i=0;i<cc.companies.length;i++){
                                console.log(cc.companies[i].id);
                                if(cc.companies[i].id==openSpecific){
                                    showInfoDialog(cc.companies[i], null, page);
                                }
                            }
                        }
                    }
                }
                $timeout(function(){
                    //console.log(results.data);
                    cc.waitingForResponse = false;
                    if(results.length!==0)pushCO();
                }, 300);
            }, error=>{
                if(error){
                    console.log(error);
                    cc.waitingForResponse = false;
                }
            })
        }
        getCompanies();

        function uniqueId(){
            var letters = ["A", "E", "I", "O", "U"];
            return Math.floor((Math.random() * 999999) + 100000) + letters[Math.floor((Math.random()*(letters.length-1)))] + Math.floor((Math.random() * 999999) + 100000);
        }

        function openCODetails(co){
            console.log(co);
        }
        
        function removeCO(ra){
            var confirm = $mdDialog.confirm()
                .title('Are you sure?')
                .textContent('As of now, companies cannot be re-added once removed')
                .ariaLabel('Are you sure you want to delete this company?')
                .ok('Delete')
                .cancel('Cancel');
            $mdDialog.show(confirm).then(function(){
                console.log("Trying...");
                $http.post('/removeCompany', ra).then(results=>{
                    console.log("Company Removed!");
                    getCompanies();
                }, error=>{
                    throw error;
                })
            })

        }

        function showInfoDialog(co, ev, page){
            cc.selectedCompany = co;
            $mdDialog.show({
                controller: InfoDialogController,
                templateUrl: 'templates/dialogs/company-view-dialog.html',
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose:openSpecific==undefined
            }).then(function(answer) {

                }, function() {

                }
            );

            function InfoDialogController($scope, $mdDialog){
                var id = uniqueId();

                $scope.company = cc.selectedCompany;
                $scope.selectedTab  = page||0;
                $scope.newContact={
                    name: "",
                    email: "",
                    phone: "",
                    id: id
                };

                getDataFactory.rideAlongsByIds($scope.company.notifiedRideAlongs).then(results=>{
                    console.log(results);
                    $scope.company.notifiedRideAlongs=results;
                }, err=>{
                    throw err;
                });

                $scope.cancel=function(){
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

                $scope.switchToCreator=function(){
                    $scope.selectedTab=2;
                };

                $scope.addContact=function(){
                    $http.post('/addContact', {id: $scope.company.id, contact: $scope.newContact})
                        .then(result=>{
                            getCompanies();
                            toaster.pop('success', 'Contact Added!', '');
                            var id = uniqueId();
                            $scope.newContact={
                                name: "",
                                email: "",
                                phone: "",
                                id: id
                            };
                            $scope.company=result.data.updated;
                        }, error=>{
                            toaster.pop('error', 'There was an issue trying to add the contact');
                            console.log(error);
                        })
                };

                $scope.removeContact=function(contact){
                    var confirm = $mdDialog.confirm()
                        .title('Are you sure?')
                        .textContent('As of now, contacts cannot be re-added once removed')
                        .ariaLabel('Are you sure you want to delete this contact?')
                        .ok('Delete')
                        .cancel('Cancel');
                    $mdDialog.show(confirm).then(function(){
                        $http.post('/removeContact', {companyId: $scope.company.id, contactId: contact.id})
                            .then(result=>{
                                getCompanies();
                                toaster.pop('success', 'Contact Removed');
                                $scope.company=result.data.updated;
                            }, error=>{
                                toaster.pop('error', 'There was an error');
                                console.log(error);
                            })
                    })
                }
            }
        }
        

        
        
        function showCreatorDialog(ev){
            $mdDialog.show({
                controller: CreatorDialogController,
                templateUrl: 'templates/dialogs/company-creation-dialog.html',
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose:true
            }).then(function(answer) {

                }, function() {

                }
            );
        }

        function CreatorDialogController($scope, $mdDialog){
            var id = uniqueId();
            
            $scope.addCompany=addCompany;
            $scope.addContact=addContact;
            $scope.assignRegions=assignRegions;
            $scope.cancel=$mdDialog.cancel;
            
            $scope.continueForm=function(){
                $scope.selectedTab=1;
            };

            $scope.selectedTab = 0;

            //Options
            $scope.regions = getDataFactory.regions();
            $scope.provinces = [];
            $scope.counties = [];

            //Company attributes
            $scope.name = "";
            $scope.address = "";
            $scope.emails = [];
            $scope.type="";
            $scope.region = "";
            $scope.province = "";
            $scope.county = "";
            $scope.contacts = [];

            //Contact attributes
            $scope.contact = {
                name: "",
                email: "",
                phone: "",
                id: id
            };

            function addCompany(){
                var id = uniqueId();
                $http.post('/addCompany',{
                    name: $scope.name,
                    address: $scope.address,
                    contacts: $scope.contacts,
                    type: $scope.type,
                    id: id,
                    acceptedRideAlongs: [],
                    notifiedRideAlongs: [],
                    region: $scope.region,
                    province: $scope.province,
                    county: $scope.county
                }).then(response=>{
                    toaster.pop('success', 'Your company has been successfully submitted');
                    $scope.cancel();
                    getCompanies();
                    cc.showInfoDialog({
                        name: $scope.name,
                        address: $scope.address,
                        contacts: $scope.contacts,
                        type: $scope.type,
                        id: id,
                        acceptedRideAlongs: [],
                        notifiedRideAlongs: [],
                        region: $scope.region,
                        province: $scope.province,
                        county: $scope.county
                    });
                    console.log("Added Company");
                }, error=>{
                    toaster.pop('error', "There was an error trying to submit your company");
                    console.log(error);
                })
            }

            function assignRegions(section){
                if(section=='provinces'&&$scope.region!==""){
                    for(var i=0;i<$scope.regions.length;i++){
                        if($scope.regions[i].name==$scope.region){
                            $scope.provinces=$scope.regions[i].provinces;
                            return;
                        }
                    }
                }else if(section=='counties'&&$scope.provinces!==[]&&$scope.province!==""){
                    for(var i=0;i<$scope.provinces.length;i++){
                        if($scope.provinces[i].name==$scope.province){
                            $scope.counties=$scope.provinces[i].counties;
                            return;
                        }
                    }
                }else{
                    console.log("there was an issue loading the different regions")
                }
            }
            
            function addContact(){
                $scope.contacts.push($scope.contact);
                var id = uniqueId();
                $scope.contact={
                    name: "",
                    email: "",
                    phone: "",
                    id: id
                };
            }
        }
    }

})();