const CELL_SIZE = 20;
// Soal no 1: Set canvas size menjadi 600
const CANVAS_SIZE = 600;
const REDRAW_INTERVAL = 50;
const WIDTH = CANVAS_SIZE / CELL_SIZE;
const HEIGHT = CANVAS_SIZE / CELL_SIZE;
const DIRECTION = {
    LEFT: 0,
    RIGHT: 1,
    UP: 2,
    DOWN: 3,
}
// Soal no 2: Pengaturan Speed (semakin kecil semakin cepat) ubah dari 150 ke 120
let MOVE_INTERVAL = 160;

function initPosition() {
    return {
        x: Math.floor(Math.random() * WIDTH),
        y: Math.floor(Math.random() * HEIGHT),
    }
}

function initHeadAndBody() {
    let head = initPosition();
    let body = [{x: head.x, y: head.y}];
    return {
        head: head,
        body: body,
    }
}

function initDirection() {
    return Math.floor(Math.random() * 4);
}

function initSnake(color) {
    return {
        ...initHeadAndBody(),
        direction: initDirection(),
      
    }
}
function initFungsi(){
    return {
        life: 3,
        level:1,
        score: 0,
        counter: 0,
    }
}
let snake1 = initSnake("green");
let fungsi = initFungsi();

// Soal no 4: make apples array
let apples = [{
    position: initPosition(),
},
{
    position: initPosition(),
},
{
    position: initPosition(),
},
{
    position: initPosition(),
}]

let health = {
    position: initPosition(),
    visible: true,
    visibleCount:0,
}

function drawCell(ctx, x, y, color) {
    ctx.fillStyle = color;
    ctx.fillRect(x * CELL_SIZE, y * CELL_SIZE, CELL_SIZE, CELL_SIZE);
}

function drawsnakeHead(ctx, x, y) {
    let snakeHead = document.getElementById('snake');
    ctx.drawImage(snakeHead,  x * CELL_SIZE, y * CELL_SIZE, CELL_SIZE, CELL_SIZE)
}
function drawsnakeBody(ctx, x, y) {
    let snakeBody = document.getElementById('ekor');
    ctx.drawImage(snakeBody,  x * CELL_SIZE, y * CELL_SIZE, CELL_SIZE, CELL_SIZE)
}

function drawLevel(){
    let levelCanvas;
    levelCanvas = document.getElementById("level");
    let levelCtx = levelCanvas.getContext("2d");

    levelCtx.clearRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
    levelCtx.font = "30px Arial";
    levelCtx.fillStyle = "black"
    levelCtx.fillText(fungsi.level, 10, levelCanvas.scrollHeight / 2);
}
function drawScore(snake) {
    let scoreCanvas;
    if (snake1.color == snake.color) {
        scoreCanvas = document.getElementById("score1Board");
    }
    let scoreCtx = scoreCanvas.getContext("2d");

    scoreCtx.clearRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
    scoreCtx.font = "30px Arial";
    scoreCtx.fillStyle = "black"
    scoreCtx.fillText(fungsi.score, 10, scoreCanvas.scrollHeight / 2);
}

function drawInterval(){
    let intervalCanvas;
    intervalCanvas = document.getElementById("speed");
    let intervalCtx = intervalCanvas.getContext("2d");
    intervalCtx.clearRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
    intervalCtx.font = "30px Arial";
    intervalCtx.fillStyle = "black"
    intervalCtx.fillText(MOVE_INTERVAL, 10, intervalCanvas.scrollHeight / 2);
}
// Soal no 6: Pada fungsi drawScore, tambahkan score3Board:

function drawHealth(ctx) {
    while(health.position.y == 0 || hitCollision(health.position.x, health.position.y)) {
        health.position = initPosition();
    }
    if (health.visible) {
        var img = document.getElementById("darah");
        ctx.drawImage(img, health.position.x * CELL_SIZE, health.position.y * CELL_SIZE, CELL_SIZE, CELL_SIZE);
        health.visibleCount++;
        if (health.visibleCount == 10) {
            health.visible = false;
        }
    } else {
        drawCell(ctx, health.position.x, health.position.y, "rgb(255,255,255,0)")
        health.visibleCount--;
        if (health.visibleCount == 0) {
            health.visible = true;
        }
    }
}
function Prima() {
    let Prima = true;
    if (fungsi.score > 1) {
        for (let i = 2; i < fungsi.score; i++) {
            if (fungsi.score % i == 0) {
                Prima = false;
                break;
            }
        }
        return Prima;
    }
}
function drawBlocks(ctx, x1, y1, x2, y2) {
    ctx.strokeStyle = "brown";
    ctx.lineWidth = 10;
    ctx.beginPath();
    ctx.moveTo(x1 * CELL_SIZE, y1 * CELL_SIZE);
    ctx.lineTo(x2 * CELL_SIZE, y2 * CELL_SIZE);
    ctx.stroke();
}

