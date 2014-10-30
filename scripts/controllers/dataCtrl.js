'use strict';
var dataCtrl = (function(){
	var factory = function($scope, $log){
		$scope.data = {
			"quadrant" : "Cache",
			"items": [
                {
                    "name": "Velocity",
                    "movement": "Stable",
                    "maturity": "Use",
                    "source": {
                        "practical": 5,
                        "theoretical": 4
                    },
                    id: 1
                },
				{
				    "name": "Redis",
				    "movement": "Down",
				    "maturity": "Use",
				    "source": {
				        "practical": 0,
				        "theoretical": 4
				    },
				    id: 6
				},
				{
				    "name": "Azure Cache Service",
				    "movement": "Up",
				    "maturity": "Use with care",
				    "source": {
				        "practical": 5,
				        "theoretical": 3
				    },
				    id: 7
				},
				{
				    "name": "Memcached",
				    "movement": "Stable",
				    "maturity": "Be informed",
				    "source": {
				        "practical": 1,
				        "theoretical": 5
				    },
				    id: 9
				}
				//{
				//	"name" : "Velocity",
				//	"movement" : "Stable",
				//	"maturity" : "Use",
				//	"source" : {
				//		"practical" : 1,
				//		"theoretical" :1
				//	},
				//	id : 1
				//},
				//{
				//	"name" : "Redis",
				//	"movement" : "Down",
				//	"maturity" : "Use",
				//	"source" : {
				//		"practical" : 4,
				//		"theoretical" : 1
				//	},
				//	id : 2
				//},
				//{
				//	"name" : "Azure Cache Service",
				//	"movement" : "Up",
				//	"maturity" : "Use",
				//	"source" : {
				//		"practical" : 5,
				//		"theoretical" : 3
				//	},
				//	id : 3
				//},
				//{
				//	"name" : "Memcached",
				//	"movement" : "Stable",
				//	"maturity" : "Use",
				//	"source" : {
				//		"practical" : 1,
				//		"theoretical" : 5
				//	}, 
				//	id : 4
				//},
				//{
				//    "name": "Microsoft Service",
				//    "movement": "Stable",
				//    "maturity": "Use",
				//    "source": {
				//        "practical": 19,
				//        "theoretical": 3
				//    },
				//    id: 5
				//},
				//{
				//    "name": "Google Chrom Service",
				//    "movement": "Stable",
				//    "maturity": "Use",
				//    "source": {
				//        "practical": 1,
				//        "theoretical": 19
				//    },
				//    id: 6
				//},
				//{
				//    "name": "Google Chrom Service 2",
				//    "movement": "Stable",
				//    "maturity": "Use with care",
				//    "source": {
				//        "practical": 1,
				//        "theoretical": 10
				//    },
				//    id: 7
				//},
				//{
				//    "name": "Google Chrom Service 3",
				//    "movement": "Down",
				//    "maturity": "Be informed",
				//    "source": {
				//        "practical": 1,
				//        "theoretical": 5
				//    },
				//    id: 8
				//},
				//{
				//    "name": "Google Chrom Service 4",
				//    "movement": "Down",
				//    "maturity": "Avoid",
				//    "source": {
				//        "practical": 1,
				//        "theoretical": 4
				//    },
				//    id: 9
				//}
			]
		};
		$scope.filter = {
			trend: 'All',
			recommendation: 'All'
		};

		$scope.circleData = [
			{
				"quadrant" : "Cache",
				"items" : [
					{
						"name" : "Velocity(AppFabric Cache)",
						"movement" : "Stable",
						"maturity" : "Use",
						"source" : {
							"practical" : 0,
							"theoretical" : 4
						},
					},
					{
						"name" : "Redis",
						"movement" : "Stable",
						"maturity" : "Use with care",
						"source" : {
							"practical" : 0,
							"theoretical" : 4
						},
					},
					{
						"name" : "Azure Cache Service",
						"movement" : "Up",
						"maturity" : "Use with care",
						"source" : {
							"practical" : 0,
							"theoretical" : 3
						},
					},
					{
						"name" : "Memcached",
						"movement" : "Stable",
						"maturity" : "Use",
						"source" : {
							"practical" : 1,
							"theoretical" : 5
						},
					}
				]
			},
			{
				"quadrant":"Custom components",
				"items":[
					{
						"name":"Native:Mobile",
						"movement":"Up",
						"maturity":"Use",
						"source": {
							"practical":4,
							"theoretical":2
						},
					},

					{
						"name":"Native:Desktop",
						"movement":"Down",
						"maturity":"Use",
						"source": {
							"practical":7,
							"theoretical":0
						},
					},

					{
						"name":"Web Services (no UI)",
						"movement":"Stable",
						"maturity":"Use",
						"source": {
							"practical":6,
							"theoretical":0
						},
					},

					{
						"name":"System Service (no UI)",
						"movement":"Stable",
						"maturity":"Use",
						"source": {
							"practical":6,
							"theoretical":0
						},
					},

					{
						"name":"Web:Mobile",
						"movement":"Up",
						"maturity":"Use",
						"source": {
							"practical":1,
							"theoretical":5
						},
					},
					{
						"name":"Web:Desktop",
						"movement":"Stable",
						"maturity":"Use",
						"source": {
							"practical":7,
							"theoretical":0
						},
					},
					{
						"name":"Wearable technologies",
						"movement":"Up",
						"maturity":"Be informed",
						"source": {
							"practical":0,
							"theoretical":2
						},
					}
				]
			}];
		
		$scope.click = function(){
			for (var i = 10 - 1; i >= 0; i--) {
				
			
				var mrnd = Math.floor(Math.random() * 4);
				var maturities = ['Use', 'Use with care', 'Be informed', 'Avoid'];

				var trnd = Math.floor(Math.random() * 3);
			    var trends = ['Up', 'Stable', 'Down'];
				
				$scope.data.items.push({
						"name" : "Java",
						"movement" : trends[trnd],
						"maturity" : maturities[mrnd],
						"source" : {
							"practical" : Math.round((Math.random() * 10)),
							"theoretical" : Math.round((Math.random() * 10))
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

