const INITIAL_VELOCITY = 0.055;
let player1 = 0;
let player2 = 0;
let winner = {};
//const VELCOITY_INC = 0.000001
export default class Ball {
  constructor(ballElement) {
    this.ballElement = ballElement;
    this.reset();
  }

  get x() {
    return parseFloat(
      getComputedStyle(this.ballElement).getPropertyValue("--x")
    );
    //get the variable --x value from css for the ball element and convert into float and return
  }
  set x(value) {
    this.ballElement.style.setProperty("--x", value);
    //set the current position of the ball on x axis
  }
  get y() {
    return parseFloat(
      getComputedStyle(this.ballElement).getPropertyValue("--y")
    );
    //get the variable --x value from css for the ball element and convert into float and return
  }
  set y(value) {
    this.ballElement.style.setProperty("--y", value);
    //set the current position of the ball on x axis
  }
  reset() {
    const rect = this.rect();
    if (rect.top <= 0) {
      this.y = 5;
      this.direction = { x: 0, y: 10 };
    } else if (rect.bottom >= innerHeight) {
      this.y = 95;
      this.direction = { x: 0, y: 90 };
    } else {
      this.y = 50;
      this.direction = { x: 0, y: 0 };
    }
    this.x = 50;

    while (
      Math.abs(this.direction.x) <= 0.2 ||
      Math.abs(this.direction.x) >= 0.9
    ) {
      const heading = random(0, 2 * Math.PI);
      this.direction = { x: Math.cos(heading), y: Math.sin(heading) };
    }

    this.velocity = INITIAL_VELOCITY;
    player1 = 0;
    player2 = 0;
  }
  rect() {
    return this.ballElement.getBoundingClientRect();
  }
  update(time_diff, paddleCor) {
    this.x += this.direction.x * time_diff * this.velocity;
    this.y += this.direction.y * this.velocity * time_diff;
    const rect = this.rect();
    if (rect.right >= window.innerWidth || rect.left <= 0) {
      this.direction.x *= -1;
    }
    //  if(paddleCor.some(r=>isCollision(r,rect)))
    //  {
    //     this.direction.y*=-1;
    //  }
    //   }

    // for (let i = 0; i < paddleCor.length; i++) {
    //     if (isCollision(paddleCor[i], rect)) {
    //       // Determine which side of the paddle the ball hit
    //       const paddleCenter = (paddleCor[i].left + paddleCor[i].right) / 2;
    //       const ballCenter = (rect.left + rect.right) / 2;
    //       const offset = ballCenter - paddleCenter;
    //       console.log();
    //       // Update ball direction based on which side of the paddle was hit

    //       this.direction.y *= -1;
    //       break; // Only handle collision with one paddle
    //     }
    //   }
    // }\

    for (let i = 1; i < paddleCor.length; i++) {
      if (isCollision(paddleCor[i], rect)) {
        player2 += 1;
        console.log("player_2 : " + player2);
        this.direction.y *= -1;
      }
      if (isCollision(paddleCor[i - 1], rect)) {
        player1 += 1;
        console.log("player_1 : " + player1);
        this.direction.y *= -1;
      }
    }
  }

  maxScore() {
    winner["player"] = player1 >= player2 ? player1 : player2;
  }
}
function isCollision(rect1, rect2) {
  return (
    rect1.left <= rect2.right &&
    rect1.right >= rect2.left &&
    rect1.top <= rect2.bottom &&
    rect1.bottom >= rect2.top
  );
}
function random(min, max) {
  return Math.random() * (max - min) + min;
}
