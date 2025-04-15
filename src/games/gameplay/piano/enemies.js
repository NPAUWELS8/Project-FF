import { bee } from 'assets/piano'

class Enemy {
    constructor(game){
        this.game = game;
        this.frameX = 0;
        this.frameY = 0;
        this.fps = 20;
        this.frameInterval = 1000 / this.fps;
        this.frameTimer = 0;
        this.markedForDeletion = false;
    }
    update(deltaTime){
        //movement
        this.x -= this.speedX + this.game.speed;
        this.y += this.speedY;
        if(this.frameTimer > this.frameInterval){
            this.frameTimer = 0;
            if(this.frameX < this.maxFrame) this.frameX++;
            else this.frameX = 0;
        } else{
            this.frameTimer += deltaTime;
        }
        //check if off screen
        if(this.x +this.width < 0) this.markedForDeletion = true;
    }
    draw(context){
        if (this.game.debug) context.strokeRect(this.x, this.y, this.width, this.height);
        context.drawImage(this.image, this.frameX * this.width, 0, this.width, this.height, this.x, this.y,  this.width, this.height)
    }
}

class FlyingEnemy extends Enemy {
    constructor(game, width, height){
        super(game);
        this.width = width;
        this.height = height;
        this.x = this.game.width + Math.random() * this.game.width * 0.5;
        this.y = Math.random() * (this.game.height * 0.5 - this.game.groundMargin);
        this.speedX = Math.random() + 1;
        this.speedY = 0;
        this.maxFrame = 5;
        this.angle = 0;
        this.va = Math.random() * 0.1 + 0.1;
    }
    update(deltaTime){
        super.update(deltaTime);
        this.angle += this.va;
        this.y += Math.sin(this.angle);

    }
}

export class Bee extends FlyingEnemy{
    constructor(game){
        super(game, 70, 72);
        this.image = new Image();
        this.image.src = bee;
    }
}

// class GroundEnemy extends Enemy {
//     constructor(game){
//         super(game);
//         this.width = 60;
//         this.height = 87;
//         this.x = this.game.width;
//         this.y = this.game.height - this.height - this.game.groundMargin;
//         this.speedX = 0;
//         this.speedY = 0;
//         this.maxFrame = 1;
//     }
// }

// class ClimbingEnemy extends Enemy{
//     constructor(game){
//         super(game);
//         this.width = 120;
//         this.height = 144;
//         this.x = this.game.width;
//         this.y = Math.random() * this.game.height * 0.5;
//         this.speedX = 0;
//         this.speedY = Math.random() > 0.5 ? 1 : -1;
//         this.maxFrame = 5;
//     }
//     update(deltaTime){
//         super.update(deltaTime);
//         if(this.y > this.game.height - this.height - this.game.groundMargin) this.speedY *= -1;
//         if(this.y < - this.height) this.markedForDeletion = true;
//     }
//     draw(context){
//         super.draw(context);
//         context.beginPath();
//         context.moveTo(this.x + this.width * 0.5, 0);
//         context.lineTo(this.x + this.width * 0.5, this.y + 50);
//         context.stroke();
//     }
// }