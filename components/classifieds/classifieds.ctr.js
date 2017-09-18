(function() {
    "use strict";

    angular
        .module('ngClassifieds')
        .controller('classifiedsCtrl', function($scope, $state, $http, classifiedsFactory, $mdSidenav, $mdToast, $mdDialog) {
            var self = this;

            self.categories;
            self.classified;

            self.classifieds = classifiedsFactory.firebase;

            self.openSidebar = openSidebar;

            self.classifieds.$loaded().then((classifieds) => {
                self.categories = getCategories(classifieds);
            });

            $scope.$on('newClassified', (event, item) => {
                self.classifieds.$add(item);
                showToast('Classified saved');
            });

            $scope.$on('deleteClassified', (event, item) => {
                self.classifieds.$remove(item).then(() => {
                    showToast('Item deleted!');
                });
            });

            $scope.$on('editSave', (event, message) => {
                showToast(message);
            });

            function openSidebar() {
                $state.go('classifieds.new');
            }

            function showToast(message) {
                $mdToast.show($mdToast.simple()
                    .content(message)
                    .position('top, right')
                    .hideDelay(3000));
            }

            function getCategories(classifieds) {
                var categories = [];
                angular.forEach(classifieds, function(item) {
                    angular.forEach(item.categories, function(category) {
                        categories.push(category);
                    });
                });

                return _.uniq(categories);
            }
        });
})();