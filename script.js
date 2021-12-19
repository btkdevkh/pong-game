import Ball from "./Ball.js";
import Paddle from "./Paddle.js";

const ball = new Ball(document.getElementById('ball'));
const playerPaddle = new Paddle(document.getElementById('player-paddle'));
const aiPaddle = new Paddle(document.getElementById('ai-paddle'));
const playerScoreElement = document.getElementById('player-score');
const aiScoreElement = document.getElementById('ai-score');

let lastTime;
function update(time) {
  if(lastTime != null) {
    const delta = time - lastTime;
    // Update code
    ball.update(delta, [playerPaddle.rect(), aiPaddle.rect()]);
    aiPaddle.update(delta, ball.y);
    const hue = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--hue'));

    document.documentElement.style.setProperty('--hue', hue + delta * 0.01);

    if(isLose()) handleLose();
  }

  lastTime = time;
  window.requestAnimationFrame(update);
}

function isLose() {
  const rect = ball.rect();
  return rect.right >= window.innerHeight || rect.left <= 0;
}

function handleLose() {
  const rect = ball.rect();
  if(rect.right >= window.innerWidth) {
    playerScoreElement.textContent = parseInt(playerScoreElement.textContent) + 1;
  } else {
    aiScoreElement.textContent = parseInt(aiScoreElement.textContent) + 1;
  }

  ball.reset();
  aiPaddle.reset();
}

document.addEventListener('mousemove', e => {
  playerPaddle.position = (e.y / window.innerHeight) * 100;
})

window.requestAnimationFrame(update);
