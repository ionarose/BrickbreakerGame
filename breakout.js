let ball; // Game object for the ball
let paddle; // Game object for the paddle
let bricks; // Game object for the bricks
let scoreText; // Game object for showing score
let livesText; // Game object for showing lives
let startButton; // Game object for the start button
let gameOverText; // Game object for showing "Game Over!"
let wonTheGameText; // Game object for showing "You won the game!"
let rotation; // Flag will be used to define which direction the ball should rotate

let score = 0; // Variable holding the number of scores
let lives = 3; // Variable holding the remaining lives

// We are going to use these styles for texts
const textStyle = {
  font: "bold 18px Arial",
  fill: "#FFF",
};

const config = {
  type: Phaser.AUTO,
  width: window.innerWidth,
  height: window.innerHeight,
  backgroundColor: "#222",
  physics: {
    default: "arcade",
    arcade: {
      // debug: true - Set debug: true if you want collision boxes to be drawn
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

// function create() {
//   paddle = this.physics.add
//     .image(this.cameras.main.centerX, this.game.config.height - 50, "paddle")
//     .setImmovable();
// }

// ball = this.physics.add
//   .image(this.cameras.main.centerX, this.game.config.height - 100, "ball")
//   .setCollideWorldBounds(true)
//   .setBounce(1);

// //staticGroup - key (asset’s name)
// //     frameQuantity => number of times the image will be displayed
// //     gridAlign => alignments:

// // width => number of items displayed on one line.
// // 20 bricks on two lines = 10×2 grid.
// // cellWidth and cellHeight is for each individual item.
// //image itself is 50x50px. 5px paddings on each side = total value of 60.
// //centerX – (half of the width of the group).
// // and 100px from the top.

// bricks = this.physics.add.staticGroup({
//   key: "brick",
//   frameQuantity: 20,
//   gridAlign: {
//     width: 10,
//     cellWidth: 60,
//     cellHeight: 60,
//     x: this.cameras.main.centerX - 277.5,
//     y: 100,
//   },
// });

// //UI simple score tracker. Parameters are X,Y coords and the style config object

// scoreText = this.add.text(20, 20, "Score: 0", textStyle);
// livesText = this.add
//   .text(this.game.config.width - 20, 20, `Lives: ${lives}`, textStyle)
//   .setOrigin(1, 0);

// // anchor positioned on the top left corner again, need to move it to the middle with setOrigin(0.5).
// // added some padding and overrides for the default styles with setStyle.
// // hide at beginning with the setVisible method.

// gameOverText = this.add
//   .text(
//     this.cameras.main.centerX,
//     this.cameras.main.centerY,
//     "Game over!",
//     textStyle
//   )
//   .setOrigin(0.5)
//   .setPadding(10)
//   .setStyle({ backgroundColor: "#111", fill: "#e74c3c" })
//   .setVisible(false);

// wonTheGameText = this.add
//   .text(
//     this.cameras.main.centerX,
//     this.cameras.main.centerY,
//     "You won the game!",
//     textStyle
//   )
//   .setOrigin(0.5)
//   .setPadding(10)
//   .setStyle({ backgroundColor: "#111", fill: "#27ae60" })
//   .setVisible(false);

// // START BUTTON
// //     setInteractive makes it a button
// //     Adding useHandCursor shows a pointer when hovered instead of the default cursor.
// //     For hover, we can set a different fill color. pointerout will be the blur event where we set back the style.
// //     On click — which is handled by pointerdown — we call the startGame function.

// startButton = this.add
//   .text(
//     this.cameras.main.centerX,
//     this.cameras.main.centerY,
//     "Start game",
//     textStyle
//   )
//   .setOrigin(0.5)
//   .setPadding(10)
//   .setStyle({ backgroundColor: "#111" })
//   .setInteractive({ useHandCursor: true })
//   .on("pointerdown", () => startGame.call(this))
//   .on("pointerover", () => startButton.setStyle({ fill: "#f39c12" }))
//   .on("pointerout", () => startButton.setStyle({ fill: "#FFF" }));

// //GAME LOGIC

// //remove the start button by calling destroy on it. 
// //To shoot out the ball we can apply a force using setVelocity. It takes in two forces, one on the x and one on the y axis. We also set the rotation to left which we will later use to rotate the ball as it flies.

// // move paddle => add event listener on the whole scene with input.on. 
// //Inside the callback, we set the paddle’s x position to the mouse x position. 
// //To avoid moving it outside of the screen, we force pointer.x to be between a min and a max value. 
// //This is done using the Math.Clamp method.

// function startGame() {
//   startButton.destroy();
//   ball.setVelocity(-300, -150);
//   rotation = "left";


//   this.input.on("pointermove", (pointer) => {
//     paddle.x = Phaser.Math.Clamp(
//       pointer.x,
//       paddle.width / 2,
//       this.game.config.width - paddle.width / 2
//     );
//   });
// }


// //HANDLE COLLISIONS
// //add.collider expects 5 params:

// // The two objects which between the collision happens
// // A callback function that will run whenever the two objects collide
// // A process callback, which will fire when the two objects intersect. It is similar to the callback function, but it must return a boolean. We can leave it null.
// // The context of the callback function
// // When the ball collides with a brick, we run the brickHit function, when it collides with the paddle, we run the paddleHit function. Let’s see first what happens when we hit a brick:

// this.physics.add.collider(ball, bricks, brickHit, null, this);
// this.physics.add.collider(ball, paddle, paddleHit, null, this);

// //hit animation

// //To switch between textures we can use the setTexture method where we pass in the key of the preloaded asset. After increasing the score, we simply re-set the text to be updated. To create the animation, we can use tween.add.

// // As you can see, we have a bunch of configuration options to set. targets will determine which game object will be animated. We can add easings for the animation and a duration. By setting scaleX and scaleY to 0, we can shrink it down and by using angle: 180 it will rotate it by 180° in the meantime. To stop the animation from starting as soon as the collision happens, we can also specify a delay.

// // Once the animation completes, we can get rid of the brick and also do a check. If there are no more bricks on the screen, we can remove the ball and display the “You won!” message.

// function brickHit(ball, brick) {
//     brick.setTexture('destroyed');
   
//     score += 5;
//     scoreText.setText(`Score: ${score}`);

//     this.tweens.add({
//         targets: brick,
//         ease: 'Power1',
//         scaleX: 0,
//         scaleY: 0,
//         angle: 180,
//         duration: 500,
//         delay: 250,
//         onComplete: () => { 
//             brick.destroy();

//             if (bricks.countActive() === 0) {
//                 ball.destroy();

//                 wonTheGameText.setVisible(true);
//             }
//         }
//     });
// }

// //paddle hitting - not necessary as will bounce anyway, used to add randomness

// //If the ball’s x position is less than the paddle’s x position, it means that the ball hit the left side of the paddle. In this case, we want to apply a negative x force to shoot it to the left side. Otherwise, it hit the right-hand side in which case, we shoot it to the right. If it falls completely perpendicular to the paddle, we still want to add some x velocity to avoid shooting it straight up. We will also switch directions between the rotation based on which side of the paddle the ball falls.


// function paddleHit(ball, paddle) {
//     let diff = 0;

//     if (ball.x < paddle.x) {
//         diff = paddle.x - ball.x;
//         ball.setVelocityX(-20 * diff);
//         rotation = 'left';
//     } else if (ball.x > paddle.x) {
//         diff = ball.x - paddle.x;
//         ball.setVelocityX(20 * diff);
//         rotation = 'right';
//     } else {
//         ball.setVelocityX(2 + Math.random() * 10);
//     }
// }

// //handles roation of berry and game over
// //We can add a rotation to our ball by setting ball.rotation, based on the value of our rotation flag. The higher the value, the faster the rotation will be.

// //To check whether we are about to lose a life or not, we can simply check if the ball is below the paddle. If it is, we decrease the number of lives and reset the ball’s position. If we are unlucky and there’s no more life left, we are presented with the game over message.
// function update() {
//     if (rotation) {
//         ball.rotation = rotation === 'left' ?  ball.rotation - .05 : ball.rotation + .05;
//     }

//     if (ball.y > paddle.y) {
//         lives--;

//         if (lives > 0) {
//             livesText.setText(`Lives: ${lives}`);

//             ball.setPosition(this.cameras.main.centerX, this.game.config.height - 100)
//                 .setVelocity(300, -150);
//         } else {
//             ball.destroy();

//             gameOverText.setVisible(true);
//         }
//     }
// }

function create() {
    paddle = this.physics.add.image(this.cameras.main.centerX, this.game.config.height - 50, 'paddle')
       .setImmovable();

    ball = this.physics.add.image(this.cameras.main.centerX, this.game.config.height - 100, 'ball')
        .setCollideWorldBounds(true)
        .setBounce(1);

    bricks = this.physics.add.staticGroup({
        key: 'brick',
        frameQuantity: 20,
        gridAlign: { width: 10, cellWidth: 60, cellHeight: 60, x: this.cameras.main.centerX - 277.5, y: 100 }
    });

    scoreText = this.add.text(20, 20, 'Score: 0', textStyle);
    livesText = this.add.text(this.game.config.width - 20, 20, 'Lives: '+lives, textStyle).setOrigin(1, 0);
    
    gameOverText = this.add.text(this.cameras.main.centerX, this.cameras.main.centerY, 'Game over!', textStyle)
        .setOrigin(0.5)
        .setPadding(10)
        .setStyle({ backgroundColor: '#111', fill: '#e74c3c' })
        .setVisible(false);

    wonTheGameText = this.add.text(this.cameras.main.centerX, this.cameras.main.centerY, 'You won the game!', textStyle)
        .setOrigin(0.5)
        .setPadding(10)
        .setStyle({ backgroundColor: '#111', fill: '#27ae60' })
        .setVisible(false);

    startButton = this.add.text(this.cameras.main.centerX, this.cameras.main.centerY, 'Start game', textStyle)
        .setOrigin(0.5)
        .setPadding(10)
        .setStyle({ backgroundColor: '#111' })
        .setInteractive({ useHandCursor: true })
        .on('pointerdown', () => startGame.call(this))
        .on('pointerover', () => startButton.setStyle({ fill: '#f39c12' }))
        .on('pointerout', () => startButton.setStyle({ fill: '#FFF' }));

    this.physics.add.collider(ball, bricks, brickHit, null, this);
    this.physics.add.collider(ball, paddle, paddleHit, null, this);
}

function update() {
    if (rotation) {
        ball.rotation = rotation === 'left' ?  ball.rotation - .05 : ball.rotation + .05;
    }

    if (ball.y > paddle.y) {
        lives--;

        if (lives > 0) {
            livesText.setText(`Lives: ${lives}`);

            ball.setPosition(this.cameras.main.centerX, this.game.config.height - 100)
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
        rotation = 'left';
    } else if (ball.x > paddle.x) {
        diff = ball.x - paddle.x;
        ball.setVelocityX(20 * diff);
        rotation = 'right';
    } else {
        ball.setVelocityX(2 + Math.random() * 10);
    }
}

function brickHit(ball, brick) {
    brick.setTexture('destroyed');
   
    score += 5;
    scoreText.setText(`Score: ${score}`);

    this.tweens.add({
        targets: brick,
        scaleX: 0,
        scaleY: 0,
        ease: 'Power1',
        duration: 500,
        delay: 250,
        angle: 180,
        onComplete: () => { 
            brick.destroy();

            if (bricks.countActive() === 0) {
                ball.destroy();

                wonTheGameText.setVisible(true);
            }
        }
    });
}

function startGame() {
    startButton.destroy();
    ball.setVelocity(-300, -150);
    rotation = 'left';

    this.input.on('pointermove', pointer => {
        paddle.x = Phaser.Math.Clamp(pointer.x, paddle.width / 2, this.game.config.width - paddle.width / 2);
    });
}
