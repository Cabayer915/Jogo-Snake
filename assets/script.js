let canvas = document.getElementById("snake");
let context = canvas.getContext("2d");
let box = 32;
let snake = [];
snake[0] = {
    x: 8 * box,
    y: 8 * box
};
let direction = "right";
let food = {
    x: Math.floor(Math.random() * 15 + 1) * box,
    y: Math.floor(Math.random() * 15 + 1) * box
};
let intervaloInicial = 120;
let intervalo = intervaloInicial;
let frutasComidas = 0;

// Carregar as imagens dos sprites
let headImage = new Image();
headImage.src = "assets/images/head.png"; // Substitua pelo caminho correto do seu sprite de cabeça

let bodyImage = new Image();
bodyImage.src = "assets/images/body.png"; // Substitua pelo caminho correto do seu sprite de corpo

let tailImage = new Image();
tailImage.src = "assets/images/tail.png"; // Substitua pelo caminho correto do seu sprite de cauda

function criarBackGround() {
    var img = new Image();
    img.src = "https://img.freepik.com/free-vector/green-abstract-shapes-pattern_1100-84.jpg?t=st=1710258096~exp=1710261696~hmac=0d2f6130271ab299f9c5cf970060e7137ad28f5b4266400aae24f796708792b6&w=740";

    var pattern = context.createPattern(img, 'repeat');
    context.fillStyle = pattern;
    context.fillRect(0, 0, 16 * box, 16 * box);
}

function criarSnake() {
    for (let i = 0; i < snake.length; i++) {
        if (i == 0) {
            // Cabeça da cobra
            context.drawImage(headImage, snake[i].x, snake[i].y, box, box);
        } else if (i == snake.length - 1) {
            // Cauda da cobra
            context.drawImage(tailImage, snake[i].x, snake[i].y, box, box);
        } else {
            // Corpo da cobra
            context.drawImage(bodyImage, snake[i].x, snake[i].y, box, box);
        }
    }
}

function makeFood() {
    const foodImage = new Image();
    foodImage.src = "https://cabayer915.github.io/Jogo-Snake/assets/images/apple.png";
    foodImage.onload = function () {
        context.drawImage(foodImage, food.x, food.y, box, box);
    };
}

document.addEventListener('keydown', update);

function update(event) {
    if (event.keyCode == 37 && direction != "right") direction = "left";
    if (event.keyCode == 38 && direction != "down") direction = "up";
    if (event.keyCode == 39 && direction != "left") direction = "right";
    if (event.keyCode == 40 && direction != "up") direction = "down";
    if ((event.key == "a") && direction != "right") direction = "left";
    if ((event.key == "w") && direction != "down") direction = "up";
    if ((event.key == "d") && direction != "left") direction = "right";
    if ((event.key == "s") && direction != "up") direction = "down";
}

function startGame() {
    if (snake[0].x > 15 * box && direction == "right") snake[0].x = 0;
    if (snake[0].x < 0 && direction == "left") snake[0].x = 16 * box;
    if (snake[0].y > 15 * box && direction == "down") snake[0].y = 0;
    if (snake[0].y < 0 && direction == "up") snake[0].y = 16 * box;

    for (let i = 1; i < snake.length; i++) {
        if (snake[0].x === snake[i].x && snake[0].y === snake[i].y) {
            clearInterval(game);
            Swal.fire({
                icon: "error",
                title: "GAME OVER",
                text: `Você comeu um total de ${frutasComidas} frutinhas!`
            });
            reiniciarJogo();
        }
    }

    criarBackGround();
    criarSnake();
    makeFood();

    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    if (direction == "right") snakeX += box;
    if (direction == "left") snakeX -= box;
    if (direction == "up") snakeY -= box;
    if (direction == "down") snakeY += box;

    if (snakeX != food.x || snakeY != food.y) {
        snake.pop();
    } else {
        food.x = Math.floor(Math.random() * 15 + 1) * box;
        food.y = Math.floor(Math.random() * 15 + 1) * box;

        frutasComidas++;
        document.getElementById("inserir").innerText = frutasComidas;
        console.log(frutasComidas);
        console.log(intervalo);

        if (frutasComidas % 10 === 0) {
            intervalo -= 10;
            if (intervalo < 50) {
                intervalo = 50;
            }
            clearInterval(game);
            game = setInterval(startGame, intervalo);
        }
    }

    let newHead = {
        x: snakeX,
        y: snakeY
    };

    snake.unshift(newHead);
}

function reiniciarJogo() {
    snake = [];
    snake[0] = {
        x: 8 * box,
        y: 8 * box
    };

    direction = "right";

    food.x = Math.floor(Math.random() * 15 + 1) * box;
    food.y = Math.floor(Math.random() * 15 + 1) * box;

    frutasComidas = 0;
    document.getElementById("inserir").innerText = frutasComidas;

    clearInterval(game);
    intervalo = intervaloInicial;
    game = setInterval(startGame, intervalo);
}

let game = setInterval(startGame, intervalo);