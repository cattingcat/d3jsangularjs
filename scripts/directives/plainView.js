'use strict';
var plainView = (function(){
	var factory = function($log){

		var directiveObj = {	
			templateUrl: '/scripts/directives/plainView.tmpl.html',	
			scope:{
				dataSource: '=plainView'
			},
			compile: function (temaplateElement, templateAttrs) {
				// Helpers
				var widthArray = [];
				var areaNames = ["Use",	"Use with care", "Be informed", "Avoid"];
				var configGrid = function(collection, element){
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

					var d3Element = d3.select(element);
					d3Element.select('rect.col-use')
						.attr('width', widthArray.useWidth() + '%');
					d3Element.select('rect.col-use-care')
						.attr('x', widthArray.useCareStart() + '%')
						.attr('width', widthArray.useCareWidth() + '%');
					d3Element.select('rect.col-be-informed')
						.attr('x', widthArray.beInformStart() + '%')
						.attr('width', widthArray.beInformWidth() + '%');
					d3Element.select('rect.col-avoid')
						.attr('x', widthArray.avoidStart() + '%')
						.attr('width', widthArray.avoidWidth() + '%');

					d3Element.select('line.col-use-line')
						.attr('x1', widthArray.useWidth() + '%')
						.attr('x2', widthArray.useWidth() + '%');
					d3Element.select('line.col-use-care-line')
						.attr('x1', widthArray.beInformStart() + '%')
						.attr('x2', widthArray.beInformStart() + '%');
					d3Element.select('line.col-be-informed-line')
						.attr('x1', widthArray.avoidStart() + '%')
						.attr('x2', widthArray.avoidStart() + '%');

					d3Element.select('text.use')
						.attr('x', (widthArray.useWidth() / 2) + '%');
					d3Element.select('text.use-with-care')
						.attr('x', (widthArray.useCareStart() + widthArray.useCareWidth() / 2) + '%');
					d3Element.select('text.be-informed')
						.attr('x', (widthArray.beInformStart() + widthArray.beInformWidth() / 2) + '%');
					d3Element.select('text.avoid')
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

            	return {
                    pre: function (scope, element, attrs) {
                    	$log.info('pre');

                    	if(!scope.dataSource)
                    		$log.error('datasource is undefined');

                		configGrid(scope.dataSource.items, element[0]);
                    },

                    post: function(scope, element, attrs) { 
                    	$log.info('post');	                    	

						var render = function(){
							var svg = d3.select(element[0]).select('svg.plainViewHost');

							var viewModel = (function(){
								$log.info('creating view model');
								var viewModel = [];
								var model = filter(scope.dataSource.items, scope.templ);
								var maxFontSz = 20,
									minFontSz = 9;

								var hostWidth = svg.attr('width');
								var hostHeight = svg.attr('height');

								var maxVotes = model.reduce(function(prev, curr){
									var tmp = curr.source.theoretical + curr.source.practical;
									return prev > tmp ? prev : tmp;
								});								 

								model.map(function(item){									
									var itemFontSz = minFontSz + Math.floor(((maxFontSz - minFontSz)*
										(item.source.theoretical + item.source.practical))/maxVotes)
									
									var itemText = ''; 						
									if(item.movement === 'Stable')
										itemText = '\u25CF ' + item.name;
									else if(item.movement === 'Up')
										itemText = '\u25B2 ' + item.name;
									else  //Down
										itemText = '\u25BC ' + item.name;									

									viewModel.push({
										maturity: item.maturity,
										fontSize: itemFontSz,
										text: itemText,
										theoretical: item.source.theoretical,
										practical: item.source.practical
									});
								});
								return viewModel;
							})();

							viewModel = (function(){
								var res = [];
								var currAreaStart = 0;
								for (var i = 0; i < widthArray.length; ++i) {
									var currArea = areaNames[i];
									var currAreaWidth = widthArray[i];
									var currAreaItems = viewModel.filter(function(itm){ return itm.maturity === currArea });
									
									for(var j = 0; j < 4; ++j){
										var pack = d3.layout.pack()
											.size([currAreaWidth - 5, 25])
											.radius(3.5)
											.value(function(d) { 
												return d.practical + d.theoretical; 
											});									

										var tmpItems = currAreaItems.filter(function(itm){
											var tmp = (itm.theoretical * 100.0 / (itm.theoretical + itm.practical))
											return tmp <= (j + 1) * 25 && tmp > j * 25;
										})
										

										pack.nodes({name: ' ', children: tmpItems});

										tmpItems.map(function(itm){
											itm.x += currAreaStart + 5; 
											itm.y += j*25;
										});

										res = res.concat(tmpItems);
									}

									currAreaStart += currAreaWidth;
								};								
								return res;
							})();

                    		$log.info('rendering...');	                    	

							var itemsHost = svg.select('g.items-host');
	                    	itemsHost.selectAll('g')
	                    		.remove();

	                    	var g = itemsHost.append('g')
	                    		.selectAll('rect')
	                    		.data(viewModel) 	                    		                 	 	
                    	 		.enter();		                    	
                    		g.append('text')	                    		
								.text(function(d){ return d.text; })
								.attr('font-size', function(d){ return d.fontSize; })
								.attr('x', function(d){ return d.x + '%'; })
								.attr('y', function(d){ return d.y + '%'; })
								.attr('class', 'custom-text radar-text')
								.attr('text-anchor', 'middle')
								.attr('alignment-baseline', 'middle');
								/*g.append('circle')
									.attr('cx', function(d){ return d.x + '%'; })
									.attr('cy', function(d){ return d.y + '%'; })
									.attr('r', function(d){ return d.r + '%'; })*/

							// Multiline font
							(function(){
								var createSentenses = function (text, symbolsNumberInSentense) {
								    var sentenses = [];
								    var words = text.split(' ');
								    var sent = '';
								    for (var i = 0; i < words.length; i++) {
								        var word = words[i];

								        if (word.length < symbolsNumberInSentense) {
								            sent += word + ' ';
								            if (sent.length > symbolsNumberInSentense) {
								                sentenses.push(sent); sent = '';
								            }
								        }
								        else { sentenses.push(sent); sent = word + ' '; }
								    }
								    if(sent.length) sentenses.push(sent);
								    return sentenses;
								};
								var symbolsNumberInSentense = 10;
								var createBreakableText = function (elem, text) {
								    var sentenses = createSentenses(text, symbolsNumberInSentense);
								    sentenses.map(function (sent, index) {
								        if (index)
								            elem.append('tspan')
								                .text(sent)
								                .attr('x', elem.attr('x')).attr('dy', '1em');
								        else
								            elem.append('tspan')
								                .text(sent)
								                .attr('x', elem.attr('x'));
								    });
								};

								var textElements = itemsHost.selectAll('text.radar-text');
								textElements.each(function () {
								    var elem = d3.select(this);
								    var text = elem.text();
								    elem.text('');
								    createBreakableText(elem, text);
								});
	                    	})();
						};

                    	scope.$watch('dataSource', function(){
                    		render();
                    	});

                    	scope.$on('dataSourceUpdated', function(){
                    		configGrid(scope.dataSource.items, element[0]);
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
