import { platform1, platform2 } from 'assets/piano'
import { HoneyPot } from './obtainables.js';

class Platform {
    constructor(game, width, height, topMargin){
        this.game = game;
        //  this.width = 100
        //  this.height = 20;
        this.honeyPotSpawnProb = 1;
        this.topMargin = topMargin;
        this.x = this.game.width + width
        this.y = this.game.player.character.height + (this.game.height - this.game.groundMargin - height - 2 * this.game.player.character.height) * Math.random();
        this.top = this.y + topMargin;
        if(Math.random() <= this.honeyPotSpawnProb) this.game.obtainables.push(new HoneyPot(this.game, this.x + width * 0.5 , this.y))
    }
    update(deltaTime){
        //movement
        this.x -= this.game.speed;
        //check if off screen
        if(this.x + this.width < 0) this.markedForDeletion = true;
    }
    draw(context){
        // context.fillStyle = "blue";
        // context.fillRect(this.x, this.y, this.width, this.height);
        context.drawImage(this.image, this.x, this.y, this.width, this.height)
    }
    onPlatformDetection(vy, {x, y, width, height}){
                //above or on platform
        return  y + height <= this.top &&
                //on or below platform after next fall move
                y + height + vy >= this.top &&
                //right hand side of character right of platform start
                x + width >= this.x &&
                //left hand side of character left of platform end
                x <= this.x + this.width;
    }
    underPlatformDetection(vy, {x, y, width}){
                //top of character under platform bottom
        return  y > this.y + this.height &&
                //top of character above or on platform bottom after nex jump move
                y + vy <= this.y + this.height &&
                //right hand side of character right of platform start
                x + width >= this.x &&
                //left hand side of character left of platform end
                x <= this.x + this.width
    }
    inPlatformDetection(isValidState, {x, y, height, width}){
                // character top above platformm bottom
        return  y < this.y + this.height &&
                //character bottom below platform top
                y + height > this.top &&
                //right hand side of character right of platform start
                x + width >= this.x &&
                //left hand side of character left of platform end
                x <= this.x + this.width &&
                isValidState
    }
}

export class PlatformA extends Platform{
    constructor(game){
        super(game, 286, 109, 18);
        this.width = 286;
        this.height = 109;
        this.image = new Image();
        this.image.src = platform1;
    }
}

export class PlatformB extends Platform{
    constructor(game){
        super(game, 143, 109, 18);
        this.width = 143;
        this.height = 109;
        this.image = new Image();
        this.image.src = platform2;
    }
}
