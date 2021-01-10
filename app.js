const canvas = document.querySelector("canvas");
canvas.width = window.innerWidth -50;
canvas.height = window.innerHeight -50;

const c = canvas.getContext("2d");

const scoreE = document.querySelector("#scoreE");
const startGameBtn = document.querySelector("#startGameBtn");
const modal = document.querySelector("#modal");
const bigScore = document.querySelector("#bigScore");
//in colorArray the given colors randomly appointed to the balls
let colorArray = [
    "#ffffff",
]
let bullets = [];
let particles = [];
let starArray = [];
let alienArray = [];


let key = {
    left: false,
    right: false,
    fire : false,
}

let goRight = true;
let goDown = false;
// resize the size of canvas according to what user adjusts their browser
addEventListener("resize", function() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    init();
})

function Stars(x, y, radius) {
    this.x = x;
    this.y = y;
    this.radius = radius;

    this.draw = function () {
        c.beginPath()
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        c.fillStyle = "#ffffff";
        c.fill();
        
    }

    this.update = function () {
        this.draw()
    }
}
//CREATING PROPER ALIENS HERE TO BE CAHNGED WITH CIRCLES
function Alien(x, y, dx, dy, size) {
    this.x = x;
    this.y = y;
    this.dx= dx;
    this.dy = dy;
    this.size = size;
    this.color = colorArray[Math.floor(Math.random() * colorArray.length)]

    this.draw = function() {
        c.beginPath()
        c.fillStyle = this.color;
        //row0
        c.fillRect(this.x + this.size * 2, this.y, this.size ,this.size)
        c.fillRect(this.x + this.size * 7, this.y,this.size, this.size)
        //row1
        c.fillRect(this.x + this.size * 3, this.y + this.size, this.size ,this.size)
        c.fillRect(this.x + this.size * 6, this.y + this.size, this.size, this.size)
        //row2
        c.fillRect(this.x + this.size * 2, this.y + 2 * this.size, this.size * 6 ,this.size)
        //row3
        c.fillRect(this.x + this.size , this.y + 3 * this.size, this.size * 2 ,this.size)
        c.fillRect(this.x + this.size * 4, this.y + 3 * this.size, this.size * 2 ,this.size)
        c.fillRect(this.x + this.size * 7, this.y + 3 * this.size, this.size * 2 ,this.size)
        //row4
        c.fillRect(this.x , this.y + 4 * this.size, this.size * 10 ,this.size)
        //row5
        c.fillRect(this.x , this.y + 5 * this.size, this.size, this.size)
        c.fillRect(this.x + this.size * 2, this.y + 5 * this.size, this.size * 6, this.size)
        c.fillRect(this.x + this.size * 9, this.y + 5 * this.size, this.size , this.size)
        //row6
        c.fillRect(this.x, this.y + 6 * this.size, this.size , this.size)
        c.fillRect(this.x + this.size * 2, this.y + 6 * this.size, this.size, this.size)
        c.fillRect(this.x + this.size * 7, this.y + 6 * this.size, this.size, this.size)
        c.fillRect(this.x + this.size * 9, this.y + 6 * this.size, this.size, this.size)
        //row6
        c.fillRect(this.x + this.size * 3, this.y + 7 * this.size, this.size, this.size)
        c.fillRect(this.x + this.size * 6, this.y + 7 * this.size, this.size, this.size)

        c.closePath()
    }

    this.update = function() {
        if (this.x + 10 * this.size > innerWidth - 50) {
            goRight = false;
            goDown = true;
        }
        else if(this.x < 0) {
            goRight = true;
        }
        if (goRight == true) {
            this.x += this.dx
        } else {this.x -= this.dx;}

        if (goDown == true) {
            alienArray.forEach((alien)=>{
                alien.y += 10
            })
            goDown = false;
        }
        this.draw()
    }
}

