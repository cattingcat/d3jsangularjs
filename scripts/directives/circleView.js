'use strict';
var circleView = (function() {
	var factory = function($log) {
		var i = 1;
		var o = {	
			templateUrl: '/scripts/directives/circleView.tmpl.html',	
			scope:{
				dataSource: '=circleView'
			},
			compile: function (temaplateElement, templateAttrs) {
                var maturities = {
                    use: 'Use', 
                    useCare: 'Use with care',
                    beInform: 'Be informed',
                    avoid: 'Avoid'
                };
                var trends = {
                    up: 'Up',
                    stable: 'Stable',
                    down: 'Down'
                };
                var configureSectors = function(svg, items) {
                    var elementCountCollection = [0, 0, 0, 0];    
                    var countAll = 0;                    
                    items.forEach(function(o) {
                        if(o.maturity === maturities.use)
                            ++elementCountCollection[0];
                        else if(o.maturity === maturities.useCare)
                            ++elementCountCollection[1];
                        else if(o.maturity === maturities.beInform)
                            ++elementCountCollection[2];
                        else if(o.maturity === maturities.avoid)
                            ++elementCountCollection[3];
                        ++countAll;
                    });

                    var minSegmentWidth = 10;  //%
                    var maxWidth = 100;  //%
                    var widthCollection = [0, 0, 0, 0];
                    var segments = 4;
                    elementCountCollection.forEach(function(o, i) {
                        if(o === 0) {
                            widthCollection[i] = minSegmentWidth;
                            maxWidth -= minSegmentWidth;
                            countAll -= o;
                            --segments;
                        }
                    });
                    elementCountCollection.forEach(function(o, i) {
                        if(o != 0) {
                            var tmp = maxWidth * o / countAll;
                            if(tmp > minSegmentWidth) {
                                widthCollection[i] = tmp;
                                maxWidth -= tmp;
                            } else {
                                widthCollection[i] = minSegmentWidth;
                                maxWidth -= minSegmentWidth;
                            }
                            countAll -= o;
                        }
                    });

                    var lastWidth = 0;
                    widthCollection.forEach(function(o, i) {
                        lastWidth += o;
                        svg.select('circle.circle-' + i)
                            .attr('r', lastWidth + '%');
                    });
                };


            	return {
                    pre: function (scope, element, attrs) {
                    	$log.info('pre');
                    	if(!scope.dataSource)
                    		$log.error('datasource is undefined');
                        var svg = d3.select(element[0]).select('svg.circle-view-host');

                        var items = [];
                        scope.dataSource.forEach(function(o) {
                            items = items.concat(o.items);
                        });
                        configureSectors(svg, items);
                    },
                    post: function(scope, element, attrs) { 
                    	$log.info('post');

                        //TODO: draw items


                    	scope.$watch('dataSource', function() {
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
