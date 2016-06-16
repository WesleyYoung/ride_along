/**
 * Created by I97143 on 6/8/2016.
 */
(function(){
    'use strict';
    
    angular.module('event-creator-controller', [])
        .controller('event-creator-controller', eventCreatorController);

    eventCreatorController.$inject=["listFactory"];
    
    function eventCreatorController(listFactory){
        var ecc = this;

        ecc.regions=listFactory.regions();
        ecc.products=listFactory.products();
        //Having a bug where if you add a product, then leave the page and come back to it, the ecc.product.added boolean is still true but not added to the list. This seems to solve that issue
        for(var i=0;i<ecc.products.length;i++){ecc.products[i].added=false}
        for(var i=0;i<ecc.regions.length;i++){ecc.regions[i].added=false}

        ecc.toggleProduct=toggleProduct;
        ecc.toggleRegion=toggleRegion;

        //ecc.startDate = new Date();
        ////ecc.endDate = new Date();
        ecc.selectedProducts=[];
        //ecc.selectedCounty='';
        ecc.selectedRegion={};
        ecc.selectedProvince={};
        ecc.notes = "";


        function toggleProduct(product){
            var patt = new RegExp(product, "g"),
                currentProducts = ecc.selectedProducts.join(" "),
                productsArray = ecc.selectedProducts,
                out = [];
            for(var i=0;i<ecc.products.length;i++){
                if(ecc.products[i].name==product){
                    ecc.products[i].added==true?ecc.products[i].added=false:ecc.products[i].added=true;
                }
            }

            if(patt.test(currentProducts)){
                for(var i=0;i<productsArray.length;i++){
                    if(productsArray[i]!==product){
                        out.push(productsArray[i]);
                    }
                }
                ecc.selectedProducts=out;
                //currentProducts = ecc.selectedProducts.join(" ");
                //console.log(`Removed ${product}! ${currentProducts}`)
            }else{
                ecc.selectedProducts.push(product);
                //console.log(`Added ${product}!`)
            }
        }
        
        function toggleRegion(region){
            ecc.selectedCounties=[];
            ecc.selectedProvince={};
            if(ecc.selectedRegion.name!==undefined){
                if(ecc.selectedRegion.name==region.name){
                    for(var i=0;i<ecc.regions.length;i++){
                        ecc.regions[i].added=false;
                    }
                    ecc.selectedRegion=[];
                    //console.log(`Region ${region.name} is now deselected`)
                }else{
                    ecc.selectedRegion=region;
                    for(var i=0;i<ecc.regions.length;i++){
                        if(ecc.regions[i].name==region.name){
                            ecc.regions[i].added=true;
                        }else{
                            ecc.regions[i].added=false;
                        }
                    }
                    //console.log(`Region ${region.name} is now selected`)
                }
            }else{
                ecc.selectedRegion=region;
                for(var i=0;i<ecc.regions.length;i++){
                    if(ecc.regions[i].name==region.name){
                        ecc.regions[i].added=true;
                    }
                }
                //console.log(`Region ${region.name} is now selected`)
            }
        }
    }
})();