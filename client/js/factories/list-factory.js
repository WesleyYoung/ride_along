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

        ];

        lf.regions = [
            {
                name: "united_states",
                provinces: [
                    {name: "alaska", counties: []},
                    {name: "arizona", counties: []},
                    {name: "arkansas", counties: []},
                    {name: "california", counties: []},
                    {name: "colorado", counties: []},
                    {name: "connecticut", counties: []},
                    {name: "delaware", counties: []},
                    {name: "florida", counties: []},
                    {name: "georgia", counties: []},
                    {name: "hawaii", counties: []},
                    {name: "idaho", counties: []},
                    {name: "illinois", counties: []},
                    {name: "indiana", counties: []},
                    {name: "iowa", counties: []},
                    {name: "kansas", counties: []},
                    {name: "kentucky", counties: []},
                    {name: "louisiana", counties: []},
                    {name: "maine", counties: []},
                    {name: "maryland", counties: []},
                    {name: "massachusetts", counties: []},
                    {name: "michigan", counties: []},
                    {name: "minnesota", counties: []},
                    {name: "mississippi", counties: []},
                    {name: "missouri", counties: []},
                    {name: "montana", counties: []},
                    {name: "nebraska", counties: []},
                    {name: "nevada", counties: []},
                    {name: "new_hampshire", counties: []},
                    {name: "new_jersey", counties: []},
                    {name: "new_mexico", counties: []},
                    {name: "new_york", counties: []},
                    {name: "north_carolina", counties: []},
                    {name: "north_dakota", counties: []},
                    {name: "ohio", counties: []},
                    {name: "oklahoma", counties: []},
                    {name: "oregon", counties: []},
                    {name: "pennsylvania", counties: []},
                    {name: "rhode_island", counties: []},
                    {name: "south_carolina", counties: []},
                    {name: "south_dakota", counties: []},
                    {name: "tennessee", counties: []},
                    {name: "texas", counties: []},
                    { name: "utah", counties: [
                        //"beaver_county",
                        //"box_elder_county",
                        //"cache_county",
                        //"carbon_county",
                        //"daggett_county",
                        //"davis_county",
                        //"duchesne_county",
                        //"emery_county",
                        //"garfield_county",
                        //"grand_county",
                        //"iron_county",
                        //"juab_county",
                        //"kane_county",
                        //"millard_county",
                        //"morgan_county",
                        //"piute_county",
                        //"rich_county",
                        "salt_lake_county",
                        //"san_juan_county",
                        //"sanpete_county",
                        //"sevier_county",
                        //"summit_county",
                        //"tooele_county",
                        //"uintah_county",
                        "utah_county"//,
                        //"wasatch_county",
                        //"washington_county",
                        //'wayne_county',
                        //"weber_county"
                    ]},
                    {name: "vermont", counties: []},
                    {name: "virginia", counties: []},
                    {name: "washington", counties: []},
                    {name: "west_virginia", counties: []},
                    {name: "wisconsin", counties: []},
                    {name: "wyoming", counties: []},
                    {name: "territories", counties: [
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
                    ]}
                ],
                theme: {
                    btn_class: "btn-info",
                    flag: "united_states_flag.png"
                },
                added: false
            },
            {
                name: "europe",
                provinces: [
                    {name: "austria", counties: []},
                    {name: "belgium", counties: []},
                    {name: "bulgaria", counties: []},
                    {name: "croatia", counties: []},
                    {name: "cyprus", counties: []},
                    {name: "czech_republic", counties: []},
                    {name: "denmark", counties: []},
                    {name: "estonia", counties: []},
                    {name: "finland", counties: []},
                    {name: "france", counties: []},
                    {name: "germany", counties: []},
                    {name: "greece", counties: []},
                    {name: "hungary", counties: []},
                    {name: "ireland", counties: []},
                    {name: "italy", counties: []},
                    {name: "latvia", counties: []},
                    {name: "lithuania", counties: []},
                    {name: "luxembourg", counties: []},
                    {name: "malta", counties: []},
                    {name: "netherlands", counties: []},
                    {name: "poland", counties: []},
                    {name: "portugal", counties: []},
                    {name: "romania", counties: []},
                    {name: "slovakia", counties: []},
                    {name: "spain", counties: []},
                    {name: "sweden", counties: []},
                    {name: "united_kingdom", counties: []}
                ],
                theme: {
                    btn_class: "btn-indigo",
                    flag: "europe_flag.png"
                },
                added: false
            },
            {
                name: "australia",
                provinces: [
                    {name: "territorial", counties: []},
                    {name: "new_south_wales", counties: []},
                    {name: "queensland", counties: []},
                    {name: "south_australia", counties: []},
                    {name: "tasmania", counties: []},
                    {name: "victoria", counties: []},
                    {name: "western_australia", counties: []}
                ],
                theme: {
                    btn_class: "btn-danger",
                    flag: "australia_flag.png"
                },
                added: false
            },
            {
                name: "canada",
                provinces: [
                    {name: "ontario", counties: []},
                    {name: "quebec", counties: []},
                    {name: "nova_scotia", counties: []},
                    {name: "new_brunswick", counties: []},
                    {name: "manitoba", counties: []},
                    {name: "british_columbia", counties: []},
                    {name: "prince_edward_island", counties: []},
                    {name: "saskatchewan", counties: []},
                    {name: "alberta", counties: []},
                    {name: "newfoundland_and_labrador", counties: []}
                ],
                theme: {
                    btn_class: "btn-darkgreen",
                    flag: "canada_flag.png"
                },
                added: false
            }
        ];

        lf.products=[
            {name: "Xactimate", added: false, theme: {btn_class: "btn-coral", logo: "xactimate_logo.png"}},
            {name: "Xactanalysis", added: false, theme: {btn_class: "btn-primary", logo: "xactanalysis_logo.png"}},
            {name: "Xactanalysis Mobile", added: false, theme: {btn_class: "btn-success", logo: "xactanalysis_mobile_logo.png"}}
            //{name: "Product 4", theme: {btn_class: "btn-coral"}}
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