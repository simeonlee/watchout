(function() {

  var options = {
    width: $(window).width(),
    height: $(window).height(),
  };

  var circleData = [
    { 'cx': 100, 'cy': 100, 'r': 25, 'color': 'rgba(200, 200, 200, 0.6)' },
    { 'cx': 250, 'cy': 250, 'r': 25, 'color': 'rgba(200, 200, 200, 0.6)' }
  ];


  var board = d3.select('.board')
    .append('svg')
    .attr('width', options.width)
    .attr('height', options.height);

  var circles = board.selectAll('circle')
    .data(circleData)
    .enter()
    .append('circle');

  var circleAttributes = circles
    .attr('cx', function(d) { return d.cx; })
    .attr('cy', function(d) { return d.cy; })
    .attr('r', function(d) { return d.r; })
    .style('fill', function(d) { return d.color; });
    
  var text = board.selectAll('text')
    .data(circleData)
    .enter()
    .append('text');

  var textLabels = text
    .attr('x', function(d) { return d.cx; })
    .attr('y', function(d) { return d.cy + 4; })
    .text( function(d) { return d.cx + ', ' + d.cy; })
    .style('font-size', '10px')
    .style('fill', 'white')
    .style('text-anchor', 'middle');

})();