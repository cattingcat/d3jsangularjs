define([
	'controllers/dataCtrl',
	'directives/circleView',
	'directives/plainView'],
	function(dataCtrl, circleView, plainView) {
		'use strict';
		var app = angular.module('app', []);

		app
			.controller('dataController', dataCtrl)
			.directive('circleView', circleView)
			.directive('plainView', plainView);
	}
);

