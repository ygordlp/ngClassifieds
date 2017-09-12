(function() {
    "use strict";

    angular
        .module('ngClassifieds')
        .controller('classifiedsCtrl', function($scope, $state, $http, classifiedsFactory, $mdSidenav, $mdToast, $mdDialog) {
            var self = this;

            self.categories;
            self.classified;
            self.classifieds;
            self.editting;

            self.openSidebar = openSidebar;
            self.closeSidebar = closeSidebar;
            self.saveClassified = saveClassified;
            self.editClassified = editClassified;
            self.saveEdit = saveEdit;
            self.deleteClassified = deleteClassified;


            classifiedsFactory.getClassifieds().then((classifieds) => {
                console.log('Data received');
                self.classifieds = classifieds.data;
                self.categories = getCategories(self.classifieds);
            });

            var contact = {
                name: "Ygor Duarte",
                phone: "(19) 999576569",
                email: "ygordlp@gmail.com"
            };

            function openSidebar() {
                $state.go('classifieds.new');
            }

            function closeSidebar() {
                $mdSidenav('left').close();
                self.classified = {};
                self.editting = false;
            }

            function saveClassified(classified) {
                if (classified) {
                    classified.contact = contact;
                    self.classifieds.push(classified);
                    self.classified = {};
                    closeSidebar();
                    showToast('Classified Saved!');
                }
            }

            function editClassified(classified) {
                self.editting = true;
                openSidebar();
                self.classified = classified;
            }

            function saveEdit() {
                closeSidebar();
                showToast('Classified Updated!');
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
                angular.forEach(classifieds, function(item) {
                    angular.forEach(item.categories, function(category) {
                        categories.push(category);
                    });
                });

                return _.uniq(categories);
            }

        });
})();