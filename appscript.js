(function(angular, d3){
	var app = angular.module('app', []);	

	var ctrl = (function(){
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
			
			$scope.view = 'circle';
			$scope.click = function(){
				$scope.data.items.push({
						"name" : "Java",
						"movement" : "Stable",
						"maturity" : "Avoid",
						"source" : {
							"practical" : 5,
							"theoretical" : 0
						},
						id : 1
					});
				$scope.$apply();
			}
		}
		return ['$scope', factory];
	})();

	var filter = (function(){
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

	var circleView = (function(){
		var factory = function($log){
			var i = 1;
			var o = {	
				templateUrl: 'circleView.tmpl.html',	
				scope:{
					dataSource: '=circleView'
				},
				compile: function (temaplateElement, templateAttrs) {
                	return {
	                    pre: function (scope, element, attrs) {
	                    	$log.info('pre');
	                    	if(!scope.dataSource)
	                    		$log.error('datasource is undefined');
	                    	else
	                    		$log.info(scope.dataSource);
	                    },
	                    post: function(scope, element, attrs) { 
	                    	$log.info('post');

	                    	scope.$watch('dataSource', function(){
	                    		$log.debug('$watch');
	                    	});

	                    }        				
	                }
	            }
			};
			return o;
		}
		return ['$log', factory];
	})();

	var plainView = (function(){
		var factory = function($log){
			var i = 1;
			var o = {	
				templateUrl: 'plainView.tmpl.html',	
				scope:{
					dataSource: '=plainView'
				},
				compile: function (temaplateElement, templateAttrs) {
                	return {
	                    pre: function (scope, element, attrs) {
	                    	$log.info('pre');

	                    	if(!scope.dataSource)
	                    		$log.error('datasource is undefined');
	                    	else
	                    		$log.info(scope.dataSource);
	                    },

	                    post: function(scope, element, attrs) { 
	                    	$log.info('post');	                    	

							var render = function(){
	                    	// rendering 
		                    	var svg = d3.select('svg#plainViewHost');	

		                    	var w = svg.attr('width');
		                    	var h = svg.attr('height');
		                    	var helpers = {
		                    		x: function(d){
		                    			if(d.maturity === "Use with care")
		                    				return '26%'
		                    			if(d.maturity === "Use")
		                    				return '2%'
		                    			if(d.maturity === "Avoid")
		                    				return '77%';
		                    			if(d.maturity === "Be informed")
		                    				return '52%';
		                    		},
		                    		y: function(d){ 
		                    			var tmp =  (h * d.source.theoretical) / 
		                    			((d.source.theoretical + d.source.practical) || 1)
		                    			if(tmp < 10)
		                    				return 10;
		                    			if(tmp > h - 20)
		                    				return h - 20;
		                    			return tmp; 
		                    		},
		                    		text: function(d){                    			
		                    			if(d.movement === 'Stable')
		                    				return  d.name + ' \u25CF';
		                    			else if(d.movement === 'Up')
		                    				return  d.name + ' \u25B2';
		                    			else  //Down
		                    				return  d.name + ' \u25BC';
		                    		}
		                    	}

		                    	var g = svg.append('g')
		                    		.selectAll('rect')
		                    		.data(scope.dataSource.items) 	                    		                 	 	
	                    	 		.enter();

		                    	g
		                    		.append('text')	                    		
		                    		.text(helpers.text)
		                    		.attr('text-anchor', 'left')
		                    		.attr('alignment-baseline', 'middle')
	                    	 		.attr('font-size', function(d){
	                    	 			var tmp = (d.source.theoretical + d.source.practical) * 2;
	                    	 			if(tmp < 12)
	                    	 				return 12;
	                    	 			return tmp;
	                    	 		})
	                    	 		.attr('x', helpers.x)
		                    		.attr('y', helpers.y);
	                    	};

	                    	scope.$watch('dataSource', function(){
	                    		render();
	                    	});
	                    }        				
	                }
	            }
			};
			return o;
		}
		return ['$log', factory];
	})();


	app
		.controller('ctrl', ctrl)
		.directive('circleView', circleView)
		.directive('plainView', plainView)
		.filter('myFilter', filter);


})(angular, d3);