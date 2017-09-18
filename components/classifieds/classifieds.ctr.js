(function () {
    "use strict";

    angular
        .module('ngClassifieds')
        .controller('classifiedsCtrl', function ($scope, $state, $http, classifiedsFactory, $mdSidenav, $mdToast, $mdDialog) {
            var self = this;

            self.categories;
            self.classified;
            self.classifieds;

            self.openSidebar = openSidebar;
            self.editClassified = editClassified;
            self.deleteClassified = deleteClassified;

            classifiedsFactory.getClassifieds().then((classifieds) => {
                self.classifieds = classifieds.data;
                self.categories = getCategories(self.classifieds);

                var firebase = classifiedsFactory.ref;

                angular.forEach(self.classifieds, (item) => {
                    console.log('adding item', item.title);
                    firebase.add(item);
                });
            });

            $scope.$on('newClassified', (event, classified) => {
                classified.id = self.classifieds.length + 1;
                self.classifieds.push(classified);
                showToast('Classified saved');
            });

            $scope.$on('editSave', (event, message) => {
                showToast(message);
            });

            function openSidebar() {
                $state.go('classifieds.new');
            }

            function editClassified(classified) {
                $state.go('classifieds.edit', {
                    id: classified.id,
                    classified: classified
                });
            }

            function deleteClassified(event, classified) {
                var confirm = $mdDialog.confirm()
                    .title('Are you sure you want to delete ' + classified.title + '?')
                    .ok('Yes')
                    .cancel('No')
                    .targetEvent(event);

                $mdDialog.show(confirm).then(() => {
                    var index = self.classifieds.indexOf(classified);
                    self.classifieds.splice(index, 1);
                    showToast('Item deleted!');
                }, () => {
                    //Nothing really;
                });
            }

            function showToast(message) {
                $mdToast.show($mdToast.simple()
                    .content(message)
                    .position('top, right')
                    .hideDelay(3000));
            }

            function getCategories(classifieds) {
                var categories = [];
                angular.forEach(classifieds, function (item) {
                    angular.forEach(item.categories, function (category) {
                        categories.push(category);
                    });
                });

                return _.uniq(categories);
            }
        });
})();