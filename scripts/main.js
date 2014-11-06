requirejs.config({
	baseUrl: 'scripts',
	paths: {
		applets: '../app'
	}
});

require(['app'],
	function() {
		alert('main')
		angular.bootstrap(document, ['app']);
	}
);