'use strict';
var dataCtrl = (function(){
	var factory = function($scope, $log){
		$scope.data = {
			"quadrant" : "Cache",
			"items" : [
				{
					"name" : "Velocity",
					"movement" : "Stable",
					"maturity" : "Use",
					"source" : {
						"practical" : 5,
						"theoretical" : 4
					},
					id : 1
				},
				{
					"name" : "Redis",
					"movement" : "Down",
					"maturity" : "Use",
					"source" : {
						"practical" : 0,
						"theoretical" : 4
					},
					id : 6
				},
				{
					"name" : "Azure Cache Service",
					"movement" : "Up",
					"maturity" : "Use with care",
					"source" : {
						"practical" : 5,
						"theoretical" : 3
					},
					id : 7
				},
				{
					"name" : "Memcached",
					"movement" : "Stable",
					"maturity" : "Be informed",
					"source" : {
						"practical" : 1,
						"theoretical" : 5
					}, 
					id : 9
				}
			]
		};
		$scope.filter = {
			trend: 'All'
		};
		
		$scope.click = function(){
			$scope.data.items.push({
					"name" : "Java",
					"movement" : "Down",
					"maturity" : "Avoid",
					"source" : {
						"practical" : 7,
						"theoretical" : 1
					},
					id : 1
				});
			$scope.$broadcast('dataSourceUpdated', {});
		};

		$scope.filterChange = function(fltr){
			$scope.$broadcast('dataSourceFilter', $scope.filter);
		};
	}
	return ['$scope', '$log', factory];
})();

