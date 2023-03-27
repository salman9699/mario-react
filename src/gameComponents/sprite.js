export default class Sprite {
  constructor(canvas, Xposition, Yposition, imgSrc) {
    this.position = {
      x: Xposition,
      y: Yposition,
    };
    this.canvas = canvas;
    this.c = canvas.getContext("2d");
    this.image = new Image();
    this.image.onload = () => {
      this.loaded = true;
    };
    this.image.src = imgSrc;
    this.loaded = false;
  }
  draw() {
    if (!this.loaded) return;
    this.c.drawImage(this.image, this.position.x, this.position.y);
  }
}
