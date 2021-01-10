//initialize the acces to canvas api
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
    "#FF0000",
    "#FF0000",
    "#FF0000",
]
//arrays to be used to hold game objects
let bullets = [];
let particles = [];
let starArray = [];
let alienArray = [];
let ufoArray = [];
let moveAlien = 0;

//flags for keyboard usage for controls
let key = {
    left: false,
    right: false,
    fire : false,
}
//flags to control aliens movements
let goRight = true;
let goDown = false;
// resize the size of canvas according to what user adjusts their browser
addEventListener("resize", function() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    init();
})
//stars are used to create a background
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
//Alien class is drawed to the screen
function Alien(x, y, dx, dy, size) {
    this.x = x;
    this.y = y;
    this.dx= dx;
    this.dy = dy;
    this.size = size;
    this.color = colorArray[0]

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
    this.drawMovement = function() {
        c.beginPath()
        c.fillStyle = this.color;

        //row0
        c.fillRect(this.x + this.size * 2, this.y, this.size ,this.size)
        c.fillRect(this.x + this.size * 7, this.y,this.size, this.size)
        //row1
        c.fillRect(this.x + this.size * 3, this.y + this.size, this.size ,this.size)
        c.fillRect(this.x + this.size * 6, this.y + this.size, this.size, this.size)
        //row2
        c.fillRect(this.x, this.y + 2 * this.size, this.size, this.size)
        c.fillRect(this.x + this.size * 2, this.y + 2 * this.size, this.size * 6, this.size)
        c.fillRect(this.x + this.size * 9, this.y + 2 * this.size, this.size, this.size)
        //row3
        c.fillRect(this.x  , this.y + 3 * this.size, this.size * 3 ,this.size)
        c.fillRect(this.x + this.size * 4, this.y + 3 * this.size, this.size * 2 ,this.size)
        c.fillRect(this.x + this.size * 7, this.y + 3 * this.size, this.size * 3 ,this.size)
        //row4
        c.fillRect(this.x , this.y + 4 * this.size, this.size * 10 ,this.size)
        //row5
        c.fillRect(this.x + this.size * 2, this.y + 5 * this.size, this.size * 6, this.size)

        //row6
        c.fillRect(this.x + this.size * 2, this.y + 6 * this.size, this.size, this.size)
        c.fillRect(this.x + this.size * 7, this.y + 6 * this.size, this.size, this.size)
        //row6
        c.fillRect(this.x + this.size , this.y + 7 * this.size, this.size, this.size)
        c.fillRect(this.x + this.size * 8, this.y + 7 * this.size, this.size, this.size)

        c.closePath()
        if (moveAlien > 5000) {
            moveAlien = 0;
        }
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
                alien.y += 20;
            })
            goDown = false;
        }
        moveAlien++
        if (moveAlien < 2500) {
            this.draw();
        } else if (2500 < moveAlien < 5000) {
            this.drawMovement();

        }

    }
}
//ufo will be created with function below. it will come now and than and will give extra point when killed.
function Ufo(x, y, dx, size) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.size = size
    this.color = colorArray[1]

    this.draw = function() {

        c.beginPath()
        c.fillStyle = this.color;

        //row0
        c.fillRect(this.x + this.size * 4, this.y, this.size * 8, this.size)
        //row1
        c.fillRect(this.x + this.size * 2, this.y + this.size, this.size * 12, this.size)
        //row2
        c.fillRect(this.x + this.size , this.y + this.size * 2, this.size * 2, this.size)
        c.fillRect(this.x + this.size * 4, this.y + this.size * 2, this.size * 2, this.size)
        c.fillRect(this.x + this.size * 7, this.y + this.size * 2, this.size * 2, this.size)
        c.fillRect(this.x + this.size * 10, this.y + this.size * 2, this.size * 2, this.size)
        c.fillRect(this.x + this.size * 13, this.y + this.size * 2, this.size * 2, this.size)
        //row3
        c.fillRect(this.x, this.y + this.size * 3, this.size * 16, this.size)
        //row4
        c.fillRect(this.x + this.size * 2, this.y + this.size * 4, this.size * 3, this.size)
        c.fillRect(this.x + this.size * 7, this.y + this.size * 4, this.size * 2, this.size)
        c.fillRect(this.x + this.size * 11, this.y + this.size * 4, this.size * 3, this.size)
        //row5
        c.fillRect(this.x + this.size * 3, this.y + this.size * 5, this.size , this.size)
        c.fillRect(this.x + this.size * 12, this.y + this.size * 5, this.size , this.size)

        c.closePath()
    }

    this.update = function() {

        this.x += this.dx
        this.draw()
    }

}
//alien move


//particles are drawn on screen when we kill an alien
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
        c.fillStyle = "rgba(255, 255, 255, 1)";
        c.fillRect(this.x, this.y, 60, 20);
        c.moveTo((this.x + 30) - 2.5, this.y);
        c.lineTo((this.x + 30) - 2.5, this.y - 5);
        c.lineTo((this.x + 30) + 2.5, this.y -5);
        c.lineTo((this.x + 30) + 2.5, this.y );
        c.strokeStyle = "rgba(255, 255, 255, 1)";
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
        c.fillStyle = "rgba(255, 255, 255, 0.8)"
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

setInterval(()=>{ufoArray.push(new Ufo(-100, 100,3,4))}, ((Math.random() + 1)  + 10000))

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
let AnimationId;
const shooter = new Shooter((innerWidth / 2), (innerHeight - 100));
let score = 0;


function animate() {
    AnimationId = requestAnimationFrame(animate);
    //below 2 lines cleans the screen each time we call animate. which actually creates the frames.
    c.fillStyle = "rgba(0, 0, 0, 0.8)"
    c.fillRect(0, 0, innerWidth,  innerHeight);


    ufoArray.forEach((ufo, index) =>{
        if (ufo.x > innerWidth) {
            ufoArray.splice(index, 1)
        }
        ufo.update()
    })
    alienArray.forEach((alien)=>{
        alien.update()
    })
    
    starArray.forEach((star)=>{
        star.update()
    })
    //below code we constantly check the distance between aliens and our shooter and base line
    for (let i = 0; i < alienArray.length; i++) {
        alienArray[i].update();
        //when aliens touch shooter the game is finishes
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
        //check when a bullet hits an alien
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
                //below code utilize a smoother transition
                setTimeout(() => {
                    bullets.splice(index, 1);
                    alienArray.splice(alienIndex, 1);                    
                }, 0);               
            }
        })
        ufoArray.forEach((ufo, ufoIndex) =>{
            let dist = Math.hypot(bullet.x - ufo.x - ufo.size * 8, bullet.y - ufo.y - ufo.size * 3)
            if (dist < 5 * ufo.size) {
                score += 500;
                scoreE.innerHTML  = score;
                for (let i = 0; i < 50; i++) {
                    particles.push(new Particles(
                        bullet.x,
                        bullet.y, 
                        (Math.random() - 0.5) * (Math.random() * 9),
                        (Math.random() - 0.5) * (Math.random() * 9),
                        3 * Math.random()))
                }
                //below code utilize a smoother transition
                setTimeout(() => {
                    bullets.splice(index, 1);
                    ufoArray.splice(ufoIndex, 1);                    
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
