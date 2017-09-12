angular
    .module('ngClassifieds', ['ngMaterial', 'ui.router'])
    .config(function($mdThemingProvider, $stateProvider) {
        $mdThemingProvider.theme('dafult')
            .primaryPalette('blue')
            .accentPalette('orange');

        $stateProvider
            .state('one', {
                url: '/stateone',
                template: '<h1>{{oneCtrl.message}}</h1>',
                controller: 'stateOneCtrl as oneCtrl'
            })
            .state('two', {
                url: '/statetwo',
                template: '<h1>State Two</h1> <md-button ui-sref="two.more">Go to nested state</md-button><ui-view></ui-view>'
            }).state('two.more', {
                url: '/more',
                template: '<p>This is the nested state.</p>'
            });
    })
    .directive('helloWorld', function() {
        return {
            template: '<h1>{{message}}</h1>'
        };
    })
    .controller('stateOneCtrl', function($scope) {
        var self = this;
        self.message = 'Hey from state one';
    });