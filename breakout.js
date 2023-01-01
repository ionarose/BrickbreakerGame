//initialise game objects

let ball; 
let paddle; 
let bricks; 
let scoreText; 
let livesText; 
let startButton; 
let gameOverText;
let wonTheGameText; 
let rotation; 

let score = 0; 
let lives = 3; 

// set text style as an oject to reuse
const textStyle = {
  font: "bold 18px Arial",
  fill: "#FFF",
};

const config = {
  type: Phaser.AUTO,
  width: window.innerWidth,
  height: window.innerHeight,
  backgroundColor: "#bceaf7",
  physics: {
    default: "arcade",
    arcade: {
      // debug: true - for collision boxes
      checkCollision: {
        up: true,
        down: false,
        left: true,
        right: true,
      },
    },
  },
  scene: {
    preload,
    create,
    update,
  },
};

const game = new Phaser.Game(config);

function preload() {
  //this references current scene, first argument is key for asset
  this.load.image("paddle", "img/leafSprite.png");
  this.load.image("brick", "img/titSprite.png");
  this.load.image("destroyed", "img/happyTitSprite.png");
  this.load.image("ball", "img/strawberrySprite.png");
}

//passing in the x and y position and the key from preload
//center then put at the bottom with -50px
//immovable phaser - won't be moved by collisions

function create() {
  paddle = this.physics.add
    .image(this.cameras.main.centerX, this.game.config.height - 50, "paddle")
    .setImmovable();

  ball = this.physics.add
    .image(this.cameras.main.centerX, this.game.config.height - 100, "ball")
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
    key: "brick",
    frameQuantity: 20,
    gridAlign: {
      width: 10,
      cellWidth: 60,
      cellHeight: 60,
      x: this.cameras.main.centerX - 277.5,
      y: 100,
    },
  });
  //UI simple score tracker. Parameters are X,Y coords and the style config object

  scoreText = this.add.text(20, 20, "Score: 0", textStyle);
  livesText = this.add
    .text(this.game.config.width - 20, 20, "Lives: " + lives, textStyle)
    .setOrigin(1, 0);

  // anchor positioned on the top left corner again, need to move it to the middle with setOrigin(0.5).
  // added some padding and overrides for the default styles with setStyle.
  // hide at beginning with the setVisible method.

  gameOverText = this.add
    .text(
      this.cameras.main.centerX,
      this.cameras.main.centerY,
      "The birds starved to death :(",
      textStyle
    )
    .setOrigin(0.5)
    .setPadding(10)
    .setStyle({ backgroundColor: "#111", fill: "#e74c3c"})
    .setVisible(false);

  wonTheGameText = this.add
    .text(
      this.cameras.main.centerX,
      this.cameras.main.centerY,
      "the birds have feasted",
      textStyle
    )
    .setOrigin(0.5)
    .setPadding(10)
    .setStyle({ backgroundColor: "#111", fill: "#27ae60" })
    .setVisible(false);

  //GAME LOGIC

  //remove the start button by calling destroy on it.
  //To shoot out the ball we can apply a force using setVelocity. It takes in two forces, one on the x and one on the y axis. We also set the rotation to left which we will later use to rotate the ball as it flies.

  // move paddle => add event listener on the whole scene with input.on.
  //Inside the callback, we set the paddle’s x position to the mouse x position.
  // pointer.x has min and max to keep it inside the screen.
  // done using the Math.Clamp method.

  startButton = this.add
    .text(
      this.cameras.main.centerX,
      this.cameras.main.centerY,
      "Start game",
      textStyle
    )
    .setOrigin(0.5)
    .setPadding(10)
    .setStyle({ backgroundColor: "#111" })
    .setInteractive({ useHandCursor: true })
    .on("pointerdown", () => startGame.call(this))
    .on("pointerover", () => startButton.setStyle({ fill: "#f39c12" }))
    .on("pointerout", () => startButton.setStyle({ fill: "#FFF" }));

  //HANDLE COLLISIONS
  //add.collider expects 5 params:

  // 1: The two objects which between the collision happens
  // 2: A callback function that will run on collision
  // A process callback, which will fire when the two objects intersect. similar but  must return a boolean. can just be null
  // The context of the callback function
  // When the ball collides with a brick-> brickHit function, when it collides with the paddle-> paddleHit function. 

  this.physics.add.collider(ball, bricks, brickHit, null, this);
  this.physics.add.collider(ball, paddle, paddleHit, null, this);
}

//handles roation of berry and game over
//  higher the value, the faster the rotation 
//if the ball is below the paddle->decrease the number of lives and reset the ball’s position.

function update() {
  if (rotation) {
    ball.rotation =
      rotation === "left" ? ball.rotation - 0.05 : ball.rotation + 0.05;
  }

  if (ball.y > paddle.y) {
    lives--;

    if (lives > 0) {
      livesText.setText(`Lives: ${lives}`);

      ball
        .setPosition(this.cameras.main.centerX, this.game.config.height - 100)
        .setVelocity(300, -150);
    } else {
      ball.destroy();

      gameOverText.setVisible(true);
    }
  }
}

function paddleHit(ball, paddle) {
  var diff = 0;

  if (ball.x < paddle.x) {
    diff = paddle.x - ball.x;
    ball.setVelocityX(-20 * diff);
    rotation = "left";
  } else if (ball.x > paddle.x) {
    diff = ball.x - paddle.x;
    ball.setVelocityX(20 * diff);
    rotation = "right";
  } else {
    ball.setVelocityX(2 + Math.random() * 10);
  }
}

//hit animation

//setTexture method -> pass in the key of the preloaded asset. 
//increase the score,  re-set the text to be updated. 
//animation created with tween.add.

//Config:
//targets  determine which game object will be animated. 
//easings for  animation and a duration. 
//By setting scaleX and scaleY to 0, we can shrink it down and by using angle: 180 it will rotate it by 180° in the meantime. 
//Delay to stop the animation from starting as soon as the collision happens
// Once the animation completes, get rid of the brick and also do a check. 
//If no more bricks -> remove the ball and display win message.

function brickHit(ball, brick) {
  brick.setTexture("destroyed");
  score += 5;
  scoreText.setText(`Score: ${score}`);

  this.tweens.add({
    targets: brick,
    scaleX: 0,
    scaleY: 0,
    ease: "Power1",
    duration: 500,
    delay: 250,
    angle: 180,
    onComplete: () => {
      brick.destroy();

      if (bricks.countActive() === 0) {
        ball.destroy();

        wonTheGameText.setVisible(true);
      }
    },
  });
}

function startGame() {
  startButton.destroy();
  ball.setVelocity(-300, -150);
  rotation = "left";

  this.input.on("pointermove", (pointer) => {
    paddle.x = Phaser.Math.Clamp(
      pointer.x,
      paddle.width / 2,
      this.game.config.width - paddle.width / 2
    );
  });
}
