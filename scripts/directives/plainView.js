'use strict';
var plainView = (function(){
	var factory = function($log){
		var i = 1;
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
	                    				return  '\u25CF ' + d.name;
	                    			else if(d.movement === 'Up')
	                    				return  '\u25B2 ' + d.name;
	                    			else  //Down
	                    				return  '\u25BC ' + d.name;
	                    		}
	                    	}

	                    	svg.selectAll('g')
	                    		.remove();

	                    	var g = svg.append('g')
	                    		.selectAll('rect')
	                    		.data(scope.dataSource.items) 	                    		                 	 	
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
