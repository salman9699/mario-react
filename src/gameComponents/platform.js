export default class Platform {
    constructor(canvas, Xposition, Yposition, width, height, imgSrc) {
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
    }
  
    draw() {
      this.c.drawImage(this.image, this.position.x, this.position.y);
      // this.c.fillStyle = 'brown';
      // this.c.fillRect(this.position.x, this.position.y, this.width, this.height);
    }
  }
  