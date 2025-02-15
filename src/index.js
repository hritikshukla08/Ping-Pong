//update loop

import Ball from "./Ball.js";
import Paddle from "./Paddle.js";

const p1 = document.querySelector("#player-paddle1");
const ball = new Ball(document.getElementById("ball")); //create the new ball element with ball id div
const paddle = new Paddle(document.getElementById("player-paddle1"));
const paddle1 = new Paddle(document.getElementById("player-paddle2"));
let win = null;
let prev_time = null;
let play = false;
function update(time) {
  if (prev_time != null) {
    const time_diff = time - prev_time;
    if (play == true) {
      ball.update(time_diff, [paddle.rect(), paddle1.rect()]);
    }
    if (game_over()) {
      playerLose();

      play = false;
      document.addEventListener("keydown", function (event) {
        if (event.code === "Enter" || event.key === "Enter") {
          play = true;
          window.requestAnimationFrame(update);
        }
      });
    }
  }
  prev_time = time;
  window.requestAnimationFrame(update);
}

function game_over() {
  const rect = ball.rect();
  return rect.bottom >= window.innerHeight || rect.top <= 0;
}

function playerLose() {
  ball.reset();
  paddle.reset();
  paddle1.reset();
}
document.addEventListener("keydown", (event) => {
  let paddlePos = p1.offsetLeft;
  const paddleHeight = 100;
  if (event.key == "a" && paddlePos > 20) {
    paddle.moveUp(-10);
    paddle1.moveUp(-10);
  }
  if (event.key == "d" && paddlePos < window.innerWidth - 61) {
    paddle.moveDown(10);
    paddle1.moveDown(10);
  }
});
document.addEventListener("keydown", function (event) {
  if (event.code === "Enter" || event.key === "Enter") {
    play = true;

    window.requestAnimationFrame(update);
  }
});
