/**
 * Created by I97143 on 7/21/2016.
 */
(function(){

    angular.module('companyController', [])
        
        .controller('companyController', companyController);

    companyController.$inject=["$http", "$mdDialog", "$mdMedia"];

    function companyController($http, $mdDialog, $mdMedia){
        var cc = this;
        
        cc.showTabDialog=showTabDialog;
        
        cc.companies = [];
        
        function getCompanies(){
            $http.get('/getCompanies').then(results=> {
                console.log(results.data);
                cc.companies = results.data
            })
        }
        getCompanies();

        function showTabDialog(ev){
            $mdDialog.show({
                controller: DialogController,
                templateUrl: 'templates/dialogs/company-creation-dialog.html',
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose:true
            }).then(function(answer) {

                }, function() {

                }
            );
        }

        function DialogController($scope, $mdDialog){

            $scope.addCompany=addCompany;
            $scope.addEmail=addEmail;
            $scope.cancel=$mdDialog.cancel;

            $scope.name = "";
            $scope.dba = "";
            $scope.phone = "";
            $scope.emails = [];
            $scope.newEmail = "";
            $scope.type="";

            function addCompany(){
                $http.post('/addCompany',{
                    name: $scope.name,
                    dba: $scope.dba,
                    phone: $scope.phone,
                    emails: $scope.emails,
                    type: $scope.type,
                    id: Math.floor((Math.random() * 999999) + 100000)
                }).then((err, response)=>{
                    if(err)throw err;
                    console.log("Added Company");
                })
            }
            
            function addEmail(){
                $scope.emails.push($scope.newEmail);
                $scope.newEmail="";
            }
        }
    }

})();