import { fish, bird } from 'assets/piano'

class Ornament {
    constructor(game, width, height){
        this.game = game;
        this.frameX = 0;
        this.frameY = 0;
        this.width = width;
        this.height = height;
        this.x = game.width + width;
        this.fps = 20;
        this.frameInterval = 1000 / this.fps;
        this.frameTimer = 0;

    }
    update(deltaTime){
        //update movement
        this.x -= this.game.speed + this.speedX;
        this.y += this.speedY;
        if(this.frameTimer > this.frameInterval){
            this.frameTimer = 0;
            if(this.frameX < this.maxFrame) this.frameX++
            else this.frameX = 0;
        }
        else this.frameTimer += deltaTime;
        //check if off screen
        if(this.x + this.width < 0) this.markedForDeletion = true;
    }
    draw(context){
        context.drawImage(this.image, this.frameX * this.width, this.frameY * this.height, this.width, this.height, this.x, this.y, this.width, this.height)
    }
    interval(){
        this.frameInterval = 1000 / this.fps;
    }
}

export class Bird extends Ornament {
    constructor(game){
        super(game, 50, 30);
        this.fps = 100;
        super.interval();
        this.image = new Image();
        this.image.src = bird;
        this.maxFrame = 7;
        this.y = Math.random() * this.game.height * 0.5;
        this.speedX = Math.random() * 3 + 5;
        this.speedY = 0;
        this.angle = 1;
        this.va = Math.random() * 0.1 + 0.1;
    }
    update(deltaTime){
        super.update(deltaTime);
        this.angle += this.va;
        this.y += Math.sin(this.angle);
    }
}

export class Fish extends Ornament {
    constructor(game){
        super(game, 50, 89);
        this.fps = 15;
        super.interval();
        this.image = new Image();
        this.image.src = fish;
        this.maxFrame = 6;
        this.y = this.game.height - this.height - this.game.waterMargin;
        this.x = (this.game.width + this.width) * Math.random();
        this.speedX = 0
        this.speedY = 0;
    }
    update(deltaTime){
        super.update(deltaTime);
        if(this.frameX >= this.maxFrame) this.markedForDeletion = true;
    }
}