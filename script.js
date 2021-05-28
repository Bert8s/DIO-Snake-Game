/* NOTAS:

context.fillRect(x, y, width, height)
    x = The x-coordinate of the upper-left corner of the rectangle	
    y = The y-coordinate of the upper-left corner of the rectangle	
    width = The width of the rectangle, in pixels	
    height = The height of the rectangle, in pixels

*/

//Inicializações
let canvas = document.getElementById("snake");
let context = canvas.getContext("2d");
let box = 32;
let direction = "right";
let changeDirection = true;
let score = 0;
let highScore = 0;

//Inicializa os contadores para a pontuação
document.getElementById("score").innerHTML = 0;
document.getElementById("high-score").innerHTML = 0;

//Objeto cobrinha
let snake = [];
snake[0] = {
  x: 8 * box,
  y: 8 * box,
};

//Objeto comida. Cria as coordenadas de maneira aleatòria
let food = {
  x: Math.floor(Math.random() * 16) * box,
  y: Math.floor(Math.random() * 16) * box,
};

//Função para criar o campo de jogo
function createBG() {
  context.fillStyle = "#E1A95F";
  context.fillRect(0, 0, 16 * box, 16 * box);
}

//Função para criar a cobrinha
function createSnake() {
  for (let i = 0; i < snake.length; i++) {
    context.fillStyle = "green";
    context.fillRect(snake[i].x, snake[i].y, box, box);
  }
}

//Função para criar a comida no campo de jogo
function placeFood() {
  context.fillStyle = "red";
  context.fillRect(food.x, food.y, box, box);
}

//Adicionando eventos para os botões de direções
document.addEventListener("keydown", update);
document.addEventListener("keyup", update);
document.addEventListener("keyleft", update);
document.addEventListener("keyright", update);

//Função para mudar direção. Ela é chamada quando um dos botões de direção é apertado. A bool 'Changedirection' é usado para ter a certeza de que a cobra só vai poder efetuar um giro de 180 graus em dois movimentos como máximo.
function update(event) {
  if (changeDirection == true) {
    if (event.keyCode == 37 && direction != "right") direction = "left";
    if (event.keyCode == 38 && direction != "down") direction = "up";
    if (event.keyCode == 39 && direction != "left") direction = "right";
    if (event.keyCode == 40 && direction != "up") direction = "down";
    changeDirection = false;
  }
}

//Função para iniciar o jogo
function startGame() {
  //Se o tamano da cobrinha é maior de 1
  if (snake.length > 1) {
    for (i = 1; i < snake.length; i++) {
      if (snake[0].x === snake[i].x && snake[0].y === snake[i].y) {
        if (score >= highScore) {
          highScore = score;
          console.log("High Score: ", highScore);
        }
        document.getElementById("high-score").innerHTML = highScore;

        clearInterval(jogo);
        alert("Game Over ;__(");
      }
    }
  }

  //Chama as funções para criar o campo de jogo, a cobrinha e a comida.
  createBG();
  createSnake();
  placeFood();

  //Variavéis para guardar a posição atual da cobrinha
  let snakeX = snake[0].x;
  let snakeY = snake[0].y;

  //Dependendo da direção modifica as variavéis das coordenadas da cobra
  if (direction == "right") snakeX += box;
  if (direction == "left") snakeX -= box;
  if (direction == "down") snakeY += box;
  if (direction == "up") snakeY -= box;

  //Tira a última parte da cobra (posição da array snake) no caso que as coordenadas sejam diferentes
  if (snakeX != food.x || snakeY != food.y) {
    snake.pop();
  } else {
    food.x = Math.floor(Math.random() * 16) * box;
    food.y = Math.floor(Math.random() * 16) * box;
    score += 5;
    document.getElementById("score").innerHTML = score;
  }

  //Objeto para recever as coordenadas atualizadas da cabeça da cobrinha
  let newHead = {
    x: snakeX,
    y: snakeY,
  };

  //Adiciona as coordenadas atuais da cabeça da cobra na array snake
  snake.unshift(newHead);

  //Reseteamos o valor bool para true
  changeDirection = true;

  //Condições para fazer sair a cobra no lado oposto do campo no caso que ela sair do límite
  if (snake[0].x > 15 * box && direction == "right") snake[0].x = 0;
  if (snake[0].y > 15 * box && direction == "down") snake[0].y = 0;
  if (snake[0].x < 0 && direction == "left") snake[0].x = 15 * box;
  if (snake[0].y < 0 && direction == "up") snake[0].y = 15 * box;
}
//console.log(snakeX, snakeY);

//Intervalo de execução da função startGame
let jogo = setInterval(startGame, 100);
