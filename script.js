/* NOTAS:

Falta fazer um refactoring do código. Por exemplo deixar somente uma função para permitir a inicialização do jogo cada vez. Não somente no começo, também se o jogador quer jogar um novo jogo 

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
let direction = "down";
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

//Função para iniciar um novo jogo
function startNewGame() {
  //Inicializando de novo as variáveis
  direction = "down";
  changeDirection = true;
  score = 0;
  document.getElementById("score").innerHTML = 0;
  //Criando posição da comida
  food.x = Math.floor(Math.random() * 16) * box;
  food.y = Math.floor(Math.random() * 16) * box;

  //Deixando só a posição da cabeça
  while (snake.length > 1) {
    snake.pop();
  }
  //Colocando a cabeça na posição inicial
  snake[0].x = 256;
  snake[0].y = 256;
  context.fillRect(snake[0].x, snake[0].y, box, box);

  //Inicializando o intervalo de execução novamente
  jogo = setInterval(startGame, 100);
}

//Função para iniciar o jogo
function startGame() {
  //Condições para fazer sair a cobra no lado oposto do campo no caso que ela sair do límite
  if (snake[0].x > 15 * box && direction == "right") snake[0].x = 0;
  if (snake[0].y > 15 * box && direction == "down") snake[0].y = 0;
  if (snake[0].x < 0 && direction == "left") snake[0].x = 15 * box;
  if (snake[0].y < 0 && direction == "up") snake[0].y = 15 * box;

  //Se o tamano da cobrinha é maior de 1
  if (snake.length > 1) {
    //Laço para verificar as posições do corpo da cobrinha
    for (i = 1; i < snake.length; i++) {
      //Comparamos se alguma das posições do corpo coincide com a posição da cabeça. Se coincide significa que colidiu.
      if (snake[0].x === snake[i].x && snake[0].y === snake[i].y) {
        //Guardamos a puntuação no caso fosse melhor que mais alta
        if (score >= highScore) {
          highScore = score;
          console.log("High Score: ", highScore);
        }
        //Mostramos a pontuação
        document.getElementById("high-score").innerHTML = highScore;
        //Paramos o jogo
        clearInterval(jogo);
        //Damos a mensagem de "Game Over"
        alert("Game Over ;__(");

        //Opção para o jogador iniciar um novo jogo. No caso ele aperte uma tecla qualquer:
        let x = prompt("Digite qualquer tecla para começar de novo o jogo:");

        if (typeof x == "string") {
          startNewGame();
        }
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

  //console.log(snakeX, snakeY, food.x, food.y);

  //Tira a última parte da cobra (posição da array snake) no caso que as coordenadas sejam diferentes
  if (snakeX != food.x || snakeY != food.y) {
    snake.pop();
  } else {
    food.x = Math.floor(Math.random() * 16) * box;

    for (i = 0; i < snake.length; i++) {
      if (food.x == snake[i].x) {
      }
    }

    food.y = Math.floor(Math.random() * 16) * box;
    score += 5;
    document.getElementById("score").innerHTML = score;
  }

  //Dependendo da direção modifica as variavéis das coordenadas da cobra
  if (direction == "right") snakeX += box;
  if (direction == "left") snakeX -= box;
  if (direction == "down") snakeY += box;
  if (direction == "up") snakeY -= box;

  //Arrumando um problema de um jeito pouco ótimo...
  if (snakeX < 0) snakeX = 480;
  if (snakeY < 0) snakeY = 480;
  if (snakeX > 480) snakeX = 0;
  if (snakeY > 480) snakeY = 0;

  //Objeto para recever as coordenadas atualizadas da cabeça da cobrinha
  let newHead = {
    x: snakeX,
    y: snakeY,
  };

  //Adiciona as coordenadas atuais da cabeça da cobra na array snake
  snake.unshift(newHead);

  //Reseteamos o valor bool para true
  changeDirection = true;
}

//Intervalo de execução da função startGame
let jogo = setInterval(startGame, 0200);
