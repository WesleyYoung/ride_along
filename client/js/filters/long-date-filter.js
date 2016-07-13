/**
 * Created by I97143 on 6/17/2016.
 */
(function(){
    'use strict';

    var app = angular.module('long-date-filter', []);

    app.filter('longDate', longDate);

    function longDate(){
        var monthNames = [
            "January", "February", "March",
            "April", "May", "June", "July",
            "August", "September", "October",
            "November", "December"
        ];

        function convert(input){
            var day = input.getDate(),
                month = input.getMonth(),
                year = input.getFullYear(),
                suffix = day=="1"||day=="21"||day=="31"?"st":day=="2"||day=="22"?"nd":day=="3"||day=="23"?"rd":"th";

            return monthNames[month] + " " + day + suffix + " " + year
        }

        return function(input){
            if(input!==undefined){
                if(typeof input == 'object'){
                    return convert(input)
                }else if(typeof input == 'string'){
                    return convert(new Date(input))
                }
            }else{
                return input;
            }
        }
    }

    app.filter('longDateTime', longDateTime);

    function longDateTime(){
        var monthNames = [
            "January", "February", "March",
            "April", "May", "June", "July",
            "August", "September", "October",
            "November", "December"
        ];

        function convert(input){
            var day = input.getDate(),
                month = input.getMonth(),
                year = input.getFullYear(),
                hour = input.getHours(),
                minute = input.getMinutes(),
                suffix = day=="1"||day=="21"||day=="31"?"st":day=="2"||day=="22"?"nd":day=="3"||day=="23"?"rd":"th",
                tSuffix = "am";
            
            if(hour >= 12){
                tSuffix="pm";
                if(hour>12){
                    hour -= 12;
                }
            }

            return monthNames[month] + " " + day + suffix + " " + year + " at " + hour + ":" + minute + " " + tSuffix;
        }

        return function(input){
            if(input!==undefined){
                if(typeof input == 'object'){
                    return convert(input)
                }else if(typeof input == 'string'){
                    return convert(new Date(input))
                }
            }else{
                return input;
            }
        }
    }


})();