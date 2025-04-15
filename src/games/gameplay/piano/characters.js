import { animations } from './characterAnimations.js'
import { player, player2, running } from 'assets/piano'

class Character{
    constructor(game, player){
        this.game = game;
        this.player = player;
        this.vy = 0;
        this.weight = 1;
        this.startFrameX = 0;
        this.startFrameY = 0;
        this.startFrame = 0
        this.frameX = 0;
        this.frameY = 0;
        this.frameCount;
        this.frame = 0;
        this.topMargin = 0;
        this.soundPlay = {}
    }
    update(deltaTime){
        if(this.frameTimer > this.frameInterval){
            this.frameTimer = 0;
            this.#setFrame();
            // if(this.player.currentState.recurrentSound) this.player.currentState.recurrentSound.play();
            if(this.soundPlay && this.soundPlay[this.frame - this.startFrame]){
                this.soundPlay[this.frame - this.startFrame].play();
            }
        } else{
            this.frameTimer += deltaTime;
        }
    }
    draw(context){
        context.drawImage(this.image, this.frameX * this.width, this.frameY * this.height, this.width, this.height, this.player.x, this.player.y, this.width, this.height)
    }
    #setFrame(){
        this.frameY = Math.floor((this.frame) / this.spriteSheetCols);
        this.frameX = this.frame % this.spriteSheetCols
        if(this.frame < this.startFrame + this.frameCount -1) this.frame++;
        else this.frame = this.startFrame;
    }
    updateFrame(animation){
       const {startFrameX, startFrameY, frameCount,soundPlay} = animation[this.name];
       this.soundPlay = soundPlay;
       console.log(this.soundPlay);
       this.frameX = startFrameX;
       this.frameY = startFrameY;
       this.frameCount = frameCount;
       this.startFrameX = startFrameX;
       this.startFrameY = startFrameY;
       this.startFrame = startFrameX + startFrameY * this.spriteSheetCols;
       this.frame = this.startFrame;
    }
    animationOver(){
        return this.frame >= this.startFrame + this.frameCount - 1;
    }
    returnCoordinates(x,y){
        return {
            x: x + this.leftMargin,
            y: y + this.topMargin,
            width: this.width - this.leftMargin - this.rightMargin,
            height: this.height - this.topMargin
        }
    }
}


export class Dog extends Character {
    constructor(game, playerObj, startingState){
        super(game, playerObj);
        this.name = "DOG"
        this.width = 100;
        this.height = 91.3;
        this.x = 0;
        this.y = this.game.height - this.height - this.game.groundMargin;
        this.image = new Image();
        this.image.src = player2; //get image element by id
        this.fps = 20;
        this.frameInterval = 1000 / this.fps;
        this.frameTimer = 0;
        this.maxSpeed = 10;
        this.spriteSheetCols = 12;
        this.spriteSheetRows = 10;
        this.game.characterAnimations[animations.IDLE].addCharacter(this.name, 0, 0, 7);
        this.game.characterAnimations[animations.SIT].addCharacter(this.name, 0, 5, 5);
        this.game.characterAnimations[animations.ROLL].addCharacter(this.name, 0, 6, 7);
        this.game.characterAnimations[animations.JUMP].addCharacter(this.name, 0, 1, 7);
        this.game.characterAnimations[animations.FALL].addCharacter(this.name, 0, 2, 7);
        this.game.characterAnimations[animations.HIT].addCharacter(this.name, 0, 4, 11);
        this.game.characterAnimations[animations.RUN].addCharacter(this.name, 0, 3, 9);
        this.game.characterAnimations[animations.DEAD].addCharacter(this.name, 0, 8, 12);
        this.game.characterAnimations[animations.SMACK].addCharacter(this.name, 0, 9, 4);
        this.game.characterAnimations[animations.ATTACK].addCharacter(this.name, 0, 7, 7);
        this.startingState = startingState;
    }
}

export class HoneyBear extends Character {
    constructor(game, playerObj, startingState){
        super(game, playerObj);
        this.name = "HONEYBEAR"
        this.width = 120;
        this.height = 90;
        this.x = 0;
        this.y = this.game.height - this.height - this.game.groundMargin;
        this.image = new Image();
        this.image.src = player;
        this.fps = 30;
        this.frameInterval = 1000 / this.fps;
        this.frameTimer = 0;
        this.maxSpeed = 10;
        this.spriteSheetCols = 7;
        this.spriteSheetRows = 21;
        this.game.characterAnimations[animations.IDLE].addCharacter(this.name, 0, 0, 21);
        this.game.characterAnimations[animations.RUN].addCharacter(this.name, 0, 3, 21);
        this.game.characterAnimations[animations.JUMP].addCharacter(this.name, 0, 6, 11);
        this.game.characterAnimations[animations.FALL].addCharacter(this.name, 4, 7, 11);
        this.game.characterAnimations[animations.ATTACK].addCharacter(this.name, 1, 9, 13);
        this.game.characterAnimations[animations.SMACK].addCharacter(this.name, 0, 11, 8);
        this.game.characterAnimations[animations.DASH].addCharacter(this.name, 1, 12, 11);
        this.game.characterAnimations[animations.ROLL].addCharacter(this.name, 5, 13, 10);
        this.game.characterAnimations[animations.HIT].addCharacter(this.name, 1, 15, 21);
        this.game.characterAnimations[animations.DEAD].addCharacter(this.name, 1, 18, 20);
        this.game.characterAnimations[animations.RUN].addSound(this.name, [5,15],running)
        this.startingState = startingState;
        //margins for jumping platforms
        this.topMargin = 20;
        this.rightMargin = 25;
        this.leftMargin = 33;
    }
}