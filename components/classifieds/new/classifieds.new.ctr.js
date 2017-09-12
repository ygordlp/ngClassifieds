(function() {
    "use strict";

    angular
        .module('ngClassifieds')
        .controller('newClassifiedsCtrl', function($mdSidenav, $mdDialog, $timeout, classifiedsFactory) {
            var self = this;

            $mdSidenav('left').open();
        });
})();