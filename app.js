var canvas = document.querySelector("canvas");

canvas.width = window.innerWidth -50;
canvas.height = window.innerHeight -50;

var c = canvas.getContext("2d");

var colorArray = [
    "#000000",
]
var key = {
    left: false,
    right: false,
    fire : false,
}
let goRight = true;
let goDown = false;
var img1 = new Image;
img1.src = "//i.stack.imgur.com/EU6KB.jpg"
addEventListener("resize", function() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    init();
})

function Circle(x, y, dx, dy, radius) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
    this.minRadius = radius;
    this.color = colorArray[Math.floor(Math.random() * colorArray.length)]

    this.draw = function() {
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        c.fillStyle = this.color;
        c.fill();
    }

    this.update = function() {

        if (this.x + this.radius > innerWidth -50) {
            goRight = false;
            goDown = true;
        } 
        else if (this.x - this.radius < 0 ) {
            goRight = true;
        }
        if (goRight == true){
            this.x += this.dx;
        } else {this.x -= this.dx;}

        if (goDown == true) {
        circleArray.forEach((circle)=>{
            circle.y +=5
        });
        goDown = false;
        }
        this.draw();
    }
}

function Shooter(x, y,){
    this.x = x;
    this.y = y;

    this.draw = function() {
        c.beginPath();
        c.fillStyle = "rgba(0, 0, 0, 0.7)";
        c.fillRect(this.x, this.y, 60, 20);

        c.moveTo((this.x + 30) - 2.5, this.y);
        c.lineTo((this.x + 30) - 2.5, this.y - 5);
        c.lineTo((this.x + 30) + 2.5, this.y -5);
        c.lineTo((this.x + 30) + 2.5, this.y );
        c.strokeStyle = "rgba(0, 0, 0, 0.7)";
        c.stroke()
    }
    this.update = function() {
        if (key.left == true) {
            this.x -= 10;
            key.left = false;
        } 
        if (key.right == true) {
            this.x += 10;
            key.right = false;
        }
        this.draw();
    }
}
function Bullet(x, y, dy) {
    this.x = x;
    this.y = y;
    this.dy = dy;

    this.draw = function() {
        c.beginPath()
        c.fillStyle = "rgba(0, 0, 0, 0.7)"
        c.fillRect(this.x, this.y, 5, 15)
    }
    this.update = function() {
        if (this.y < 0) {
            key.fire = false;
        }
        this.y -= this.dy;
        this.draw();
    }
}
let bullets = [];
var circleArray = [];

window.addEventListener("keydown", (e)=>{
    if (e.key == "ArrowLeft") {
        key.left = true;
    } 
    else if(e.key == "ArrowRight") {
        key.right = true;
    } 
    if (e.key == "ArrowUp") {
        bullets.push(new Bullet(shooter.x + 27.5, shooter.y, 10))
    }
})

function init(){
    circleArray = [];
    for(var j = 1; j < 5; j++) {
        for (var i =1; i < 16; i++) {
            var radius = 20;
            var x = 150 + (i *70) ;
            var y = 100 + (j *80);
            var dx = 1;
            var dy = 20;
            circleArray.push(new Circle(x, y, dx, dy, radius))
        }
    }
}

var shooter = new Shooter((innerWidth / 2), (innerHeight - 100));
function animate() {
    requestAnimationFrame(animate);
    c.clearRect(0, 0, innerWidth,  innerHeight);

    for (var i = 0; i < circleArray.length; i++) {
        circleArray[i].update();
    }
    shooter.update();

    bullets.forEach((bullet, index)=>{
        bullet.update();

        circleArray.forEach((circle, circleIndex)=>{                      
            var dist = Math.hypot(bullet.x - circle.x, bullet.y - circle.y)
            if(dist - circle.radius < 1) {
                bullets.splice(index, 1);
                circleArray.splice(circleIndex, 1);
            }
        })

    })
}
init();
animate();