'use strict';
var plainView = (function(){
	var factory = function($log){
		var wa = [];
		var configGrid = function(collection){
			wa = [0, 0, 0, 0];
			wa.all = 0;

			collection.map(function(d){
				if(d.maturity === "Use")
					++wa[0];
				else if(d.maturity === "Use with care")
					++wa[1];
				else if(d.maturity === "Be informed")
					++wa[2];
				else if(d.maturity === "Avoid")
					++wa[3];                			
				++wa.all;
			});

			for (var i = wa.length - 1; i >= 0; i--) {
				wa[i] = wa[i] * 100.0 / wa.all;
			};
			var minPerc = 15.0;

			for (i = wa.length - 1; i >= 0; i--) {
				if(wa[i] < minPerc){
					var rest = wa[i]
					wa[i] = minPerc;
					for (var j = wa.length - 1; j >= 0; j--) {
						if(j != i && wa[j] > minPerc){
							wa[j] -= (minPerc - rest) / 3.0;
						}
					}
				}						
			}						

			d3.select('rect.col-use')
				.attr('width', wa[0] + '%');
			d3.select('rect.col-use-care')
				.attr('x', wa[0] + '%')
				.attr('width', wa[1] + '%');
			d3.select('rect.col-be-informed')
				.attr('x', (wa[0] + wa[1]) + '%')
				.attr('width', wa[2] + '%');
			d3.select('rect.col-avoid')
				.attr('x', (wa[0] + wa[1] + wa[2]) + '%')
				.attr('width', wa[3] + '%');

			d3.select('line.col-use-line')
				.attr('x1', wa[0] + '%')
				.attr('x2', wa[0] + '%');
			d3.select('line.col-use-care-line')
				.attr('x1', (wa[0] + wa[1]) + '%')
				.attr('x2', (wa[0] + wa[1]) + '%');
			d3.select('line.col-be-informed-line')
				.attr('x1', (wa[0] + wa[1] + wa[2]) + '%')
				.attr('x2', (wa[0] + wa[1] + wa[2]) + '%');

			d3.select('text.use')
				.attr('x', (wa[0] / 2) + '%');
			d3.select('text.use-with-care')
				.attr('x', (wa[0] + wa[1] / 2) + '%');
			d3.select('text.be-informed')
				.attr('x', (wa[0] + wa[1] + wa[2] / 2) + '%');
			d3.select('text.avoid')
				.attr('x', (wa[0] + wa[1] + wa[2] + wa[3] / 2) + '%');
		};
		var filter = function(collection, template){
			var res = [];
			if(!template)
				return collection;
			collection.map(function(item){
				if((item.movement === template.trend || template.trend === 'All') && 
					(item.maturity === template.recommendation || template.recommendation === 'All')){
					res.push(item);
				}				
			});
			return res;
		};

		var o = {	
			templateUrl: '/scripts/directives/plainView.tmpl.html',	
			scope:{
				dataSource: '=plainView'
			},
			compile: function (temaplateElement, templateAttrs) {
            	return {
                    pre: function (scope, element, attrs) {
                    	$log.info('pre');

                    	if(!scope.dataSource)
                    		$log.error('datasource is undefined');

                		configGrid(scope.dataSource.items);
                    },

                    post: function(scope, element, attrs) { 
                    	$log.info('post');	                    	

						var render = function(){
                    		$log.info('rendering...');

	                    	var svg = d3.select('svg#plainViewHost');	

	                    	var w = svg.attr('width');
	                    	var h = svg.attr('height');

	                    	var helpers = {
	                    		x: function(d){
									if(d.maturity === "Use") {
		                				return (3) + '%';
									} else if(d.maturity === "Use with care") {
		                				return (wa[0]) + '%';
		                			} else if(d.maturity === "Be informed") {
		                				return (wa[0] + wa[1]) + '%';
		                			} else if(d.maturity === "Avoid") {
		                				return (wa[0] + wa[1] + wa[2]) + '%';
		                			}
	                    		},
	                    		y: function(d){ 
	                    			var tmp =  (h * d.source.theoretical) / 
	                    			((d.source.theoretical + d.source.practical) || 1)
	                    			if(tmp < 5)
	                    				return 5;
	                    			if(tmp > h - 5)
	                    				return h - 5;
	                    			return tmp; 
	                    		},
	                    		text: function(d){                    			
	                    			if(d.movement === 'Stable')
	                    				return  '\u25CF ' + d.name;
	                    			else if(d.movement === 'Up')
	                    				return  '\u25B2 ' + d.name;
	                    			else  //Down
	                    				return  '\u25BC ' + d.name;
	                    		}
	                    	}


							var itemsHost = svg.select('g.items-host')

	                    	itemsHost.selectAll('g')
	                    		.remove();

	                    	var g = itemsHost.append('g')
	                    		.selectAll('rect')
	                    		.data(filter(scope.dataSource.items, scope.templ)) 	                    		                 	 	
                    	 		.enter()		                    	
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
	                    		.attr('y', helpers.y)
	                    		.attr('class', 'custom-text');
                    	};

                    	scope.$watch('dataSource', function(){
                    		render();
                    	});

                    	scope.$on('dataSourceUpdated', function(){
                    		configGrid(scope.dataSource.items);
							render();
                    	});
                    	scope.$on('dataSourceFilter', function(e, template){
							$log.debug(template.trend);
							scope.templ = template;
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
