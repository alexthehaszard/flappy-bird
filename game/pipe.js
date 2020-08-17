class Pipe {
  constructor() {
    this.x = 400;
    this.y = 0;
    this.gap = 80;
    this.speed = 2;
  }
  
  createPipe() {
    this.y = Math.random() * 350 + 150;
  }
  
  show() {
    rectMode(CORNERS);
    rect(this.x, this.y - this.gap, this.x + 50, 0);
    rect(this.x, this.y + this.gap, this.x + 50, 700);
  }
  
  update() {
    this.x -= this.speed;
  }
}