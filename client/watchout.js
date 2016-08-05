(function() {

  var options = {
    width: $(window).width(),
    height: $(window).height(),
    enemies: 30
  };

  var board = d3.select('.board')
    .append('svg')
    .attr('width', options.width)
    .attr('height', options.height)

  board.append('circle')
    .attr('cx', 25)
    .attr('cy', 25)
    .attr('r', 25)
    .style('fill', 'white');

  var data = [50, 100, 150, 200, 250];

  var g = board.data(data)
    .enter()
    .append('div')
    .attr('transform', 'translate(0, 10)')

  var circles = g.selectAll('circle')
    .data(data)

  circles.enter()
    .append('circle')
    .attr({
      cx: function(d, i) { return d; },
      cy: 118,
      r: 14
    })

})();