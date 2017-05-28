// [TODO] Add controls for user to adjust these variables
var collisionThreshold = 50;
var enemySpeed = 160;
var numEnemies = 7;

// Enemies our player must avoid
var Enemy = function(x, y, e) {
  if (!e) {
    e = 0;
  }
  this.sprite = 'images/enemy_' + e + '.png';
  this.speed = enemySpeed;
  this.x = x;
  this.y = y;
};
// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {

  // multiplying any movement by the dt parameter
  // which will ensure the game runs at the same speed for
  // all computers.

  this.x = this.x + (this.speed * dt);

  //regenerate after going off screen
  if (this.x >= 500) {
    this.reset();
  }
  //handle collisions
  if ((Math.abs(player.x - this.x) <= collisionThreshold) &&
    (Math.abs(player.y - this.y) <= collisionThreshold)) {
    jumbotron('YOU LOSER!!!!');
    player.x = player_init_x;
    player.y = player_init_y;
  }
};
//randomly reinitialize enemy so the pattern is not too predictable
Enemy.prototype.reset = function() {
  this.x = cols[Math.floor(Math.random() * 7)]
  this.y = rows[Math.floor(Math.random() * 3)]
};
// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
  console.log(this.sprite);
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

var Player = function(x, y) {
  this.sprite = 'images/char-cameron.png';
  this.x = x;
  this.y = y;
};
Player.prototype.update = function(dt) {
    var winThreshold = -20;
  if (this.y < winThreshold) {
    jumbotron("You win!!!!1111!1!!");
    this.reset();
  }
};
Player.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
//include thresholds so user cannot go off screen
Player.prototype.handleInput = function(type) {
  var moveSize = 20;
  switch (type) {
    case 'left':
      if (this.x > 0) {
        this.x -= moveSize;
      }
      return
    case 'right':
      if (this.x < 400) {
        this.x += moveSize;
      }
      return
    case 'up':
      if (this.y > -50) {
        this.y -= moveSize;
      }
      return
    case 'down':
      if (this.y < 400) {
        this.y += moveSize;
      }
      return
    default:
      return
  }
};

Player.prototype.reset = function() {
  this.x = player_init_x;
  this.y = player_init_y;
};

// Now instantiate your objects.
//arrays of possible coordinates
var cols = [-100, -150, -200, -300, -400, -500];
var rows = [60, 140, 220];
//randomly generate some enemies
var allEnemies = [];
for (var i = 0; i < numEnemies; i++) {
  var x = cols[Math.floor(Math.random() * 7)]
  var y = rows[Math.floor(Math.random() * 3)]
  var e = Math.floor(Math.random() * 2)
  allEnemies.push(new Enemy(x, y, e));
}

//player should always start in the initial position
var player_init_x = 200;
var player_init_y = 390;
var player = new Player(player_init_x, player_init_y);

//capture user control events
document.addEventListener('keyup', function(e) {
  var allowedKeys = {
    37: 'left',
    38: 'up',
    39: 'right',
    40: 'down'
  };
  player.handleInput(allowedKeys[e.keyCode]);
});

//helper methods

//this flashes a message across the screen
function jumbotron(text) {
  var jumbo = $('.jumbotron');
  jumbo.html(text).addClass('fly');
  setTimeout(function() {
    jumbo.html('').removeClass('fly');
  }, 2000);
}
