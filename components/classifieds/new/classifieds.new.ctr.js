(function () {
    "use strict";

    angular
        .module('ngClassifieds')
        .controller('newClassifiedsCtrl', function ($scope, $state, $mdSidenav, $mdDialog, $timeout, classifiedsFactory) {
            var self = this;
            self.sidenavOpen;
            self.saveClassified = saveClassified;

            $timeout(() => {
                $mdSidenav('left').open();
            });

            $scope.$watch(function () { return self.sidenavOpen }, function (value) {
                if (value === false) {
                    $mdSidenav('left').close().then(() => {
                        $state.go('classifieds');
                    });
                }
            });

            function saveClassified(classified) {
                if (classified) {
                    classified.contact = {
                        name: "Ygor Duarte",
                        phone: "(19) 999576569",
                        email: "ygordlp@gmail.com"
                    };
                    $scope.$emit('newClassified', classified);
                    self.sidenavOpen = false;
                }
            }

        });
})();