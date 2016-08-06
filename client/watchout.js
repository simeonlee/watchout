(function() {

  var vw = $(window).width();
  var vh = $(window).height();
  var collisions = 0;
  var highScore = 0;
  var currentScore = 0;
  var delay = 0;

  var options = {
    width: vw,
    height: vh,
    enemies: 15
  };

  var board = d3.select('svg')
    .attr('width', options.width)
    .attr('height', options.height);

  var circleData = [];
  var createEnemy = function() {
    var enemy = {};
    enemy.cx = Math.floor( (Math.random() * vw) * 100) / 100;
    enemy.cy = Math.floor( (Math.random() * vh) * 100) / 100;
    enemy.r = 20 + 'px';
    enemy.color = 'rgba(200, 200, 200, 0.6)';
    enemy.type = 'enemy';
    return enemy;
  };
  var createPlayer = function() {
    var player = {};
    player.cx = vw / 2;
    player.cy = vh / 2;
    player.r = 20 + 'px';
    player.color = 'rgba(200, 200, 200, 0.6)';
    player.type = 'player';
    return player;
  };

  for ( var i = 0; i < options.enemies; i++ ) {
    circleData.push( createEnemy() );
  }
  circleData.push( createPlayer() );

  var circles = board.selectAll('circle')
    .data(circleData)
    .enter()
    .append('circle');

  var circleAttributes = circles
    .attr('cx', function(d) { return d.cx; })
    .attr('cy', function(d) { return d.cy; })
    .attr('r', function(d) { return d.r; })
    .attr('class', (d) => d.type)
    .style({
      'fill': (d) => {
        if (d.type === 'enemy') {
          return 'url(#image)';
        } else {
          return 'white';
        }
      }
    });
    // .classed('circle', true);

  var enemies = board.selectAll('.enemy');
  var player = board.select('.player');

  board.on('mousemove', () => {
    player
      .attr('cx', d3.event.offsetX)
      .attr('cy', d3.event.offsetY);
  });

  var checkCollision = function() {
    delay = 0;
    board.style('background-color', null);
    var collided = false;
    enemies.each( function() {
      var thisEnemy = d3.select(this);
      var xDiff = thisEnemy.attr('cx') - player.attr('cx');
      var yDiff = thisEnemy.attr('cy') - player.attr('cy');
      var dist = Math.sqrt( Math.pow(xDiff, 2) + Math.pow(yDiff, 2) );
      if (dist <= 20) {
        collided = true;
      }
    });
    if (collided) {
      delay = 500;
      board.style('background-color', 'red');
      if (highScore < currentScore) {
        highScore = currentScore;
        d3.select('.highscore span').text(highScore);
      }
      currentScore = 0;
      collisions++;
      d3.select('.collisions span').text(collisions);
      d3.select('.current span').text(currentScore);
      collided = false;
    }
    setTimeout(checkCollision, 10 + delay);
  };
  setTimeout(checkCollision, 10 + delay);

  var update = () => {
    enemies.transition()
      .duration(1000)
      .attr('cx', () => Math.random() * vw)
      .attr('cy', () => Math.random() * vh);
    currentScore++;
    d3.select('.current span').text(currentScore);
    setTimeout(update, 1000);
  };

  update();

})();