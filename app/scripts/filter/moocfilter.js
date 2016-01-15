'use strict';


angular.module('mooc').filter('capitalize', function () {
    return function (input) {
        return (!!input) ? input.charAt(0).toUpperCase() + input.substr(1).toLowerCase() : '';
    }
}).filter('superTooltip', ['tooltipResource', function (tooltipResource) {
        return function (key) {
            return (tooltipResource[key]) ? (tooltipResource[key]) : '';
        };
    }])
;