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

let snake = [];
snake[0] = {
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

function startGame() {
  createBG();
  createSnake();

  console.log(snake[0].x, snake[0].y);

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

  if (snake[0].x > 512) snake[0].x = 0;
  if (snake[0].y > 512) snake[0].y = 0;
}

let jogo = setInterval(startGame, 90);
