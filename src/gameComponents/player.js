export default class Player {
  constructor(canvas, runLeftImgSrc, runRightImgSrc, standLeftImgSrc, standRightImgSrc) {
    this.position = {
      x: 200,
      y: 200,
    };
    this.velocity = {
      x: 0,
      y: 0,
    };
    this.width = 66;
    this.height = 150;
    this.canvas = canvas;
    this.c = canvas.getContext("2d");
    this.gravity = 1;

    this.imageStandRight = new Image();
    this.imageStandLeft = new Image();
    this.imageRunRight = new Image();
    this.imageRunLeft = new Image();


    this.imageStandRight.src = standRightImgSrc;
    this.imageStandLeft.src = standLeftImgSrc;
    this.imageRunRight.src = runRightImgSrc;
    this.imageRunLeft.src = runLeftImgSrc;

    this.frames = 0;

    this.sprites = {
      stand: {
        right: this.imageStandRight,
        left: this.imageStandLeft,
        cropWidth: 177,
        width: 66,
      },
      run: {
        right: this.imageRunRight,
        left: this.imageRunLeft,
        cropWidth: 341,
        width: 127.875,
      },
    };

    this.currentSprite = this.sprites.stand.right;
    this.currentCropWidth = 177;
  }

  draw() {
    // this.c.fillStyle = "red";
    // this.c.fillRect(this.position.x, this.position.y, this.width, this.height);
    this.c.drawImage(this.currentSprite, this.currentCropWidth * this.frames, 0, this.currentCropWidth, 400, this.position.x, this.position.y, this.width, this.height);
  }

  update() {
    this.frames++;
    if (this.frames > 59 && (this.currentSprite === this.sprites.stand.right || this.currentSprite === this.sprites.stand.left)) {
      this.frames = 0;
    } else if (this.frames > 29 && (this.currentSprite === this.sprites.run.right || this.currentSprite === this.sprites.run.left)) {
      this.frames = 0;
    }

    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;

    if (this.position.y + this.height + this.velocity.y <= this.canvas.height) {
      this.velocity.y += this.gravity;
    } 
  }
}
