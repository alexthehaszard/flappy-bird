let bird = [];
let pipe,
  pipe2,
  gameStarted,
  index,
  indexUsed,
  index2,
  index2Used,
  score,
  stopped;
let currentPipe = 1;
let generation = 1;
let currentScore = 0;

for (let i = 0; i < 100; i++) {
  bird[i] = new Bird();
}

function setup() {
  createCanvas(400, 600);
  pipe = [new Pipe()];
  pipe2 = [new Pipe()];
  gameStarted = false;
  index = 0;
  indexUsed = -1;
  index2 = 0;
  index2Used = -1;
  score = 0;
  stopped = false;
  pipe[0].createPipe();
  pipe2[0].createPipe();
  pipe2[0].x = 625;
}

function draw() {
  if (stopped) {
    return;
  }
  background(0);
  fill(255);
  for (let i = 0; i < bird.length; i++) {
    if (bird[i].canMove) bird[i].show();
    if (gameStarted) bird[i].update();
  }
  if (gameStarted == true) {
    fill(255);
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

  let isDead = true;
  for (let i = 0; i < bird.length; i++) {
    if (bird[i].canMove === true) {
      isDead = false;
    }
  }
  if (isDead === true) {
    stopped = true;
    genUp();
    return;
  }

  for (let i = 0; i < bird.length; i++) {
    if (bird[i].x > pipe[index].x && indexUsed != index) {
      indexUsed = index;
      bird[i].score++;
      currentScore++;
      setTimeout(() => {
        currentPipe++;
        console.log(currentPipe);
      }, 800);
    }

    if (bird[i].x > pipe2[index2].x && index2Used != index2) {
      index2Used = index2;
      bird[i].score++;
      currentScore++;
      setTimeout(() => {
        currentPipe++;
        console.log(currentPipe);
      }, 800);
    }

    if (bird[i].y >= height) {
      bird[i].canMove = false;
    }

    fill(255);
    stroke(0);
    textAlign(CENTER);
    textSize(100);
    text(currentScore, width / 2, 100);
    textSize(30);
    text(`Generation: ${generation}`, width / 2, 150);

    if (
      bird[i].y + 25 < pipe[index].y - pipe[index].gap / 2 &&
      bird[i].x + 20 > pipe[index].x &&
      bird[i].x - 20 < pipe[index].x + 50
    ) {
      bird[i].canMove = false;
    } else if (
      bird[i].y - 30 > pipe[index].y + pipe[index].gap / 2 &&
      bird[i].x + 20 > pipe[index].x &&
      bird[i].x - 20 < pipe[index].x + 50
    ) {
      bird[i].canMove = false;
    }

    if (
      bird[i].y + 25 < pipe2[index2].y - pipe2[index2].gap / 2 &&
      bird[i].x + 20 > pipe2[index2].x &&
      bird[i].x - 20 < pipe2[index2].x + 50
    ) {
      bird[i].canMove = false;
    } else if (
      bird[i].y - 30 > pipe2[index2].y + pipe2[index2].gap / 2 &&
      bird[i].x + 20 > pipe2[index2].x &&
      bird[i].x - 20 < pipe2[index2].x + 50
    ) {
      bird[i].canMove = false;
    }
  }
  if (stopped || !gameStarted) {
    textSize(35);
    text("Press key to start", width / 2, 300);
  }
}

function keyPressed() {
  if (stopped) {
    setup();
    stopped = false;
  }
  gameStarted = true;
}

function genUp() {
  bird.sort(compare);
  bird.reverse();
  console.log(bird);
  setTimeout(() => {
    for (let i = 0; i < bird.length / 2; i++) {
      bird[i].setup();
      bird.splice(i + bird.length / 2 - 1, 1);
      bird.push(new Bird(bird[i].nn.copy()));
      bird[bird.length - 1].m();
    }
    keyPressed();
    currentPipe = 1;
    generation++;
    currentScore = 0;
  }, 1000);
}

function compare(a, b) {
  return a.score - b.score;
}
