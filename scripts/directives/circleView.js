'use strict';
var circleView = (function(){
	var factory = function($log){
		var i = 1;
		var o = {	
			templateUrl: '/scripts/directives/circleView.tmpl.html',	
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

                    	scope.$watch('dataSource', function(){
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
