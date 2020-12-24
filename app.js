var canvas = document.querySelector("canvas");

canvas.width = window.innerWidth -50;
canvas.height = window.innerHeight;

var c = canvas.getContext("2d");

var mouse = {
    x: undefined,
    y: undefined,
}
var minRadius = 10;
var maxRadius = 70;

var colorArray = [
    "#264653",
    "#2a9d8f",
    "#e9c46a",
    "#f4a261",
    "#e76f51",
]
var key = {
    left: false,
    right: false,
    fire : false,
}

window.addEventListener("keydown", (e)=>{
    if (e.key == "ArrowLeft") {
        key.left = true;
    } 
    else if(e.key == "ArrowRight") {
        key.right = true;

    } 
    if (e.key == "ArrowUp") {
        key.fire = true;
        bullet.x = shooter.x;
        bullet.y = shooter.y;
    }
})
window.addEventListener("mousemove", 
    function(event) {
        mouse.x = event.x
        mouse.y = event.y
});

window.addEventListener("resize", function() {
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

        if (this.x + this.radius > innerWidth || this.x - this.radius < 0 ) {
            this.dx = -this.dx;
        }
        if (this.y + this.radius > innerHeight || this.y - this.radius < 0) {
            this.dy = -this.dy;
        }
        if (this.cricle != circleArray[14]) {
            this.dx = circleArray[14].dx
        }

        
        this.x += this.dx;
        // this.y += this.dy;

        this.draw();
    }
}

function Shooter(x, y,){
    this.x = x;
    this.y = y;

    this.draw = function() {
        c.beginPath();
        c.fillStyle = "rgba(255, 0, 0, 0.5)";
        c.fillRect(this.x, this.y, 60, 20);
    }

    this.update = function() {
        if (key.left == true) {
            this.x -= 5;
            key.left = false;
        } 
        if (key.right == true) {
            this.x += 5;
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
        c.fillStyle = "rgba(0, 0, 255, 0.5)"
        c.fillRect(this.x, this.y, 30, 30)
    }
    this.update = function() {
        if (this.y < 0) {
            key.fire = false;
        }
        this.y -= this.dy;
        this.draw();
    }


}
var circleArray = [];

function init(){
    circleArray = [];
    for(var j = 1; j < 5; j++) {
        for (var i =1; i < 16; i++) {
            var radius = 20;
            var x = 150 + (i *70) ;
            var y = 100 + (j *80);
            var dx = 2;
            var dy = (Math.random() - 0.5) * 3;
            circleArray.push(new Circle(x, y, dx, dy, radius))
        }
    }
}
var shooter = new Shooter((innerWidth / 2), (innerHeight - 100));

var bullet = new Bullet(shooter.x, shooter.y, 5);


function animate() {
    requestAnimationFrame(animate);
    c.clearRect(0, 0, innerWidth,  innerHeight);

    for (var i = 0; i < circleArray.length; i++) {
        circleArray[i].update();
    }
    shooter.update();

    if (key.fire == true) {
        bullet.update();
    }
    

}
init();
animate();