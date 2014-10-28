'use strict';
(function(angular){
	var app = angular.module('app', []);	


	var customFilter = (function(){
		var factory = function($log) {
			return function(input) {
				$log.debug(input);

				var arr = [];
				for (var i = input.length - 1; i >= 0; i--) {
					if(input[i] == 2)
						continue;
					arr.push(input[i]);
				};

				return arr;
			};
		}
		return ['$log', factory];
	})();

	app
		.controller('dataController', dataCtrl)
		.directive('circleView', circleView)
		.directive('plainView', plainView)
		.filter('customFilter', customFilter);

})(angular);