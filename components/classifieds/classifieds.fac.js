(function() {
    "use strict";

    angular
        .module('ngClassifieds')
        .factory('classifiedsFactory', function($http, $firebaseArray) {
            var firebase = new Firebase('https://ngclassifieds-ygor.firebaseio.com/');

            return {
                firebase: $firebaseArray(firebase)
            };
        });
})();