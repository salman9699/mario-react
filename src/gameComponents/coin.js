export default class Coin {
  constructor(canvas, Xposition, Yposition, width, height, imgSrc, isBomb, color) {
    this.position = {
      x: Xposition,
      y: Yposition,
    };
    this.width = width;
    this.height = height;
    this.canvas = canvas;
    this.c = canvas.getContext("2d");
    this.image = new Image();
    this.image.src = imgSrc;
    this.isBomb = isBomb;
    this.color = color;
    this.collected = false;
  }

  draw() {
    // this.c.fillStyle = 'gold';
    // this.c.fillRect(this.position.x, this.position.y, this.width, this.height);
    this.c.drawImage(this.image, this.position.x, this.position.y);
    
  }
}
