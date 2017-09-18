angular
    .module('ngClassifieds', ['ngMaterial', 'ui.router', 'firebase'])
    .config(function ($mdThemingProvider, $stateProvider, $urlRouterProvider) {
        $mdThemingProvider.theme('dafult')
            .primaryPalette('blue')
            .accentPalette('orange');

        $urlRouterProvider.otherwise('/classifieds');

        $stateProvider
            .state('classifieds', {
                url: '/classifieds',
                templateUrl: 'components/classifieds/classifieds.tpl.html',
                controller: 'classifiedsCtrl as clfc'
            }).state('classifieds.new', {
                url: '/new',
                templateUrl: 'components/classifieds/new/classifieds.new.tpl.html',
                controller: 'newClassifiedsCtrl as newClfc'
            }).state('classifieds.edit', {
                url: '/edit/:id',
                templateUrl: 'components/classifieds/edit/classifieds.edit.tpl.html',
                controller: 'editClassifiedsCtrl as editClfc',
                params: {
                    classified: null
                }
            });
    })
    .directive('helloWorld', function () {
        return {
            template: '<h1>{{message}}</h1>'
        };
    });