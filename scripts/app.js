define([
	'controllers/dataCtrl',
	'directives/circleView',
	'directives/plainView'],
	function(dataCtrl, circleView, plainView) {
		'use strict';
		var app = angular.module('app', ['ngRoute']);

		app
			.controller('dataController', dataCtrl)
			.directive('circleView', circleView)
			.directive('plainView', plainView)
			.config(['$routeProvider', function($routeProvider){

				$routeProvider.when('/hello', {
					templateUrl: '/scripts/views/hello.tmpl.html'
				});

				$routeProvider.when('/radars', {
					templateUrl: '/scripts/views/radars.tmpl.html'
				});

			}]);
	}
);

