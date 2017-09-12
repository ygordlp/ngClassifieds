angular
    .module('ngClassifieds', ['ngMaterial', 'ui.router'])
    .config(function($mdThemingProvider, $stateProvider) {
        $mdThemingProvider.theme('dafult')
            .primaryPalette('blue')
            .accentPalette('orange');

        $stateProvider
            .state('classifieds', {
                url: '/classifieds',
                templateUrl: 'components/classifieds/classifieds.tpl.html',
                controller: 'classifiedsCtrl as clfc'
            }).state('classifieds.new', {
                url: '/new',
                templateUrl: 'components/classifieds/new/classifieds.new.tpl.html',
                controller: 'newClassifiedsCtrl as clfc'
            });
    })
    .directive('helloWorld', function() {
        return {
            template: '<h1>{{message}}</h1>'
        };
    });