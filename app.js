var canvas = document.querySelector("canvas");

canvas.width = window.innerWidth;
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

        //inertactivity
        if (mouse.x - this.x < 50 && mouse.x - this.x > -50 && mouse.y -this.y < 50 && mouse.y - this.y > -50) {
            if (this.radius < maxRadius) {
                this.radius += 6;
            }
        } else if (this.radius > this.minRadius) {
            this.radius -= 1;
        }
        this.draw();
    }
}

function Shooter(x, y, dx){
    this.x = x;
    this.y = y;
    this.dx = dx;

    this.draw = function() {
        c.beginPath();
        c.fillStyle = "rgba(255, 0, 0, 0.5)";
        c.fillRect((innerWidth / 2), (innerHeight - 100), this.y, this.x);
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
            var dx = 10;
            var dy = (Math.random() - 0.5) * 3;
            circleArray.push(new Circle(x, y, dx, dy, radius))
        }
    }
}
var shooter = new Shooter(20, 60);
function animate() {
    requestAnimationFrame(animate);
    c.clearRect(0, 0, innerWidth,  innerHeight);

    for (var i = 0; i < circleArray.length; i++) {
        circleArray[i].update();
    }
    shooter.draw();

}
init();
animate();