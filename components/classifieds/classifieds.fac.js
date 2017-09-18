(function() {
    "use strict";

    angular
        .module('ngClassifieds')
        .factory('classifiedsFactory', function($http, $firebaseArray) {
            var ref = new Firebase('https://ngclassifieds-ygor.firebaseio.com/classifieds');

            return {
                firebase: $firebaseArray(ref)
            };
        });
})();