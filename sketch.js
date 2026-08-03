let shapes = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  angleMode(DEGREES);

  for (let i = 0; i < 40; i++) {
    shapes.push(new PlayShape());
  }
}

function draw() {
  background("#FAF7F2");

  for (let s of shapes) {
    s.update();
    s.display();
  }
}

class PlayShape {
  constructor() {
    this.x = random(width);
    this.y = random(height);

    this.size = random(20, 70);

    this.type = floor(random(5));

    this.speedX = random(-0.4, 0.4);
    this.speedY = random(-0.4, 0.4);

    this.rot = random(360);
    this.rotSpeed = random(-0.5, 0.5);

    this.c = random([
      "#FF6B6B",
      "#FFD93D",
      "#6BCB77",
      "#4D96FF",
      "#B983FF",
      "#FF9F9F",
      "#00C2A8"
    ]);
  }

  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    this.rot += this.rotSpeed;

    if (this.x < -80) this.x = width + 80;
    if (this.x > width + 80) this.x = -80;
    if (this.y < -80) this.y = height + 80;
    if (this.y > height + 80) this.y = -80;
  }

  display() {
    push();
    translate(this.x, this.y);
    rotate(this.rot);

    noStroke();
    fill(this.c);

    switch (this.type) {
      case 0:
        drawBlob(this.size);
        break;

      case 1:
        drawFlower(this.size);
        break;

      case 2:
        drawStar(this.size);
        break;

      case 3:
        drawSquiggle(this.size);
        break;

      case 4:
        drawSmile(this.size);
        break;
    }

    pop();
  }
}

function drawBlob(s) {
  beginShape();
  for (let a = 0; a < 360; a += 20) {
    let r = s * 0.5 + noise(a * 0.05, frameCount * 0.01) * s * 0.3;
    vertex(cos(a) * r, sin(a) * r);
  }
  endShape(CLOSE);
}

function drawFlower(s) {
  for (let i = 0; i < 8; i++) {
    ellipse(0, s * 0.3, s * 0.35, s * 0.7);
    rotate(45);
  }

  fill("#FFF4A3");
  circle(0, 0, s * 0.4);
}

function drawStar(s) {
  beginShape();

  for (let i = 0; i < 10; i++) {
    let angle = i * 36;
    let r = i % 2 == 0 ? s * 0.5 : s * 0.2;
    vertex(cos(angle) * r, sin(angle) * r);
  }

  endShape(CLOSE);
}

function drawSquiggle(s) {
  noFill();
  strokeWeight(5);
  stroke("#333");

  beginShape();

  for (let i = -s / 2; i < s / 2; i += 4) {
    vertex(i, sin(i * 8) * 8);
  }

  endShape();
}

function drawSmile(s) {
  fill("#FFE45E");
  stroke("#222");
  strokeWeight(2);

  circle(0, 0, s);

  noStroke();
  fill("#222");
  circle(-s * 0.18, -s * 0.12, s * 0.08);
  circle(s * 0.18, -s * 0.12, s * 0.08);

  noFill();
  stroke("#222");
  strokeWeight(2);

  arc(0, s * 0.05, s * 0.45, s * 0.3, 0, 180);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}