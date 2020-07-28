class Bird {
  constructor() {
    this.x = 80;
    this.y = 350;
    
    this.velocity = 0;
    this.gravity = 0.6;
    this.lift = 10;
  }
  
  update() {
    this.y -= this.velocity;
    this.velocity -= this.gravity;
  }
  
  jump() {
    this.velocity = this.lift;
  }
  
  show() {
    rectMode(CENTER);
    rect(this.x, this.y, 35, 30);
  }
}