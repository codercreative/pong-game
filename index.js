//Update Loop
import Ball from "./Ball.js";
import Paddle from "./Paddle.js";

const ball = new Ball(document.getElementById("ball"));
const playerPaddle = new Paddle(document.getElementById("player-paddle"));
const botPaddle = new Paddle(document.getElementById("bot-paddle"));
const botScoreElement = document.getElementById("bot-score");
const playerScoreElement = document.getElementById("player-score");
const resetBtn = document.getElementById("reset-btn");

let lastTime;

function update(time) {
  if (lastTime != null) {
    const delta = time - lastTime;
    //Game begins
    ball.update(delta, [playerPaddle.rect(), botPaddle.rect()]);
    botPaddle.update(delta, ball.y);

    const hue = parseFloat(
      getComputedStyle(document.documentElement).getPropertyValue("--hue")
    );

    document.documentElement.style.setProperty("--hue", hue + delta * 0.01);

    if (isLose()) handleLose();
  }
  lastTime = time;
  window.requestAnimationFrame(update);
}

function isLose() {
  const rect = ball.rect();
  return rect.right >= window.innerWidth || rect.left <= 0;
}

function handleLose() {
  const rect = ball.rect();
  if (rect.right >= window.innerWidth) {
    botScoreElement.textContent = parseInt(botScoreElement.textContent) + 1;
  } else {
    playerScoreElement.textContent =
      parseInt(playerScoreElement.textContent) + 1;
  }
  ball.reset();
  botPaddle.reset();
}

// for paddles
document.addEventListener("mousemove", (e) => {
  // position is using % in css (50vh) - here we have pixel value and we convert it to a percentage by / window.innerHeight * 100
  playerPaddle.position = (e.y / window.innerHeight) * 100;
});

resetBtn.addEventListener("click", () => {
  ball.reset();
  playerPaddle.reset();
  botPaddle.reset();

  playerScoreElement.textContent = 0;
  botScoreElement.textContent = 0;
});

window.requestAnimationFrame(update);