const friction = 0.99;
function Particles(x, y, dx, dy, radius) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
    this.alpha = 1;

    this.draw = function() {
        c.save();
        c.globalAlpha = this.alpha
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        c.fillStyle = "#ffffff";
        c.fill();
        c.restore();
    }
    this.update = function() {
        this.draw();
        this.dx *= friction;
        this.dy *= friction;
        this.x += this.dx;
        this.y += this.dy;
        this.alpha -= 0.01;
    }
}
function Shooter(x, y,){
    this.x = x;
    this.y = y;

    this.draw = function() {
        c.beginPath();
        c.fillStyle = "rgba(255, 255, 255, 0.7)";
        c.fillRect(this.x, this.y, 60, 20);
        c.moveTo((this.x + 30) - 2.5, this.y);
        c.lineTo((this.x + 30) - 2.5, this.y - 5);
        c.lineTo((this.x + 30) + 2.5, this.y -5);
        c.lineTo((this.x + 30) + 2.5, this.y );
        c.strokeStyle = "rgba(255, 255, 255, 0.7)";
        c.stroke()
    }
    //shooters right and left movement handled part1
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
        c.fillStyle = "rgba(255, 255, 255, 0.7)"
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

//shooter movement handled part2. 
window.addEventListener("keydown", (e)=>{
    //shooter is not allowed to go further than innerWidth
    if (shooter.x - 30 < 0) {
        if(e.key == "ArrowRight") {key.right = true;} 
    }
    else if (shooter.x > innerWidth - 118) {
        if (e.key == "ArrowLeft") {key.left = true;} 
    }
    else {    
        if (e.key == "ArrowLeft") {key.left = true;} 
        else if(e.key == "ArrowRight") {key.right = true;} 
    }
    if (e.key == "ArrowUp" || e.which == 32) {
        bullets.push(new Bullet(shooter.x + 27.5, shooter.y, 10))
    }
})
//initializing the balls at teh beggining 
function init(){
    score = 0;
    scoreE.innerHTML = score;
    bigScore.innerHTML = score;
    bullets = [];
    alienArray = [];
    particles = [];

    for(let j = 1; j < 200; j++){
        let x = (Math.random() * innerWidth)
        let y = (Math.random() * innerHeight)
        let radius = (Math.random() ) * 2
        starArray.push(new Stars(x, y, radius))
    }

    for(let j = 1; j < 5; j++) {
        for (let i =1; i < 16; i++) {
            let size = 4;
            let x = 150 + (i *70) ;
            let y = 10 + (j *60);
            let dx = 0.6;
            let dy = 5;
            alienArray.push(new Alien(x, y, dx, dy, size))
        }
    }
    

}
let AnimationId
const shooter = new Shooter((innerWidth / 2), (innerHeight - 100));
let score = 0;


function animate() {
    AnimationId = requestAnimationFrame(animate);
    c.fillStyle = "rgba(0, 0, 0, 0.8)"
    c.fillRect(0, 0, innerWidth,  innerHeight);

    alienArray.forEach((alien)=>{
        alien.update()
    })
    
    starArray.forEach((star)=>{
        star.update()
    })

    for (let i = 0; i < alienArray.length; i++) {
        alienArray[i].update();
        //end game
        const dist = Math.hypot((shooter.x / 2) - (alienArray[i].x / 2), (shooter.y / 2) - (alienArray[i].y / 2))
        if(dist < alienArray[i].size * 5 || alienArray[i].y > innerHeight - 100) {
            cancelAnimationFrame(AnimationId);
            modal.style.display = "flex";
            bigScore.innerHTML = score;
        }
    }
    shooter.update();
    particles.forEach((particle, index)=>{
        if (particle.alpha <= 0.01) {
            particles.splice(index, 1)
        } else {
            particle.update()
        }
    })
    
    bullets.forEach((bullet, index)=>{
        if (bullet.y < 0 || index > 0) {
            setTimeout(() => {
                bullets.splice(index, 1);
            }, 0);
        }

        bullet.update();

        alienArray.forEach((alien, alienIndex)=>{
            let dist = Math.hypot(bullet.x - alien.x - alien.size * 5, bullet.y - alien.y - alien.size * 4)
            //when they close up to a distance it means that they are in contact
            if (dist < 5 * alien.size) {
                //increase the score
                score += 100;
                scoreE.innerHTML  = score;
                for (let i = 0; i < 20; i++) {
                    particles.push(new Particles(
                        bullet.x,
                        bullet.y, 
                        (Math.random() - 0.5) * (Math.random() * 9),
                        (Math.random() - 0.5) * (Math.random() * 9),
                        3 * Math.random()))
                }
                setTimeout(() => {
                    bullets.splice(index, 1);
                    alienArray.splice(alienIndex, 1);                    
                }, 0);               
            }
        })


    })
}
startGameBtn.addEventListener("click", ()=>{
    init();
    animate();
    modal.style.display = "none"
})
