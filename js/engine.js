/**
** engine.js
** sets up event handlers and runs the main game loop
**/

//globals
const Direction = {"up": 1, "down": 2, "right": 3, "left": 4}; //Direction enum
var dir; //current direction snake is travelling

(function() {
  var canvas = document.getElementById("canvas");
  var ctx = canvas.getContext("2d");
  var startButton = document.getElementById("start-button");

  startButton.addEventListener("click", function() {
    var service = SnakeGameService(ctx, 500, 500, 10, 25);
    service.initGame();
    var gameSpeed = 120; //interval time in millis
    gameLoop = setInterval(service.runGameLoop, gameSpeed);
    startButton.disabled = true;
  });

  document.addEventListener("keydown", function(event) {
    switch (event.keyCode) {
      case 37:
        if (dir != Direction.right) {
          dir = Direction.left;
        }
        break;

      case 38:
        if (dir!= Direction.down) {
          dir = Direction.up;
        }
        break;

      case 39:
        if (dir != Direction.left) {
          dir = Direction.right;
        }
        break;

      case 40:
        if (dir != Direction.up) {
          dir = Direction.down;
        }
        break;
    }
  });
}());