let blocks = []

function upLevel() {
    
    var audio = new Audio('assets/level.mp3');
    if (fungsi.score == 5 && fungsi.counter == 0) {
        alert("Naik level 2");
        audio.play();
        fungsi.level = 2;  
        MOVE_INTERVAL = 130;   
        blocks[0] = {x1: 5,y1: 10,x2: 25,y2: 10};
        fungsi.counter++;
    } else if (fungsi.score == 10 && fungsi.counter == 1) {
        alert("Naik level 3");
        audio.play();
        fungsi.level = 3;
        MOVE_INTERVAL = 100;
        blocks[0] = {x1: 5,y1: 15,x2: 25,y2: 15};  
        blocks[1] = {x1: 15,y1: 5,x2: 15,y2: 25}; 
        fungsi.counter++;
    } else if (fungsi.score == 15 && fungsi.counter == 2) {
        alert("Naik level 4");
        audio.play();
        fungsi.level = 4;
        MOVE_INTERVAL = 70;
        blocks[0] = {x1: 5,y1: 5,x2: 25,y2: 5};  
        blocks[1] = {x1: 5,y1: 15,x2: 25,y2: 15}; 
        blocks[2] = {x1: 5,y1: 25,x2: 25,y2: 25};
        fungsi.counter++;
    } else if (fungsi.score == 20 && fungsi.counter == 3) {
        alert("Naik level 5");
        audio.play();
        fungsi.level = 5;
        MOVE_INTERVAL = 50;
        blocks[0] = {x1: 10,y1: 5,x2: 20,y2: 5};  
        blocks[1] = {x1: 5,y1: 10,x2: 5,y2: 20}; 
        blocks[2] = {x1: 10,y1: 25,x2: 20,y2: 25};
        blocks[3] = {x1: 25,y1: 10,x2: 25,y2: 20};
        fungsi.counter++;
    }
}

function draw() {
    setInterval(function() {
        let snakeCanvas = document.getElementById("snakeBoard");
        let ctx = snakeCanvas.getContext("2d");

        ctx.clearRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
        drawsnakeHead(ctx, snake1.head.x, snake1.head.y);
        for (let i = 1; i < snake1.body.length; i++) {
            drawsnakeBody(ctx, snake1.body[i].x, snake1.body[i].y);
        }

        // var img = document.getElementById("snake");
        // ctx.drawImage(img, snake1.head.x * CELL_SIZE, snake1.head.y * CELL_SIZE, CELL_SIZE,CELL_SIZE);  
        // for (let i = 1; i < snake1.body.length; i++) {
        //     var img = document.getElementById("ekor")
        //     ctx.drawImage(img, snake1.body[i].x * CELL_SIZE, snake1.body[i].y * CELL_SIZE, CELL_SIZE,CELL_SIZE);
        // }

        for (let i = 0; i < apples.length; i++) {
            let apple = apples[i];
            while (apple.position.y == 0 || hitCollision(apple.position.x, apple.position.y)) {
                apple.position = initPosition();
            }
            var img = document.getElementById("apple");
            ctx.drawImage(img, apple.position.x * CELL_SIZE, apple.position.y * CELL_SIZE, CELL_SIZE, CELL_SIZE);
        }

        for (let i = 0; i < fungsi.life; i++) { 
            var img = document.getElementById("nyawa");
            ctx.drawImage(img, i * CELL_SIZE, 0, CELL_SIZE, CELL_SIZE);
        }

        if (Prima()){
            drawHealth(ctx);
        }
        if(fungsi.level > 1){
            for (i = 0; i < fungsi.level - 1; i++) {
                drawBlocks(ctx, blocks[i].x1, blocks[i].y1, blocks[i].x2, blocks[i].y2);
            }
        }

        
        // drawCell(ctx, blocks.position.x * CELL_SIZE, blocks.position.y * CELL_SIZE, CELL_SIZE, CELL_SIZE)

        drawScore(snake1);
        drawLevel(snake1);
        drawInterval(snake1);
        // Soal no 6: Draw Player 3 Score:
    }, REDRAW_INTERVAL);
}

