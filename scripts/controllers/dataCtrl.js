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
			trend: 'All',
			recommendation: 'All'
		};
		
		$scope.click = function(){
			for (var i = 10 - 1; i >= 0; i--) {
				
			
				var mrnd = Math.floor(Math.random() * 4);
				var maturities = ['Use', 'Use with care', 'Be informed', 'Avoid'];

				var trnd = Math.floor(Math.random() * 3);
				var trends = ['Up', 'Stable', 'Down']
				
				$scope.data.items.push({
						"name" : "Java",
						"movement" : trends[trnd],
						"maturity" : maturities[mrnd],
						"source" : {
							"practical" : (Math.random() * 10),
							"theoretical" : (Math.random() * 10)
						},
						id : 1
					});
				$scope.$broadcast('dataSourceUpdated', {});
			};
		};

		$scope.filterChange = function(fltr){
			$scope.$broadcast('dataSourceFilter', $scope.filter);
		};
	}
	return ['$scope', '$log', factory];
})();

