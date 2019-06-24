var WIDTH = 30;
var HEIGHT = 30;
var ANTS = 10;
var GAME_ANIMATION_FRAME = 32;
var ants = [];
function Container(width, height) {
  this.width = width;
  this.height = height;
  this.elem = null;

  this.init = function() {
    this.elem = document.createElement("div");
    this.elem.style.width = this.width + "px";
    this.elem.style.height = this.height + "px";
    this.elem.style.margin = "0 auto";
    this.elem.style.border = '10px solid gray';
    this.elem.style.position = "relative";
    document.body.appendChild(this.elem);
    return this;
  };
}

function createBoxes(x, y, Parent) {
  var xVelocity = 2;
  var yVelocity = 2;
  this.x = x;
  this.y = y;
  this.ant = null;
  this.init = function() {
    this.ant = document.createElement("img");
    this.ant.setAttribute('src','./Images/Ant.png');
    this.ant.style.position = "absolute";
    this.ant.style.width = WIDTH + "px";
    this.ant.style.height = HEIGHT + "px";
    this.ant.onclick = function(event) {
      var el = event.target;
      Parent.removeChild(el);
    };
    Parent.appendChild(this.ant);
  };
  this.setPosition = function() {
    this.ant.style.left = this.x + "px";
    this.ant.style.top = this.y + "px";
  };

  this.moveBox = function() {
    if (this.x <= 0) {
      xVelocity = -xVelocity;
    }

    if (this.x + WIDTH >= 800) {
      xVelocity = -xVelocity;
    }

    if (this.y + HEIGHT >= 500) {
      yVelocity = -yVelocity;
    }
    if (this.y <= 0) {
      yVelocity = -yVelocity;
    }

    this.x += xVelocity;
    this.y += yVelocity;
  };

  this.detectCollision = function(i) {
    // for(var i = 0; i< ANTS; i++)
    // {
    for (var j = 0; j < ANTS; j++) {
      if (j != i) {
        var distanceX = ants[i].x - ants[j].x;
        var distanceY = ants[i].y - ants[j].y;
        var distance = Math.sqrt(
          Math.pow(distanceX, 2) + Math.pow(distanceY, 2)
        );
        if (distance <= WIDTH) {
          if (distanceX <= WIDTH) {
            xVelocity = -xVelocity;
            this.x += xVelocity;
          }
          if (distanceY <= WIDTH) {
            yVelocity = -yVelocity;
            this.y += yVelocity;
          }
        }
      }
    }
    // }
  };
}

function Animator(parentElem) {
  this.parentElem = parentElem;
  this.init = function() {
    for (var i = 1; i <= ANTS; i++) {
      var box = new createBoxes(
        Math.ceil(Math.random() * (800 - WIDTH)),
        Math.ceil(Math.random() * (500 - HEIGHT)),
        this.parentElem
      );
      ants.push(box);
      box.init();
      box.setPosition();
    }
  };
  var interval = setInterval(function() {
    for (var i = 0; i < ANTS; i++) {
      ants[i].moveBox();
      ants[i].setPosition();
      ants[i].detectCollision(i);
    }
  }, GAME_ANIMATION_FRAME);
}

var container = new Container(800, 500);
var parent = container.init();
new Animator(parent.elem).init();
