
// global vars
var spaceships = [];  
var browserWidth;
var browserHeight;
var numberOfSpaceships = 5;
var resetPosition = false;
var enableAnimations = false;
var reduceMotionQuery = matchMedia("(prefers-reduced-motion)");

// accessibility
function setAccessibilityState() {
  if (reduceMotionQuery.matches) {
    enableAnimations = false;
  } else { 
    enableAnimations = true;
  }
}
setAccessibilityState();
reduceMotionQuery.addListener(setAccessibilityState);

// setup
function setup() {
  if (enableAnimations) {
    window.addEventListener("DOMContentLoaded", generateSpaceships, false);
    window.addEventListener("resize", setResetFlag, false);
  }
}
setup();

function Spaceship(element, speed, xPos, yPos) {
  this.element = element;
  this.speed = speed;
  this.xPos = xPos;
  this.yPos = yPos;
  this.scale = 1;
  this.counter = 0;
  this.sign = Math.random() < 0.5 ? 1 : -1;
  this.element.style.opacity = (.5 + Math.random()) / 3;
}

// animation
Spaceship.prototype.update = function () {
  this.counter += this.speed / 5000;
  this.xPos -= this.sign * this.speed * Math.cos(this.counter) / 40;
  this.yPos -= Math.sin(this.counter) / 40 + this.speed / 30;
//   this.scale = .5 + Math.abs(10 * Math.cos(this.counter) / 20);
  setTransform(Math.round(this.xPos), Math.round(this.yPos), this.scale, this.element);
  if (this.yPos < -300) {
    this.yPos = browserHeight;
  }
}

function setTransform(xPos, yPos, scale, el) {
  el.style.transform = `translate3d(${xPos}px, ${yPos}px, 0) scale(${scale}, ${scale})`;
}

function generateSpaceships() {
  var originalSpaceship = document.querySelector(".spaceship");
  var spaceshipContainer = originalSpaceship.parentNode;
  spaceshipContainer.style.display = "block";
  browserWidth = document.documentElement.clientWidth;
  browserHeight = document.documentElement.clientHeight;
  for (var i = 0; i < numberOfSpaceships; i++) {
    var spaceshipClone = originalSpaceship.cloneNode(true);
    spaceshipContainer.appendChild(spaceshipClone);
    var initialXPos = getPosition(50, browserWidth);
    var initialYPos = getPosition(50, browserHeight);
    var speed = 200 + Math.random() * 200;
    var spaceshipObject = new Spaceship(spaceshipClone,
      speed,
      initialXPos,
      initialYPos);
    spaceships.push(spaceshipObject);
  }
  spaceshipContainer.removeChild(originalSpaceship);
  moveSpaceships();
}

function moveSpaceships() {
  if (enableAnimations) {
    for (var i = 0; i < spaceships.length; i++) {
      var spaceship = spaceships[i];
      spaceship.update();
    }      
  }

  if (resetPosition) {
    browserWidth = document.documentElement.clientWidth;
    browserHeight = document.documentElement.clientHeight;
    for (var i = 0; i < spaceships.length; i++) {
      var spaceship = spaceships[i];
      spaceship.xPos = getPosition(50, browserWidth);
      spaceship.yPos = getPosition(50, browserHeight);
    }
    resetPosition = false;
  }
  requestAnimationFrame(moveSpaceships);
}

function getPosition(offset, size) {
  return Math.round(-1 * offset + Math.random() * (size + 2 * offset));
}

function setResetFlag(e) {
  resetPosition = true;
}