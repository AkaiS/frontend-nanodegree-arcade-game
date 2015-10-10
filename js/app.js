
var Selector = function() {
    this.sprite = 'images/Selector.png';
    this.characters = [
        'images/char-boy.png',
        'images/char-cat-girl.png',
        'images/char-horn-girl.png',
        'images/char-pink-girl.png',
        'images/char-princess-girl.png'
    ];
    this.x = 303;
    this.y = 303;
}

Selector.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

Selector.prototype.handleInput = function(key) {
    // Provide cases for inputs
    switch(key) {
        case 'left':
            if (this.x > 101) {
                this.x -= 101;
            }
            break;
        case 'right':
            if (this.x < 505) {
                this.x += 101;
            }
            break;
        case 'space':
            this.select();
            break;
    }
}

Selector.prototype.select = function() {
    player.sprite = this.characters[((this.x - 101) / 101)];
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
    this.difficulties = {'easy': 50, 'medium': 100, 'hard': 150};
    this.difficulty;
}

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x = this.x + (dt * this.rate);

    // Bugs reappear on other side of the screen after exiting one side
    if (this.x > 700) {
        this.x = -100;
    }
}

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

var Player = function() {
    this.sprite;
    this.x = 303;
    this.y = 562;
}

Player.prototype.handleInput = function(key) {
    // Provide cases for inputs
    switch(key) {
        case 'up':
            if (this.y > 0) { //Make sure the player won't go off the map
                this.y -= 83;
            }
            break;
        case 'down':
            if (this.y < 550) {
                this.y += 83;
            }
            break;
        case 'left':
            if (this.x > 0) {
                this.x -= 101;
            }
            break;
        case 'right':
            if (this.x < 600) {
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
    this.x = 303;
    this.y = 562;
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

allEnemies = [];
for (var i=0; i<6; i++) {
    var enemy = new Enemy(i * 101, 60 + (i * 83));
    allEnemies.push(enemy);
}

var player = new Player();

var selector = new Selector();


// This listens for key presses and sends the keys to
// selector.handleInput() method.
var listener = function(e) {
    var allowedKeys = {
        32: 'space',
        37: 'left',
        39: 'right',
    };

    selector.handleInput(allowedKeys[e.keyCode]);
}

var selectorListener = function() {
    document.addEventListener('keyup', listener);
}

// remove listener so keys can be used for game
var removeSelectorListener = function() {
    document.removeEventListener('keyup', listener);
}
// This listens for key presses and sends the keys to
// player.handleInput() method.
var gameListener = function() {
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
}
