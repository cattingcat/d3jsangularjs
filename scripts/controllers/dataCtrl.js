'use strict';
var dataCtrl = (function(){
	var factory = function($scope){
		$scope.data = {
			"quadrant" : "Cache",
			"items" : [
				{
					"name" : "Velocity(AppFabric Cache)",
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
					"maturity" : "Avoid",
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
						"practical" : 4,
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
		
		$scope.click = function(){
			$scope.data.items.push({
					"name" : "Java",
					"movement" : "Stable",
					"maturity" : "Avoid",
					"source" : {
						"practical" : 7,
						"theoretical" : 1
					},
					id : 1
				});
			$scope.$broadcast('dataSourceUpdated', {});
		}
	}
	return ['$scope', factory];
})();

