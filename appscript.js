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
				templateUrl: 'myController.tmpl.html',	
				scope:{
					at: '=attr'
				},
				compile: function compile(temaplateElement, templateAttrs) {
                	return {
	                    pre: function (scope, element, attrs) {
							var w = 600,
								h = w;	

							var root = d3.selectAll('div[my-directive]');
							var svg = root.select('svg')
								.attr('width', w)
								.attr('height', h);
	            				
	                    },
	                    post: function(scope, element, attrs) { 

	                    }
	                }
	            },

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