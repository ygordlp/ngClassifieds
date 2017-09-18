(function() {
    "use strict";

    angular
        .module('ngClassifieds')
        .directive('classifiedCard', function() {
            return {
                templateUrl: "components/classifieds/card/classified-card.tpl.html",
                scope: {
                    classifieds: '=classifieds',
                    classifiedsFilter: '=classifiedsFilter',
                    category: '=category'
                },
                controller: classifiedCardController,
                controllerAs: "cardCtrl"
            };

            function classifiedCardController($state, $scope, $mdDialog) {
                var self = this;
                self.editClassified = editClassified;
                self.deleteClassified = deleteClassified;

                function editClassified(classified) {
                    $state.go('classifieds.edit', {
                        id: classified.$id
                    });
                }

                function deleteClassified(event, classified) {
                    var confirm = $mdDialog.confirm()
                        .title('Are you sure you want to delete ' + classified.title + '?')
                        .ok('Yes')
                        .cancel('No')
                        .targetEvent(event);

                    $mdDialog.show(confirm).then(() => {
                        $scope.$emit('deleteClassified', classified);
                    }, () => {
                        //Nothing really;
                    });
                }
            }
        });
})();