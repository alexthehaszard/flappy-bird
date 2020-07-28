let bird;
let pipe;
let pipe2;
let gameStarted;
let index;
let indexUsed;
let index2;
let index2Used;
let score;
let canMove;
let stopped;

function setup() {
  createCanvas(400, 600);
  bird = new Bird();
  pipe = [new Pipe()];
  pipe2 = [new Pipe()];
  gameStarted = false;
  index = 0;
  indexUsed = -1;
  index2 = 0;
  index2Used = -1;
  score = 0;
  stopped = false;
  canMove = true;
  pipe[0].createPipe();
  pipe2[0].createPipe();
  pipe2[0].x = 625;
}

function draw() {
  if (stopped) return;
  background(220);
  fill(255);
  if (!canMove) fill(255, 0, 0);
  bird.show();
  if (gameStarted == true) {
    fill(255);
    bird.update();
    pipe[index].update();
    pipe2[index2].update();
  }
  pipe[index].show();
  pipe2[index2].show();

  if (pipe[index].x < -50) {
    index++;
    pipe[index] = new Pipe();
    pipe[index].createPipe();
  }

  if (pipe2[index2].x < -50) {
    index2++;
    pipe2[index2] = new Pipe();
    pipe2[index2].createPipe();
  }

  if (bird.x > pipe[index].x && indexUsed != index) {
    indexUsed = index;
    score++;
  }

  if (bird.x > pipe2[index2].x && index2Used != index2) {
    index2Used = index2;
    score++;
  }

  if (bird.y >= height) {
    stopped = true;
    canMove = false;
  }

  fill(0);
  textAlign(CENTER);
  textSize(100);
  text(score, width / 2, 100);

  if (
    bird.y + 25 < pipe[index].y - pipe[index].gap / 2 &&
    bird.x + 20 > pipe[index].x &&
    bird.x - 20 < pipe[index].x + 50
  ) {
    canMove = false;
  } else if (
    bird.y - 30 > pipe[index].y + pipe[index].gap / 2 &&
    bird.x + 20 > pipe[index].x &&
    bird.x - 20 < pipe[index].x + 50
  ) {
    canMove = false;
  }

  if (
    bird.y + 25 < pipe2[index2].y - pipe2[index2].gap / 2 &&
    bird.x + 20 > pipe2[index2].x &&
    bird.x - 20 < pipe2[index2].x + 50
  ) {
    canMove = false;
  } else if (
    bird.y - 30 > pipe2[index2].y + pipe2[index2].gap / 2 &&
    bird.x + 20 > pipe2[index2].x &&
    bird.x - 20 < pipe2[index2].x + 50
  ) {
    canMove = false;
  }
  if (stopped || !gameStarted) {
    textSize(35);
    text("Press key to start", width / 2, 300);
  }
}

function keyPressed() {
  if (!canMove && stopped) {
    setup();
    stopped = false;
  }
  if (canMove) {
    bird.jump();
  }
  gameStarted = true;
}
