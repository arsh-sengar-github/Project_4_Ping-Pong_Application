import Ball from './ball_script.js'
import Paddle from './paddle_script.js'

const ball = new Ball(document.getElementById('ball'));
const playerPaddle = new Paddle(document.getElementById('player-paddle'));
const computerPaddle = new Paddle(document.getElementById('computer-paddle'));
const playerScoreElement = document.getElementById('player-score');
const computerScoreElement = document.getElementById('computer-score');

let lastTime;

function update(time)
{
    if(lastTime!=null)
    {
        const delta = time - lastTime;
        ball.update(delta, [playerPaddle.rectangle(), computerPaddle.rectangle()]);
        computerPaddle.update(delta, ball.y);
        const hue = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--hue'));
        document.documentElement.style.setProperty('--hue', (hue+(delta*0.01)));
        if(isLose())
        {
            handleLose();
        }
    }
    lastTime = time;
    window.requestAnimationFrame(update);
}

function isLose()
{
    const rectangle = ball.rectangle();
    return (rectangle.right>=window.innerWidth || rectangle.left<=0);
}

function handleLose()
{
    const rectangle = ball.rectangle();
    if(rectangle.right>=window.innerWidth)
    {
        playerScoreElement.textContent = parseInt(playerScoreElement.textContent) + 1;
    }
    else
    {
        computerScoreElement.textContent = parseInt(computerScoreElement.textContent) + 1;
    }
    ball.reset();
    computerPaddle.reset();
}

document.addEventListener('mousemove', e => {
    playerPaddle.position = (e.y/window.innerHeight) * 100;
})

window.requestAnimationFrame(update);