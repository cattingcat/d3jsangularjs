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
				var segmentsWidth = null;


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
					return widthCollection;
				};


				return {
					pre: function (scope, element, attrs) {
						$log.info('pre');
						if(!scope.dataSource)
							$log.error('datasource is undefined');
						var svg = d3.select(element[0]).select('svg.circle-view-svg');

						var items = [];
						scope.dataSource.forEach(function(o) {
							items = items.concat(o.items);
						});
						segmentsWidth = configureSectors(svg, items);
					},
					post: function(scope, element, attrs) { 
						$log.info('post');
						var svg = d3.select(element[0]).select('svg.circle-view-svg');
						var itemHost = svg.select('g.item-host');

						var viewModel = (function() {
							var baseAngle = 90;
							var categoryCount = scope.dataSource.length;
							var anglePerCategory = baseAngle / categoryCount;

							var vm = [];
							scope.dataSource.forEach(function(o, i) {
								var currentAngle = anglePerCategory * (i + 0.5);
								o.items.forEach(function(o) {
									var radiusEnd = 0;
									var radiusStart = 0.5;
									var i = 0;
									for(var prop in maturities)	{
										radiusEnd += segmentsWidth[i];
										if(o.maturity === maturities[prop]) {
											break;
										}
										radiusStart += segmentsWidth[i];
										++i;
									}
									vm.push({
										text: o.name,
										maturity: o.maturity,
										trend: o.movement,
										rs: radiusStart,
										re: radiusEnd,
										angle: currentAngle
									});
								});
							});
							return vm;
						})();

						itemHost.selectAll('g.item')
							.data(viewModel)
							.enter()
							.append('use')
							.attr('xlink:href', function(d) {
								return '#' + d.trend.toLowerCase();
							})
							.attr('x', function(d) {
								return (d.re * Math.cos(Math.PI * d.angle / 180)) + '%';
							})
							.attr('y', function(d) {
								return  (100 - (d.re * Math.sin(Math.PI * d.angle / 180))) + '%';
							})
							.attr('data-debug', function(d) {
								return d.text + ' ' + d.maturity;
							})


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
