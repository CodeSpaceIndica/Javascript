//Constants
const BORDER = 50;

var width, height;

var ctx;

var playArea = [];

var ballLocation = new Point();
var ballSpeed = new Point();

/**
 * Initialize the Canvas
 */
 window.addEventListener("load", (event) => {
    //Init the canvas
    let canvasElement = document.getElementById("aCanvas");
    resizeCanvas(canvasElement, false);

    ctx = canvasElement.getContext("2d");

    width = canvasElement.width;
    height = canvasElement.height;

    ballLocation.x = width/2;
    ballLocation.y = BORDER;

    ballSpeed.x = 0;
    ballSpeed.y = 0;

    let startRectangle = new Rectangle(BORDER, BORDER, width-(BORDER*2), height-(BORDER*2));
    playArea.push( startRectangle );

    addEvents();

    initGame();
});

function initGame() {
    drawGame();
}

function drawGame() {
    updateBall();

    ctx.fillStyle = "#000000";
    ctx.beginPath();
    ctx.rect(0, 0, width, height);
    ctx.fill();

    ctx.fillStyle = "#009999";
    // for(let i=0; i<playArea.length; i++) {
    //     playArea[i][j].render(ctx);
    // }
    playArea.forEach(rect => {
        rect.render(ctx);
    });

    ctx.fillStyle = "#FFFFFF";
    ctx.beginPath();
    //ctx.rect(ballLocation.x, ballLocation.y, 10, 10);
    ctx.arc(ballLocation.x, ballLocation.y, 6, 0, Constants.TWO_PI, false);
    ctx.fill();

    requestAnimationFrame(drawGame);
}

function updateBall() {
    ballLocation.addTo(ballSpeed);
}

function checkBallBounds() {

}