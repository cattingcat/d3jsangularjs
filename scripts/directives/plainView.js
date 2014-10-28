'use strict';
var plainView = (function(){
	var factory = function($log){

		// Helpers
		var widthArray = [];
		var configGrid = function(collection){
			widthArray = [0, 0, 0, 0];
			widthArray.all = 0;
			widthArray.useStart = function(){
				return 0;
			}
			widthArray.useWidth = function(){
				return this[0];
			}
			widthArray.useCareStart = function(){
				return this.useStart() + this.useWidth();
			}
			widthArray.useCareWidth = function(){
				return this[1];
			}

			widthArray.beInformStart = function(){
				return this.useCareStart() + this.useCareWidth();
			}
			widthArray.beInformWidth = function(){
				return this[2];
			}

			widthArray.avoidStart = function(){
				return this.beInformStart() + this.beInformWidth();
			}
			widthArray.avoidWidth = function(){
				return this[3];
			}


			var minWidth = 15.0;

			collection.map(function(d){
				if(d.maturity === "Use")
					++widthArray[0];
				else if(d.maturity === "Use with care")
					++widthArray[1];
				else if(d.maturity === "Be informed")
					++widthArray[2];
				else if(d.maturity === "Avoid")
					++widthArray[3];                			
				++widthArray.all;
			});
			for (var i = widthArray.length - 1; i >= 0; i--) {
				widthArray[i] = widthArray[i] * 100.0 / widthArray.all;
			};		
			for (i = widthArray.length - 1; i >= 0; i--) {
				if(widthArray[i] < minWidth){
					var rest = widthArray[i]
					widthArray[i] = minWidth;
					for (var j = widthArray.length - 1; j >= 0; j--) {
						if(j != i && widthArray[j] > minWidth){
							widthArray[j] -= (minWidth - rest) / 3.0;
						}
					}
				}						
			}		


			d3.select('rect.col-use')
				.attr('width', widthArray.useWidth() + '%');
			d3.select('rect.col-use-care')
				.attr('x', widthArray.useCareStart() + '%')
				.attr('width', widthArray.useCareWidth() + '%');
			d3.select('rect.col-be-informed')
				.attr('x', widthArray.beInformStart() + '%')
				.attr('width', widthArray.beInformWidth() + '%');
			d3.select('rect.col-avoid')
				.attr('x', widthArray.avoidStart() + '%')
				.attr('width', widthArray.avoidWidth() + '%');

			d3.select('line.col-use-line')
				.attr('x1', widthArray.useWidth() + '%')
				.attr('x2', widthArray.useWidth() + '%');
			d3.select('line.col-use-care-line')
				.attr('x1', widthArray.beInformStart() + '%')
				.attr('x2', widthArray.beInformStart() + '%');
			d3.select('line.col-be-informed-line')
				.attr('x1', widthArray.avoidStart() + '%')
				.attr('x2', widthArray.avoidStart() + '%');

			d3.select('text.use')
				.attr('x', (widthArray.useWidth() / 2) + '%');
			d3.select('text.use-with-care')
				.attr('x', (widthArray.useCareStart() + widthArray.useCareWidth() / 2) + '%');
			d3.select('text.be-informed')
				.attr('x', (widthArray.beInformStart() + widthArray.beInformWidth() / 2) + '%');
			d3.select('text.avoid')
				.attr('x', (widthArray.avoidStart() + widthArray.avoidWidth() / 2) + '%');
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
		var d3Helpers = {
			x: function(data){
				if(data.maturity === "Use") {
					return (widthArray.useStart() + 3) + '%';
				} else if(data.maturity === "Use with care") {
					return widthArray.useCareStart() + '%';
				} else if(data.maturity === "Be informed") {
					return widthArray.beInformStart() + '%';
				} else if(data.maturity === "Avoid") {
					return widthArray.avoidStart() + '%';
				}
			},
			y: function(data){ 
				var tmp =  (100.0 * data.source.theoretical) / 
				((data.source.theoretical + data.source.practical) || 1)
				if(tmp < 5)
					return '5%';
				if(tmp > 100.0 - 5)
					return (100.0 - 5) + '%';
				return tmp + '%'; 
			},
			text: function(data){                    			
				if(data.movement === 'Stable')
					return  '\u25CF ' + data.name;
				else if(data.movement === 'Up')
					return  '\u25B2 ' + data.name;
				else  //Down
					return  '\u25BC ' + data.name;
			}
		};

		var directiveObj = {	
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

							var itemsHost = svg.select('g.items-host');

	                    	itemsHost.selectAll('g')
	                    		.remove();

	                    	var g = itemsHost.append('g')
	                    		.selectAll('rect')
	                    		.data(filter(scope.dataSource.items, scope.templ)) 	                    		                 	 	
                    	 		.enter()		                    	
	                    		.append('text')	                    		
	                    		.text(d3Helpers.text)
	                    		.attr('text-anchor', 'left')
	                    		.attr('alignment-baseline', 'middle')
                    	 		.attr('font-size', function(data){
                    	 			var tmp = (data.source.theoretical + data.source.practical) * 2;
                    	 			if(tmp < 12)
                    	 				return 12;
                    	 			return tmp;
                    	 		})
                    	 		.attr('x', d3Helpers.x)
	                    		.attr('y', d3Helpers.y)
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
		return directiveObj;
	}
	return ['$log', factory];
})();
