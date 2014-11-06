define([], function() {
	'use strict';
	var factory = function($compile, $document, $window, $log) {

		var o = {
			templateUrl: '/scripts/directives/circleView.tmpl.html',
			scope:{
				dataSource: '=circleView'
			},
			compile: function (templateElement, templateAttrs) {
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

					var minSegmentWidth = 5;  //%
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
							if(tmp <= minSegmentWidth) {
								widthCollection[i] = minSegmentWidth;
								maxWidth -= minSegmentWidth;
								countAll -= o;
							}
						}
					});

					elementCountCollection.forEach(function(o, i) {
						if(o != 0) {
							var tmp = maxWidth * o / countAll;
							if(tmp > minSegmentWidth) {
								widthCollection[i] = tmp;
								maxWidth -= tmp;
								countAll -= o;
								--segments;
							}
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

				function layoutItems(collection, ri, rs, re, as, ae) {
					if(!collection || collection.length == 0) {
						$log.info('empty collection');
						return [];
					}
					var vm = [];
					var Di = ri * 2;	// item diameter
					var itemIndex = 0;

					for(var ir = rs + ri; ir < re - ri && itemIndex < collection.length; ir += Di) {
						//var currentC = (2 * Math.PI * ir) * (ae - as) / (2 * Math.PI);
						var currentC = ir * (ae - as);

						var itemOnArc = currentC / Di;

						if(itemOnArc >= 1) {
							var angleForItem = (ae - as) / itemOnArc;
							for(var ia = as + angleForItem / 2; ia < ae - angleForItem / 2; ia += angleForItem) {
								if(Math.floor(itemOnArc) == 1) {
									ia = as + (ae - as) / 2;
								}
								var item = collection[itemIndex];
								// fields
								var vmItem = {
									trend: item.movement,
									x: ir * Math.cos(ia),
									y: ir * Math.sin(ia),
									name: item.name
								};
								vm.push(vmItem);

								++itemIndex;
								if(itemIndex >= collection.length) {
									break;
								}
							}
						} else {
							//TODO
						}
					}
					if(itemIndex < collection.length - 1) {
						$log.error('items overfow');
					}
					return vm;
				}

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

						scope.filteredDS = scope.dataSource;
						scope.selectedItem = null;
						scope.select = function(itemName){
							scope.selectedItem = itemName;
						};
						scope.filter = function(dataSource, template) {
							if(!template)
								return dataSource;
							var ds = [];
							dataSource.forEach(function(o) {
								var tmp = {};
								tmp.quadrant = o.quadrant;
								tmp.items = o.items.filter(function(fo) {
									return (fo.maturity == template.recommendation || template.recommendation == 'All') && 
										(fo.movement == template.trend || template.trend == 'All');
								});
								ds.push(tmp);
							});
							return ds;
						};
					},
					post: function(scope, element, attrs) { 
						var svg = d3.select(element[0]).select('svg.circle-view-svg');
						var itemHost = svg.select('g.item-host');
						// SVG Radius (from tmpl.html)
						var R = svg.attr('width');
						var itemRadius = 9;	// with margin

						var makeViewModel = function(dataSource) {
							var baseAngle = Math.PI / 2;
							var categoryCount = dataSource.length;
							var anglePerCategory = baseAngle / categoryCount;

							var vm = [];
							dataSource.forEach(function(o, i) {
								var startCategoryAngle = anglePerCategory * i;
								var endCategoryAngle = anglePerCategory * (i + 1);

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
									vm = vm.concat(viewModelItems);

									radiusStart += segmentsWidth[wArrayIndex];
									++wArrayIndex;
								}
							});
							return vm;
						};

						var render = function(viewModel) {
							itemHost.selectAll('use')
								.remove();
							itemHost.selectAll('use')
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
										return  (R - d.y);
									})
									.attr('ng-mouseenter', function(d){
										return ('selectedItem = "' + d.name + '"');
									})
									.attr('ng-mouseleave', 'selectedItem = null')
									.attr('ng-class', function(d){
										return 'selectedItem == "' + d.name + '" ? "selected-radar-item" : ""';
									});

							$compile(d3.select('div.radar-svg')[0][0])(scope);
						};

						render(makeViewModel(scope.dataSource));

						scope.$on('dataSourceFilter', function(e, template) {
							var ds = scope.filter(scope.dataSource, template);
							scope.filteredDS = ds;
							var items = [];
							ds.forEach(function(o) {
								items = items.concat(o.items);
							});
							segmentsWidth = configureSectors(svg, items);

							var vm = makeViewModel(ds);
							render(vm);
						});
					}
				}
			}
		};
		return o;
	}
	return ['$compile', '$document', '$window', '$log', factory];
});

