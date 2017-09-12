(function() {
    "use strict";

    angular
        .module('ngClassifieds')
        .controller('classifiedsCtrl', function($scope, $http, classifiedsFactory, $mdSidenav, $mdToast, $mdDialog) {
            classifiedsFactory.getClassifieds().then((classifieds) => {
                console.log('Data received');
                $scope.classifieds = classifieds.data;
                $scope.categories = getCategories($scope.classifieds);
            });

            var contact = {
                name: "Ygor Duarte",
                phone: "(19) 999576569",
                email: "ygordlp@gmail.com"
            };

            $scope.openSidebar = function() {
                $mdSidenav('left').open();
            };

            $scope.closeSidebar = function() {
                $mdSidenav('left').close();
                $scope.classified = {};
                $scope.editting = false;
            };

            $scope.saveClassified = function(classified) {
                if (classified) {
                    classified.contact = contact;
                    $scope.classifieds.push(classified);
                    $scope.classified = {};
                    $scope.closeSidebar();
                    showToast('Classified Saved!');
                }
            };

            $scope.editClassified = function(classified) {
                $scope.editting = true;
                $scope.openSidebar();
                $scope.classified = classified;
            };

            $scope.saveEdit = function() {
                $scope.closeSidebar();
                showToast('Classified Updated!');
            };

            $scope.deleteClassified = function(event, classified) {
                var confirm = $mdDialog.confirm()
                    .title('Are you sure you want to delete ' + classified.title + '?')
                    .ok('Yes')
                    .cancel('No')
                    .targetEvent(event);

                $mdDialog.show(confirm).then(() => {
                    var index = $scope.classifieds.indexOf(classified);
                    $scope.classifieds.splice(index, 1);
                    showToast('Item deleted!');
                }, () => {
                    //Nothing really;
                });
            };

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