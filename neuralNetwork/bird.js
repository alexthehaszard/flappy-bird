class Bird {
  constructor(n) {
    this.setup();

    if (n) this.nn = n;
    else this.nn = new NeuralNetwork(2, 4, 2);
  }

  setup() {
    this.x = 80;
    this.y = 350;

    this.velocity = 0;
    this.gravity = 0.6;
    this.lift = 10;
    this.score = 0;

    this.canMove = true;
  }

  willJump() {
    const p = currentPipe % 2 === 1 ? pipe[index] : pipe2[index2];
    const prediction = this.nn.predict([this.y, p.y + 40]);
    if (prediction[0] > prediction[1]) this.jump();
  }

  update() {
    if (!this.canMove) {
      return;
    }
    this.score++;
    this.willJump();
    this.y -= this.velocity;
    this.velocity -= this.gravity;
  }

  jump() {
    if (this.canMove) this.velocity = this.lift;
  }

  show() {
    rectMode(CENTER);
    fill(255, 255, 255, 50);
    rect(this.x, this.y, 35, 30);
  }

  m() {
    this.nn.mutate(1);
  }
}
