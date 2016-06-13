/**
 * Created by I97143 on 6/13/2016.
 */
(function(){
    'use strict';
    
    angular.module('list-factory',[])
        .factory('listFactory', listFactory);

    listFactory.$inject=[];

    function listFactory(){
        var lf = this;
        
        var futureRegions=[
            {
                name: "australia",
                provinces: {
                    territorial: [],
                    new_south_wales: [],
                    queensland: [],
                    south_australia: [],
                    tasmania: [],
                    victoria: [],
                    western_australia: []
                },
                theme: {
                    btn_class: "btn-danger"
                }
            },
            {
                name: "canada",
                provinces: {
                    ontario: [],
                    quebec: [],
                    nova_scotia: [],
                    new_brunswick: [],
                    manitoba: [],
                    british_columbia: [],
                    prince_edward_island: [],
                    saskatchewan: [],
                    alberta: [],
                    newfoundland_and_labrador: []
                },
                theme: {
                    btn_class: "btn-darkgreen"
                }
            }
        ];

        lf.regions = [
            {
                name: "united_states",
                provinces: {
                    alaska: [],
                    arizona: [],
                    arkansas: [],
                    california: [],
                    colorado: [],
                    connecticut: [],
                    delaware: [],
                    florida: [],
                    georgia: [],
                    hawaii: [],
                    idaho: [],
                    illinois: [],
                    indiana: [],
                    iowa: [],
                    kansas: [],
                    kentucky: [],
                    louisiana: [],
                    maine: [],
                    maryland: [],
                    massachusetts: [],
                    michigan: [],
                    minnesota: [],
                    mississippi: [],
                    missouri: [],
                    montana: [],
                    nebraska: [],
                    nevada: [],
                    new_hampshire: [],
                    new_jersey: [],
                    new_mexico: [],
                    new_york: [],
                    north_carolina: [],
                    north_dakota: [],
                    ohio: [],
                    oklahoma: [],
                    oregon: [],
                    pennsylvania: [],
                    rhode_island: [],
                    south_carolina: [],
                    south_dakota: [],
                    tennessee: [],
                    texas: [],
                    utah: [
                        "beaver_county",
                        "box_elder_county",
                        "cache_county",
                        "carbon_county",
                        "daggett_county",
                        "davis_county",
                        "duchesne_county",
                        "emery_county",
                        "garfield_county",
                        "grand_county",
                        "iron_county",
                        "juab_county",
                        "kane_county",
                        "millard_county",
                        "morgan_county",
                        "piute_county",
                        "rich_county",
                        "salt_lake_county",
                        "san_juan_county",
                        "sanpete_county",
                        "sevier_county",
                        "summit_county",
                        "tooele_county",
                        "uintah_county",
                        "utah_county",
                        "wasatch_county",
                        "washington_county",
                        'wayne_county',
                        "weber_county"
                    ],
                    vermont: [],
                    virginia: [],
                    washington: [],
                    west_virginia: [],
                    wisconsin: [],
                    wyoming: [],
                    territories: [
                        "american_samoa",
                        "bajo_nuevo_bank",
                        "baker_island",
                        "howland_island",
                        "guam",
                        "jarvis_island",
                        "johnston_atoll",
                        "kingman_reef",
                        "midway_islands",
                        "navassa_island",
                        "northern_mariana_islands",
                        "palmyra_atoll",
                        "puerto_rico",
                        "serranilla_bank",
                        "us_virgin_islands",
                        "wake_island"
                    ]
                },
                theme: {
                    btn_class: "btn-info"
                }
            },
            {
                name: "europe",
                provinces: {
                    austria: [],
                    belgium: [],
                    bulgaria: [],
                    croatia: [],
                    cyprus: [],
                    czech_republic: [],
                    denmark: [],
                    estonia: [],
                    finland: [],
                    france: [],
                    germany: [],
                    greece: [],
                    hungary: [],
                    ireland: [],
                    italy: [],
                    latvia: [],
                    lithuania: [],
                    luxembourg: [],
                    malta: [],
                    netherlands: [],
                    poland: [],
                    portugal: [],
                    romania: [],
                    slovakia: [],
                    spain: [],
                    sweden: [],
                    united_kingdom: []
                },
                theme: {
                    btn_class: "btn-indigo"
                }
            }
        ];

        lf.products=[
            {name: "Xactimate", theme: {btn_class: "btn-warning"}},
            {name: "Xactanalysis", theme: {btn_class: "btn-primary"}},
            {name: "Xactanalysis Mobile", theme: {btn_class: "btn-success"}},
            {name: "Product 4", theme: {btn_class: "btn-coral"}}
        ];

        lf.btnClasses = [
            "btn-coral",
            "btn-indigo",
            "btn-danger",
            "btn-darkgreen",
            "btn-warning",
            "btn-info",
            "btn-success",
            "btn-primary"
        ];
        
        return {
            regions: function(){
                return lf.regions;
            },
            products: function(){
                return lf.products;
            }
        }
    }

})();