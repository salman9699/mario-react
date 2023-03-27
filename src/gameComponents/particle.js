export default class Particle {
  constructor(canvas, Xposition, Yposition, Xvelocity, Yvelocity, radius, color) {
    this.position = {
      x: Xposition,
      y: Yposition,
    };
    this.velocity = {
      x: Xvelocity,
      y: Yvelocity,
    };
    this.canvas = canvas;
    this.c = canvas.getContext("2d");
    this.radius = radius;
    this.color = color;
  }

  draw() {
    this.c.beginPath();
    this.c.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2, false);
    this.c.fillStyle = this.color;
    this.c.fill();
    this.c.closePath();
  }
  update() {
    this.draw();
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;
  }
}
