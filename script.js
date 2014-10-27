(function(document, d3){
	var data = [
		{x:10, y:20},
		{x:20, y:30},
		{x:10, y:10}
	];
	var r = 10;
	var w = 200,
		h = 200;
	var svg = d3.select('body')
		.append('svg')
		.attr('width', w)
		.attr('height', h)
		.style("border", "1px solid black");

	svg.append('rect')
		.attr('x', 0)
		.attr('y', 0)
		.attr('width', w)
		.attr('height', h)
		.attr('fill', '#f1f1f5');

	/*svg.append('circle')
		.attr('cx', 50)
		.attr('cy', 50)
		.attr('r', 50)
		.attr('fill', 'red');
	*/
	svg.selectAll('circle')
		.data(data)
		.enter()
		.append('circle')
		.attr('cx', function(d){return d.x * 5;})
		.attr('cy', function(d){return d.y * 5;})
		.attr('r', r)
		.attr('fill', function(d){
			return d3.rgb(0, d.y * 5, d.x * 5);
		});


})(document, d3);