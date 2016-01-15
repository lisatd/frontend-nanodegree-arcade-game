/**
 * Super class that contains shared methods for objects in the game
 * @constructor
 */
var Char = function() { };

/**
 * Draws the image on the canvas
 */
Char.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

/**
 * Enemies our player must avoid
 * @param x {int} - x coordinate position
 * @param y {int) - y coordinate position
 * @param s {int} - speed
 * @constructor
 */
var Enemy = function(x, y, s) {
    this.sprite = 'images/enemy-bug.png';
    this.x = x;
    this.y = y;
    this.speed = s;
};

// Inherit methods off Char class
Enemy.prototype = Object.create(Char.prototype);

/**
 * Updates the location of the enemy based on speed
 * @param dt {double} - a time delta between ticks
 */
Enemy.prototype.update = function(dt) {
    this.x += (this.speed * dt);
    if (this.x > 500)
        this.x = -100;
};

/**
 * Player object which defaults player to start at 200,400.
 * @constructor
 */
var Player = function() {
    this.sprite = 'images/char-boy.png';
    this.x = 200;
    this.y = 400;
};

// Inherit methods off Char class
Player.prototype = Object.create(Char.prototype);

/**
 * Checks if the player has reached the water is colliding with the enemy
 */
Player.prototype.update = function() {
    var player = this;
    var messagesDiv = document.getElementById('message'); // div for displaying message

    // Loop thru all enemies to check if player is colliding
    // Uses hit box 80x70
    allEnemies.forEach(function(enemy) {
        if (enemy.y + 70 > player.y && enemy.y - 70 < player.y)
            if (enemy.x + 80 > player.x && enemy.x - 80 < player.x){
                // If colliding, display lose message in red, then reset game
                messagesDiv.innerHTML = 'you lost!';
                messagesDiv.style.color = 'red';
                resetSprites();
            }
    });

    // If player has reached the top (water), then display win message in green
    // and reset game
    if (player.y <= 0) {
        document.getElementById('message').innerHTML = 'you win!';
        messagesDiv.style.color = 'green';
        resetSprites();
    }
};

/**
 * Move player based on key input
 * @param key {string} - the keyboard input
 */
Player.prototype.handleInput = function(key) {
    if (!key) return;
    switch (key) {
        case 'left':
            this.x -= 100;
            if (this.x <= 0)
                this.x = 0;
            break;
        case 'right':
            this.x += 100;
            if (this.x >=500)
                this.x = 400;
            break;
        case 'up':
            this.y -= 82;
            if (this.y <= -10)
                this.y = -10;
            break;
        case 'down':
            this.y += 82;
            if (this.y >= 400)
                this.y = 400;
            break;
    }
};

// Instantiate variables to store enemies and the player
// Call reset game to create the characters
var allEnemies, player;
resetSprites();

// This listens for key presses and sends the keys to your
// Player.handleInput() method.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

/**
 * Create all enemies and the player
 */
function resetSprites() {
    allEnemies = [
        new Enemy(100, 145, 20),
        new Enemy(0, 60, 25),
        new Enemy(200, 230, 30),
        new Enemy(50, 230, 65),
        new Enemy(50, 60, 35),
        new Enemy(200, 145, 50)];

    // Create a new enemy after 4 seconds
    setTimeout(function() {
        allEnemies.push(new Enemy(-100, 60, 70));
    }, 4000);

    player = new Player();
}
