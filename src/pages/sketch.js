function setup() {
  createCanvas(windowWidth, windowHeight); // Create a canvas that takes up the full window
  background(0); // Set a black background
}

function draw() {
  fill(random(255), random(255), random(255), 150);
  noStroke();
  let size = random(10, 50);

  if (random(1) < 0.5) {
    ellipse(mouseX, mouseY, size, size); // Draw at mouse position
  } else {
    rect(mouseX, mouseY, size, size);
  }
}

function mousePressed() {
  background(random(255), random(255), random(255)); // Change to a random background color
}
function keyPressed() {
  if (key === "C" || key === "c") {
    clear(); // Clears the canvas
    background(0); // Resets to black background
  }
  if (key === "R" || key === "r") {
    background(random(255), random(255), random(255)); // Change background color
  }
}
