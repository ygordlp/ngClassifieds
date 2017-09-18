(function () {
    "use strict";

    angular
        .module('ngClassifieds')
        .factory('classifiedsFactory', function ($http, $firebaseArray) {
            var ref = new Firebase('https://ngclassifieds-ygor.firebaseio.com/');

            function getClassifieds() {
                return $http.get('data/classifieds.json');
            }

            return {
                ref: $firebaseArray(ref),
                getClassifieds: getClassifieds
            };
        });
})();