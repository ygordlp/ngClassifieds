(function () {
  "use strict";

  angular
    .module('ngClassifieds')
    .controller('editClassifiedsCtrl', function ($scope, $state, $mdSidenav, $mdDialog, $timeout, classifiedsFactory) {
      var self = this;
      self.sidenavOpen;
      self.saveEdit = saveEdit;
      self.closeSidebar = closeSidebar;
      self.classified = $state.params.classified;

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

      function closeSidebar() {
        self.sidenavOpen = false;
      }

      function saveEdit() {
        self.sidenavOpen = false;
        $scope.$emit('editSave', 'Edit saved!');
      }

    });
})();