function teleport(snake) {
    if (snake.head.x < 0) {
        snake.head.x = CANVAS_SIZE / CELL_SIZE - 1;
    }
    if (snake.head.x >= WIDTH) {
        snake.head.x = 0;
    }
    if (snake.head.y < 0) {
        snake.head.y = CANVAS_SIZE / CELL_SIZE - 1;
    }
    if (snake.head.y >= HEIGHT) {
        snake.head.y = 0;
    }
}

// Soal no 4: Jadikan apples array

function eat(snake, apples) {
    for (let i = 0; i < apples.length; i++) {
        let apple = apples[i];
        if (snake.head.x == apple.position.x && snake.head.y == apple.position.y) {
            apple.position = initPosition();
            fungsi.score++;
            snake.body.push({x: snake.head.x, y: snake.head.y});
        }
    }
    upLevel();
    eatHealth();
}
function eatHealth() {
    if (snake1.head.x == health.position.x && snake1.head.y == health.position.y) {
        health.position = initPosition();
        fungsi.life++;
        snake1.body.push({x: snake1.head.x, y: snake1.head.y});
        upLevel();
    }
}

function hitCollision(x, y) {
    let isCollide = false;

    if (fungsi.level > 1) {
        for (let i = 0; i < fungsi.level - 1; i++) {
            if (x == blocks[i].x1 && y >= blocks[i].y1 && y < blocks[i].y2 || y == blocks[i].y1 && x >= blocks[i].x1 && x < blocks[i].x2 ) {
                isCollide = true;
            }
        }
    }
    return isCollide;
}

function checkCollision(snake){
    let isCollide = false;
    
    for (let i = 0; i < snake.length; i++) {
        for (let j = 0; j < snake.length; j++) {
            for (let k = 1; k < snake[j].body.length; k++) {
                if (snake[i].head.x == snake[j].body[k].x && snake[i].head.y == snake[j].body[k].y) {
                isCollide = true;
                }
            }
        }
    }
    if (hitCollision(snake1.head.x, snake1.head.y)) {
        isCollide = true;
    }
    if (isCollide) {
        snake1 = initSnake("green");
        fungsi.life--;
        if (fungsi.life == 0) {
            var audio = new Audio('assets/game-over.mp3');
            audio.play();
            alert("Game Over");
            
            snake1 = initSnake();
            fungsi = initFungsi();
            MOVE_INTERVAL = 160;
        }
    }
    return isCollide;
}


function moveLeft(snake) {
    snake.head.x--;
    teleport(snake);
    eat(snake, apples);

}

function moveRight(snake) {
    snake.head.x++;
    teleport(snake);
    eat(snake, apples);

}

function moveDown(snake) {
    snake.head.y++;
    teleport(snake);
    eat(snake, apples);

}

function moveUp(snake) {
    snake.head.y--;
    teleport(snake);
    eat(snake, apples);

}

function move(snake) {
    switch (snake.direction) {
        case DIRECTION.LEFT:
            moveLeft(snake);
            break;
        case DIRECTION.RIGHT:
            moveRight(snake);
            break;
        case DIRECTION.DOWN:
            moveDown(snake);
            break;
        case DIRECTION.UP:
            moveUp(snake);
            break;
    }
    moveBody(snake);
    // Soal no 6: Check collision dengan snake3
    if (!checkCollision([snake])) {
        setTimeout(function() {
            move(snake1);
        }, MOVE_INTERVAL);
    } else {
        initGame();
    }
}

function moveBody(snake) {
    snake.body.unshift({ x: snake.head.x, y: snake.head.y });
    snake.body.pop();
}

function turn(snake, direction) {
    const oppositeDirections = {
        [DIRECTION.LEFT]: DIRECTION.RIGHT,
        [DIRECTION.RIGHT]: DIRECTION.LEFT,
        [DIRECTION.DOWN]: DIRECTION.UP,
        [DIRECTION.UP]: DIRECTION.DOWN,
    }

    if (direction !== oppositeDirections[snake.direction]) {
        snake.direction = direction;
    }
}

document.addEventListener("keydown", function (event) {
    if (event.key === "ArrowLeft") {
        turn(snake1, DIRECTION.LEFT);
    } else if (event.key === "ArrowRight") {
        turn(snake1, DIRECTION.RIGHT);
    } else if (event.key === "ArrowUp") {
        turn(snake1, DIRECTION.UP);
    } else if (event.key === "ArrowDown") {
        turn(snake1, DIRECTION.DOWN);
    }
})

function initGame() {
    move(snake1);
}

move(snake1);