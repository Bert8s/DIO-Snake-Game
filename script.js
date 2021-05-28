/* NOTAS:

context.fillRect(x, y, width, height)
    x = The x-coordinate of the upper-left corner of the rectangle	
    y = The y-coordinate of the upper-left corner of the rectangle	
    width = The width of the rectangle, in pixels	
    height = The height of the rectangle, in pixels

*/

let canvas = document.getElementById("snake");
let context = canvas.getContext("2d");
let box = 32;

let foodOnPlace = false;

let snake = [];
snake[0] = {
  x: 8 * box,
  y: 8 * box,
};

let food = {
  x: 8 * box,
  y: 8 * box,
};

let direction = "right";

//Função para criar o campo de jogo
function createBG() {
  context.fillStyle = "lightgreen";
  context.fillRect(0, 0, 16 * box, 16 * box);
}

//Função para criar a cobrinha
function createSnake() {
  for (let i = 0; i < snake.length; i++) {
    context.fillStyle = "green";
    context.fillRect(snake[i].x, snake[i].y, box, box);
  }
}

//Função para criar a comida
function placeFood() {
  if (foodOnPlace == false) {
    food.x = Math.floor(Math.random() * 16) * box;
    food.y = Math.floor(Math.random() * 16) * box;
    foodOnPlace = true;
  }
  context.fillStyle = "orange";
  context.fillRect(food.x, food.y, box, box);
}

document.addEventListener("keydown", update);
document.addEventListener("keyup", update);
document.addEventListener("keyleft", update);
document.addEventListener("keyright", update);

function update(event) {
  if (event.keyCode == 37 && direction != "right") direction = "left";
  if (event.keyCode == 38 && direction != "down") direction = "up";
  if (event.keyCode == 39 && direction != "left") direction = "right";
  if (event.keyCode == 40 && direction != "up") direction = "down";
}

function startGame() {
  createBG();
  createSnake();
  placeFood();

  //console.log(snake[0].x, snake[0].y);

  let snakeX = snake[0].x;
  let snakeY = snake[0].y;

  if (direction == "right") snakeX += box;
  if (direction == "left") snakeX -= box;
  if (direction == "down") snakeY += box;
  if (direction == "up") snakeY -= box;

  snake.pop();

  let newHead = {
    x: snakeX,
    y: snakeY,
  };

  snake.unshift(newHead);

  if (snake[0].x > 15 * box && direction == "right") snake[0].x = 0;
  if (snake[0].y > 15 * box && direction == "down") snake[0].y = 0;
  if (snake[0].x < 0 && direction == "left") snake[0].x = 15 * box;
  if (snake[0].y < 0 && direction == "up") snake[0].y = 15 * box;
}

let jogo = setInterval(startGame, 500);
