import { floorie2 } from 'assets/piano'

export class TurningImage {
    constructor(game){
        this.game = game;
        this.image = new Image();
        this.image.src = floorie2;
        this.ratio = 70 / 100
        this.height = 100;
        this.maxWidth = this.height * this.ratio;
        this.width = this.maxWidth;
        this.x = this.game.width * 0.5 - this.width * 0.5;
        this.y = -this.height;
        this.speedY = 2;
        this.maxSpeedY = this.speedY
        this.fps = 60;
        this.frameInterval = 1000 / this.fps;
        this.frameTimer = 0;
        this.markedForDeletion = false;
        this.pauseTimer = 0;
        this.pauseInterval = 100;
        this.rotatingSpeed = 2;
        this.rotationFinished = false;
    }
    update(deltaTime){
        if (this.frameTimer > this.frameInterval){
            this.frameTimer = 0;
            this.y+= this.speedY
            if(!this.speedY) {
                if(this.rotationFinished) {
                    this.pauseTimer++
                    if(!this.game.standStill){
                        this.game.standStill = true;
                    }
                } else this.rotationFinished = this.rotate();
            }
        } else{
            this.frameTimer += deltaTime;
        }
        if(this.y >= 0 && this.speedY > 0){
            this.speedY = 0;
        }
        if(this.pauseTimer >= this.pauseInterval){
            this.speedY = this.maxSpeedY * -1
            this.game.standStill = false;
        }
        if(this.y < -this.height) this.markedForDeletion = true;
    }
    draw(context){
        context.strokeRect(this.x - 1, this.y - 1, this.width + 2, this.height + 2)
        if(!this.imageSet){
            const gradient = context.createLinearGradient(this.x, this.y, this.width + this.x, this.height + this.y)
            gradient.addColorStop(0, "#FFCE00");
            gradient.addColorStop(1, "#FE4880");
            context.fillStyle = gradient;
            context.fillRect(this.x, this.y, this.width, this.height)
        } else{
            context.drawImage(this.image, this.x, this.y, this.width, this.height);
        }
    }
    rotate(){
        if (this.width <= 0) {
            this.rotatingSpeed *= -1;
            this.imageSet = true;
        }
        if (this.width <= this.maxWidth) {
            this.x += this.rotatingSpeed;
            this.width -= this.rotatingSpeed * 2
            return false;
        } else if(this.rotatingSpeed < 0 && this.width >= this.maxWidth){
            this.rotatingSpeed *= -1;
            return true;
        }
    }
}