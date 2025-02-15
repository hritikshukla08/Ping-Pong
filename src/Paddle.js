export default class Paddle {
  constructor(paddle) {
    this.paddle = paddle;
  }
  moveUp(value) {
    const s =
      parseFloat(getComputedStyle(this.paddle).getPropertyValue("--posLeft")) +
      value;
    this.paddle.style.setProperty("--posLeft", s);
  }
  moveDown(value) {
    const q =
      parseFloat(getComputedStyle(this.paddle).getPropertyValue("--posLeft")) +
      value;
    this.paddle.style.setProperty("--posLeft", q);
  }
  rect() {
    return this.paddle.getBoundingClientRect();
  }

  reset() {
    this.paddle.style.setProperty("--posLeft", 110);
  }
}
