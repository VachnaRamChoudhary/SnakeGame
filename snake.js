let inputDir = {
    x: 0,
    y: 0
};
const foodSound = new Audio('foodSound.ogg');
const gameOverSound = new Audio('gameOverSound.wav');
const moveSound = new Audio('moveSound.mp3');
const musicSound = new Audio('Time Of Your Life 3.mp3');
const music = new Audio('tik-tok-funny.mp3');
let Score = document.getElementById('Score');
let score = 0;
const gridSize = 25;

var btnUp = document.getElementsByClassName('btnUp');
var btnLeft = document.getElementsByClassName('btnLeft');
var btnStart = document.getElementsByClassName('btnStart');
var btnRight = document.getElementsByClassName('btnRight');
var btnDown = document.getElementsByClassName('btnDown');

let speed = 4;
let lastPaintTime = 0;
let flag = true;



let maxScore = 0;
let mxScore = document.getElementById("maxscore");
let msp = document.getElementById('musicbtn');

msp.addEventListener('click', function() {
    if (msp.innerHTML == "Play Music") {
        musicSound.play();
        msp.innerHTML = "Pause Music"
    } else {
        musicSound.pause();
        msp.innerHTML = "Play Music"
    }
});

let a = 2;
let b = gridSize - 2;



food = {
    x: Math.round(a + (b - a) * Math.random()),
    y: Math.round(a + (b - a) * Math.random())
};
snakeArr = [{
    x: Math.round(a + (b - a) * Math.random()),
    y: Math.round(a + (b - a) * Math.random())
}];


function main(ctime) {
    window.requestAnimationFrame(main);
    if ((ctime - lastPaintTime) / 1000 < 1 / speed) {
        return;
    }
    // console.log(ctime);
    lastPaintTime = ctime;
    if (flag)
        gameEngine();

}
window.requestAnimationFrame(main);

function isCollide(sarr) {
    //collide self
    for (let i = 1; i < snakeArr.length; i++) {
        if (snakeArr[i].x === snakeArr[0].x && snakeArr[i].y === snakeArr[0].y)
            return true;
    }
    if (snakeArr[0].x >= gridSize || snakeArr[0].x <= 0 || snakeArr[0].y >= gridSize || snakeArr[0].y <= 0)
        return true;
    return false;
}

function gameEngine() {
    if (isCollide(snakeArr)) {
        musicSound.pause();
        msp.innerHTML = "Play Music"
        gameOverSound.play();
        inputDir = {
            x: 0,
            y: 0
        };
        alert("Game Over. Your Score=" + score);
        snakeArr = [{
            x: 13,
            y: 15
        }];
        score = 0;
        speed = 4;
        Score.innerHTML = "Score:" + score;

    }
    //if you have eaten the foodSound
    if (snakeArr[0].y === food.y && snakeArr[0].x === food.x) {
        foodSound.play();
        snakeArr.unshift({
            x: snakeArr[0].x + inputDir.x,
            y: snakeArr[0].y + inputDir.y
        });
        food = {
            x: Math.round(a + (b - a) * Math.random()),
            y: Math.round(a + (b - a) * Math.random())
        };
        score++;
        speed += .1;
        Score.innerHTML = "Score:" + score;
        if (maxScore < score) {
            maxScore = score;
            mxScore.innerHTML = "Max Score:" + maxScore;
        }

        //console.log(score);
    }
    //moving the game
    for (var i = snakeArr.length - 2; i >= 0; i--) {
        snakeArr[i + 1] = {
            ...snakeArr[i]
        };
    }
    snakeArr[0].x += inputDir.x;
    snakeArr[0].y += inputDir.y;
    //display the snake
    board.innerHTML = "";
    snakeArr.forEach((e, index) => {
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;
        if (index === 0)
            snakeElement.classList.add('head');
        else
            snakeElement.classList.add('snake');
        board.appendChild(snakeElement);
    });

    //display the food

    foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food');
    board.appendChild(foodElement);
}
window.addEventListener('keydown', e => {
    inputDir = {
        x: 0,
        y: 1
    };
    btnStart[0].innerHTML = "Pause";

    // musicSound.play();
    flag = true;
    //music.play();
    switch (e.key) {
        case "ArrowUp":

            inputDir.x = 0;
            inputDir.y = -1;
            moveSound.play();

            break;
        case "ArrowDown":

            inputDir.x = 0;
            inputDir.y = 1;
            moveSound.play();

            break;
        case "ArrowLeft":

            inputDir.x = -1;
            inputDir.y = 0;
            moveSound.play();

            break;
        case "ArrowRight":

            inputDir.x = 1;
            inputDir.y = 0;

            moveSound.play();
            break;
        default:

    }
});


btnStart[0].addEventListener('click', function() {

    btnStart[0].innerHTML = (btnStart[0].innerHTML == "Start") ? "Pause" : "Start";
    flag = flag ? false : true;
});

btnUp[0].addEventListener('click', function() {
    inputDir.x = 0;
    inputDir.y = -1;
    moveSound.play();
});

btnLeft[0].addEventListener('click', function() {
    inputDir.x = -1;
    inputDir.y = 0;
    moveSound.play();
});

btnRight[0].addEventListener('click', function() {
    inputDir.x = 1;
    inputDir.y = 0;
    moveSound.play();
});
btnDown[0].addEventListener('click', function() {
    inputDir.x = 0;
    inputDir.y = 1;
    moveSound.play();
});
