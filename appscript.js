(function(angular){
	var app = angular.module('app', []);	

	var ctrl = (function(){
		var factory = function($scope){
			$scope.data = {
				name: 'someObj',				
				data: [1, 2, 3, 4]
			};
			$scope.view = 'circle';
			$scope.click = function(){
				$scope.data.name = 'hi';
			}
		}
		return ['$scope', factory];
	})();

	var circleView = (function(){
		var factory = function($log){
			var i = 1;
			var o = {	
				templateUrl: 'circleView.tmpl.html',	
				scope:{
					dataSource: '=circleView'
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
	                    }        				
	                }
	            }
			};
			return o;
		}
		return ['$log', factory];
	})();


	app
		.controller('ctrl', ctrl)
		.directive('circleView', circleView);


})(angular);