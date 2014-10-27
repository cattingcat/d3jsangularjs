(function(angular){
	var app = angular.module('app', []);	

	var ctrl = (function(){
		var factory = function($scope){
			$scope.o = {
				name: 'some obj',				
				data: [1, 2, 3, 4]
			};
			$scope.clicked = function(){
				$scope.o.name = 'hi';
			}
		}
		return ['$scope', factory];
	})();

	var myDirective = (function(){
		var factory = function(/*dependencies here*/){
			var i = 1;
			var o = {			
				scope:{
					at: '=attr'
				},
				compile: function compile(temaplateElement, templateAttrs) {
                	return {
	                    pre: function (scope, element, attrs) {
							var r = 10;
							var w = 200,
								h = 200;	

							var root = d3.selectAll('div[my-directive]');
							var svg = root
								.append('svg')
								.attr('width', w)
								.attr('height', h)
								.style("border", "1px solid black");

							svg.append('rect')
								.attr('x', 0)
								.attr('y', 0)
								.attr('width', '100%')
								.attr('height', '100%')
								.attr('fill', '#f1f1f5');		            				
	                    },
	                    post: function(scope, element, attrs) { 

	                    }
	                }
	            },
				//template: 'Hello world: {{at}}',
				link: function (scope, element, attrs) {	

				}

			};
			return o;
		}
		return [/*dependencies here*/ factory];
	})();


	app
		.controller('ctrl', ctrl)
		.directive('myDirective', myDirective);


})(angular);