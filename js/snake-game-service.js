/**
** module that provides methods to intialize and run a
** single loop of the game
**
** params:
** - ctx: html5 canvas context
** - height, width: height and width of playing screen
** - snakeStartLength: length which snake starts at
** - unit: size of one side of a single square in the game
**/
var SnakeGameService = (function(ctx, width, height, snakeStartLength, unit) {

  //helper module for generating random coordinates
  var random = RandomCoordModule(width, height, unit);

  var grid = GridModule(width, height, unit);
  var score = ScoreModule();

  //private game state variables
  var snake; //x, y coords of each block in the snake's body
  var points;
  var food; //x, y coords of food

  //game constants
  const backgroundColor = "#9dc997";
  const snakeColor = "black";

  /**
  ** some helper methods for drawing a single square according to the game's
  ** standard unit size
  **/
  function fillSquare(x, y) {
    ctx.clearRect(x * unit, y * unit, unit, unit);
    ctx.fillRect(x * unit, y * unit, unit, unit);
  }

  function drawSquareBorders(x, y) {
    ctx.strokeRect(x * unit, y * unit, unit, unit);
  }

  /**
  ** initialize the game screen
  **/
  function initGame() {
    ctx.canvas.width  = width;
    ctx.canvas.height = height;

    //initialize game state variables
    snake = [];
    dir = Direction.down;
    points = 0;
    food = {};

    //setup background
    ctx.fillStyle = backgroundColor;
    ctx.fillRect(0, 0, width, height);

    //set up snake body
    ctx.fillStyle = snakeColor;
    ctx.strokeStyle = backgroundColor;
    var startX = 2;
    var startY = 0;
    snake = [];

    for (var i = 0; i < snakeStartLength; i++) {
      snake.push({x: startX, y: startY + i});
      fillSquare(snake[i].x, snake[i].y);
      drawSquareBorders(snake[i].x, snake[i].y);
      grid.setFull(snake[i].x, snake[i].y);
    }

    drawFood();
    score.setupScore(points);
  }

  /**
  ** moves the snake 1 unit in the current direction
  **/
  function moveSnake() {
    var snakeHead = snake[snake.length - 1];
    var newHead = {x: snakeHead.x, y: snakeHead.y};
    //move new head forward
    switch (dir) {
      case Direction.up:
        newHead.y -= 1;
        break;

      case Direction.down:
        newHead.y += 1;
        break;

      case Direction.left:
        newHead.x -= 1;
        break;

      case Direction.right:
        newHead.x += 1;
        break;
    }
    //push new head and color the grid
    ctx.fillStyle = snakeColor;
    fillSquare(newHead.x, newHead.y);
    drawSquareBorders(newHead.x, newHead.y);
    snake.push(newHead);
    grid.setFull(newHead.x, newHead.y);

    //pop off tail and erase grid
    var front = 0;
    ctx.fillStyle = backgroundColor;
    fillSquare(snake[front].x, snake[front].y);
    grid.setEmpty(snake[front].x, snake[front].y);
    snake.shift();
  }

  //draw food in random spot in grid
  function drawFood() {
    food.x = random.randX();
    food.y = random.randY();

    //food may have spawned within the snake body - regenerate coords
    while (grid.isFull(food.x, food.y)) {
      food.x = random.randX();
      food.y = random.randY();
    }
    ctx.fillStyle = snakeColor;
    fillSquare(food.x, food.y);
  }

  /**
  ** checker functions to be called at each interval
  ** to either update points or detect a game over
  **/
  function checkFoodEaten() {
    var snakeHead = snake[snake.length - 1];
    return snakeHead.x == food.x && snakeHead.y == food.y;
  }

  function checkSelfCollision() {
    var snakeHead = snake[snake.length - 1];
    for (var i = 0; i < snake.length - 1; i++) {
      if (snake[i].x == snakeHead.x && snake[i].y == snakeHead.y) {
        return true;
      }
    }
    return false;
  }

  function checkWallCollision() {
    var snakeHead = snake[snake.length - 1];
    return (snakeHead.x < 0 || snakeHead.y < 0 || snakeHead.x >= width / unit || snakeHead.y >= height / unit);
  }

  /**
  ** produces a single loop of the game
  **/
  function runGameLoop() {
    moveSnake();
    if (checkSelfCollision() || checkWallCollision()) {
      clearInterval(gameLoop);
      startButton.disabled = false;
      score.setNewHighscore(points);
      alert("Game Over");
      return;
    }
    if (checkFoodEaten()) {
      points++;
      document.getElementById("score").innerHTML = "Score: " + points;
      snake.push({x: food.x, y: food.y});
      drawFood(); //respawn food
    }
  }

  return {
    initGame: function() {
      initGame();
    },
    runGameLoop: function() {
      runGameLoop();
    }
  }
});
