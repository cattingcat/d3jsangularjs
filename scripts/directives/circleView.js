'use strict';
var circleView = (function() {
	var factory = function($log) {
		function layoutItems(collection, ri, rs, re, as, ae) {
			if(collection.length != 0) {
				$log.debug(collection[0].maturity + ' ' + rs + ' ' + re + ' ' + as + ' ' + ae);
			} else {
				$log.info('empty collection');
				return;
			}


		}
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
						var svg = d3.select(element[0]).select('svg.circle-view-svg');
						var itemHost = svg.select('g.item-host');
						// SVG Radius (from tmpl.html)
						var R = svg.attr('width');
						var itemRadius = 7;

						var viewModel = (function() {
							var baseAngle = Math.PI / 2;
							var categoryCount = scope.dataSource.length;
							var anglePerCategory = baseAngle / categoryCount;

							var vm = [];
							scope.dataSource.forEach(function(o, i) {
								var startCategoryAngle = anglePerCategory * i;
								var endCategoryAngle = anglePerCategory * (i + 1);

								// debug lines
								itemHost
									.append('line')
									.attr('x1', 0)
									.attr('y1', '100%')
									.attr('x2', (100 * Math.cos(startCategoryAngle)) + '%')
									.attr('y2', (100 - (100 * Math.sin(startCategoryAngle))) + '%')
									.attr('stroke', 'black');
								itemHost
									.append('line')
									.attr('x1', 0)
									.attr('y1', '100%')
									.attr('x2', (100 * Math.cos(endCategoryAngle)) + '%')
									.attr('y2', (100 - (100 * Math.sin(endCategoryAngle))) + '%')
									.attr('stroke', 'black');

								// each sectors
								var radiusStart = 0.3;
								var radiusEnd = 0;
								var wArrayIndex = 0;
								for(var prop in maturities)	{
									radiusEnd += segmentsWidth[wArrayIndex];
									var currentMaturity = maturities[prop];
									// draw each item group
									var itemGroup = o.items.filter(function(item) {
										return item.maturity === currentMaturity
									});

									var rs = R * radiusStart / 100.0,
										re = R * radiusEnd / 100.0;

									var viewModelItems = layoutItems(itemGroup, itemRadius,
										rs, re, startCategoryAngle, endCategoryAngle);
									vm.push(viewModelItems);

									radiusStart += segmentsWidth[wArrayIndex];
									++wArrayIndex;
								}
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
								return d.x;
							})
							.attr('y', function(d) {
								return  (100 - d.y);
							});

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
