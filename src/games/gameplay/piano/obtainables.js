import { lives, honeypot } from 'assets/piano'
export class Obtainable {
    constructor(game, x, y){
        this.game = game;
        this.height = 20;
        this.width = 20;
        this.x = x - this.width * 0.5;
        this.y = y - this.height;
        this.score = 1;
        this.markedForDeletion = false;
        this.image = new Image();
        this.image.src = lives;
    }
    update(deltaTime){
        //movement
        this.x -= this.game.speed;
        //check if off screen
        if(this.x + this.width < 0) this.markedForDeletion = true;
    }
    draw(context){
        context.drawImage(this.image, this.x, this.y, this.width, this.height);
    }
}

export class HoneyPot extends Obtainable {
    constructor(game, x, y){
        super(game, x, y)
        this.ratio = 1;
        this.height = 25;
        this.width = this.height * this.ratio;
        this.x = x - this.width * 0.5;
        this.wave = 3;
        this.yFixed = y - this.height - this.wave;
        this.image = new Image();
        this.image.src = honeypot;
        this.angle = 0;
        this.va = 0.05;
    }
    update(deltaTime){
        super.update();
        this.angle += this.va;
        this.y = this.yFixed + Math.sin(this.angle) * this.wave;
    }
}