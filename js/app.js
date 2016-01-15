// Enemies our player must avoid
var Enemy = function(x, y, s) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = x;
    this.y = y;
    this.speed = s;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += (this.speed * dt);
    if (this.x > 500)
        this.x = -100;
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function() {
    this.sprite = 'images/char-boy.png';
    this.x = 200;
    this.y = 400;
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.update = function() {
    var player = this;
    var messagesDiv = document.getElementById('message');
    allEnemies.forEach(function(enemy) {
        if (enemy.y + 70 > player.y && enemy.y - 70 < player.y)
            if (enemy.x + 80 > player.x && enemy.x - 80 < player.x){
                messagesDiv.innerHTML = 'you lost!';
                messagesDiv.style.color = 'red';
                resetSprites();
            }
    });

    if (player.y <= 0) {
        document.getElementById('message').innerHTML = 'you win!';
        messagesDiv.style.color = 'green';
        resetSprites();
    }
};

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

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies, player;
resetSprites();

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

function resetSprites() {
    allEnemies = [new Enemy(100, 145, 20), new Enemy(0, 60, 25), new Enemy(200, 230, 30), new Enemy(50, 60, 35)];
    player = new Player();
}
