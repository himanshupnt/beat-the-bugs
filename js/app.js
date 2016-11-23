// Enemies our player must avoid
var Enemy = function(x, y, speed, score, gameLevel) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.speed = speed;
    this.x = x;
    this.y = y;
    this.score = 0;
    this.gameLevel = 0;
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

Enemy.prototype.checkCollision = function() {
    // check for collision between enemy and player
    if (
        player.y + 131 >= this.y + 90
        && player.x + 25 <= this.x + 88
        && player.y + 73 <= this.y + 135
        && player.x + 76 >= this.x + 11) {
        console.log('Bam, try again!');
        player.reset();
    }
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x = this.x + (this.speed * dt);
    
    // loop enemies to left side of canvas after reaching canvas.width
    if (this.x >= 505) {
        this.x = -150;
    }

    // Check for collision
    this.checkCollision();
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(x, y, speed) {
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.sprite = 'images/char-boy.png';
};

Player.prototype.update = function() {
    
};

Player.prototype.reset = function() {
        player.x = 202.5;
        player.y = 383;
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    // check for player reaching top of canvas and winning the game
    // if player wins, add 1 to the score and level
    // pass score as an argument to the increaseDifficulty function
    if (this.y + 30 <= 0) {        
        this.reset();
        console.log('Win!');

        ctx.fillStyle = 'white';
        ctx.fillRect(0, 0, 505, 171);

        score += 1;
        gameLevel += 1;
        console.log('current score: ' + score + ', current level: ' + gameLevel);
        increaseDifficulty(score);

    }
    this.displayScoreLevel(score, gameLevel);

};

Player.prototype.handleInput = function(keyPress) {
    if (keyPress == 'left') {
        this.x -= this.speed;
    }
    if (keyPress == 'up') {
        this.y -= this.speed - 20;
    }
    if (keyPress == 'right') {
        this.x += this.speed;
    }
    if (keyPress == 'down') {
        this.y += this.speed - 20;
    }
    console.log('keyPress is: ' + keyPress);
    // check if player runs into left, bottom, or right canvas walls
    // prevent player from moving beyond canvas wall boundaries
    if (this.y > 383 ) {
        this.y = 383;
    }
    if (this.x > 402.5) {
        this.x = 402.5;
    }
    if (this.x < 2.5) {
        this.x = 2.5;
    }
};

Player.prototype.displayScoreLevel = function(aScore, aLevel) {
    var canvas = document.getElementsByTagName('canvas');
    var firstCanvasTag = canvas[0];

    // add player score and level to div element created
    scoreLevelDiv.innerHTML = 'Score: ' + aScore
        + ' / ' + 'Level: ' + aLevel;
    document.body.insertBefore(scoreLevelDiv, firstCanvasTag[0]);
};

// Increase number of enemies on screen based on player's score
var increaseDifficulty = function(numEnemies) {
    // remove all previous enemies on canvas
    allEnemies.length = 0;

    // load new set of enemies
    for (var i = 0; i <= numEnemies; i++) {
        var enemy = new Enemy(-150, Math.random() * 184 + 50, Math.random() * 256);

        allEnemies.push(enemy);
    }
};


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

var allEnemies = [];
var player = new Player(202.5, 383, 50);
var score = 0;
var gameLevel = 1;
var scoreLevelDiv = document.createElement('div');
var enemy = new Enemy(-150, Math.random() * 184 + 50, Math.random() * 256, 0, 0);

allEnemies.push(enemy);

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
