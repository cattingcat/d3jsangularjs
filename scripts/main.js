requirejs.config({
	baseUrl: 'scripts',
	paths: {
		applets: '../app'
	}
});

require(['app'],
	function() {
		angular.bootstrap(document, ['app']);
	}
);