
var Selector = function() {
    this.sprite = 'images/Selector.png';
    this.character;
    this.x = 202;
    this.y = 505;
}

Selector.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y)
}

// Enemies our player must avoid
var Enemy = function(x, y) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = x;
    this.y = y;
    this.rate = (50 + Math.floor(Math.random() * 150));
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x = this.x + (dt * this.rate);

    // Bugs reappear on other side of the screen after exiting one side
    if (this.x > 550) {
        this.x = -100;
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

var Player = function() {
    this.sprite = selector.character;
    this.x = 202;
    this.y = 404;
};

Player.prototype.handleInput = function(key) {
    // Provide cases for inputs
    switch(key) {
        case 'up':
            if (this.y > 0) { //Make sure the player won't go off the map
                this.y -= 85;
            }
            break;
        case 'down':
            if (this.y < 404) {
                this.y += 85;
            }
            break;
        case 'left':
            if (this.x > 0) {
                this.x -= 101;
            }
            break;
        case 'right':
            if (this.x < 404) {
                this.x += 101;
            }
            break;
        case 'space':
            this.reset();
            break;
    }
}

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

Player.prototype.reset = function() {
    this.x = 202;
    this.y = 404;
}

Player.prototype.update = function() {

}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

allEnemies = [];
for (var i=0; i<4; i++) {
    var enemy = new Enemy(i * 101, 50 + (i * 85));
    allEnemies.push(enemy);
}

var player = new Player();

var selector = new Selector();


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        32: 'space',
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
