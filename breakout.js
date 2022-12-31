let ball;           // Game object for the ball
let paddle;         // Game object for the paddle
let bricks;         // Game object for the bricks
let scoreText;      // Game object for showing score
let livesText;      // Game object for showing lives
let startButton;    // Game object for the start button
let gameOverText;   // Game object for showing "Game Over!"
let wonTheGameText; // Game object for showing "You won the game!"
let rotation;       // Flag will be used to define which direction the ball should rotate

let score = 0;      // Variable holding the number of scores
let lives = 3;      // Variable holding the remaining lives

// We are going to use these styles for texts
const textStyle = { 
    font: 'bold 18px Arial', 
    fill: '#FFF' 
};

const config = {
    type: Phaser.AUTO,
    width: window.innerWidth,
    height: window.innerHeight,
    backgroundColor: '#222',
    physics: {
        default: 'arcade',
        arcade: {
            // debug: true - Set debug: true if you want collision boxes to be drawn
            checkCollision: {
                up: true,
                down: false,
                left: true,
                right: true
            }
        }
    },
    scene: {
        preload,
        create,
        //continuous animation loop - also checks for conditions every frame (brick hit)
        update
    }
};

const game = new Phaser.Game(config);
breakout.js

function preload() {
    //this references current scene, first argument is key for asset 
    this.load.image('paddle', 'img/paddle.png');
    this.load.image('brick', 'img/brick.png');
    this.load.image('destroyed', 'img/destroyed.png');
    this.load.image('ball', 'img/ball.png');
}

//passing in the x and y position and the key from preload
//center then put at the bottom with -50px
//immovable phaser - won't be moved by collisions
function create() {
    paddle = this.physics.add.image(this.cameras.main.centerX, this.game.config.height - 50, 'paddle')
        .setImmovable();
}

ball = this.physics.add.image(this.cameras.main.centerX, this.game.config.height - 100, 'ball')
    .setCollideWorldBounds(true)
    .setBounce(1);




    //staticGroup - key (asset’s name) 
//     frameQuantity => number of times the image will be displayed 
//     gridAlign => alignments:

// width => number of items displayed on one line. 
// 20 bricks on two lines = 10×2 grid.
// cellWidth and cellHeight is for each individual item. 
//image itself is 50x50px. 5px paddings on each side = total value of 60. 
//centerX – (half of the width of the group). 
// and 100px from the top.
    
bricks = this.physics.add.staticGroup({
        key: 'brick',
        frameQuantity: 20,
        gridAlign: { width: 10, cellWidth: 60, cellHeight: 60, x: this.cameras.main.centerX - 277.5, y: 100 }
    });