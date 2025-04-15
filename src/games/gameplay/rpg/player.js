import { states, RunUp, StandUp, RunDown, StandDown, RunLeft, StandLeft, RunRight, StandRight } from './playerStates.js'
import { MovementObject } from './input.js'

export class Player {
    constructor(game){
        this.game = game;
        this.image = rpgPlayer;
        this.width = 48;
        this.height = 68;
        this.topMargin = 30;
        this.x = (game.width - this.width) * 0.5;
        this.y = (game.height - this.height) * 0.5;
        this.walkSpeed = 3;
        this.frozen = false;
        this.fps = 5;
        this.frameInterval = 1000 / this.fps;
        this.frameTimer = 0;
        this.states = []
        this.movementObj = new MovementObject(this.game, this);
        this.movementObj.addMovementKeys("ArrowUp",'y', 1, RunUp, StandUp);
        this.movementObj.addMovementKeys("ArrowDown",'y', -1, RunDown, StandDown);
        this.movementObj.addMovementKeys("ArrowLeft",'x', 1, RunLeft, StandLeft);
        this.movementObj.addMovementKeys("ArrowRight",'x', -1, RunRight, StandRight);
        this.states.forEach((state, index) => state.addEnum(index))
        this.currentState = this.states[states.STANDDOWN];
        this.frameX = 0;
        this.frameY = this.currentState.frameY;
        this.frameCount = 1;
        this._currentInteraction;
        this.interactionMargin = 5;
    }
    set currentInteraction(interaction){
        if(!this._currentInteraction || !interaction) {
            if(this._currentInteraction) this._currentInteraction.toggleButton();
            else interaction.toggleButton();
            this._currentInteraction = interaction
        } 
    }
    get currentInteraction(){
        return this._currentInteraction;
    }
    update(input, deltaTime, otherInput){
        this.currentState.handleInput(input);
        if(this.isNoCollision(input) && !this.frozen){
            this.#movePlayer(input);
        }

        if(this.frameTimer > this.frameInterval){
            this.frameTimer = 0;
            this.#setNextFrame();
        } else{
            this.frameTimer += deltaTime;
        }
    }
    draw(ctx){
        ctx.drawImage(this.image, this.frameX * this.width, this.frameY * this.height, this.width, this.height, this.x, this.y, this.width, this.height);
    }
    #setNextFrame(){
        if(this.frameCount!==1){
            if(this.frameX >= this.frameCount - 1) this.frameX = 0;
            else this.frameX++;
        }
    }
    updateFrame(frameY, startFrameX, frameCount){
        this.frameTimer = 0;
        this.frameX = startFrameX;
        this.frameY = frameY;
        this.frameCount = frameCount;
    }
    #movePlayer(input){
        if(input[0]) this.game.backgroundOffset[this.movementObj[input[0]].axis] += this.walkSpeed * this.movementObj[input[0]].operation;
    }
    setPlayerState(input){
        this.setState(states[this.movementObj[input[0]].state.name])
    }
    setPlayerStandState(input){
        this.setState(states[this.movementObj[input[0]].standState.name])
    }
    setState(state){
        this.currentState = this.states[state];
        this.currentState.enter();

    }
    collisionHandle(object, {x, y, width, height,topMargin},{ArrowUp, ArrowDown, ArrowLeft, ArrowRight}, interactionMargin = 0){
        return  object.x - (this.walkSpeed * ArrowRight + interactionMargin) < x + width &&
                object.x + object.width + (this.walkSpeed * ArrowLeft + interactionMargin) > x &&
                object.y - (this.walkSpeed * ArrowDown + interactionMargin) < y + height &&
                object.y + object.height + (this.walkSpeed * ArrowUp + interactionMargin) > y + topMargin
    }

    getMovementMatrix(input, isMoveDependent = true){
        let movementMatrix = {ArrowUp: 0, ArrowDown: 0, ArrowLeft: 0, ArrowRight: 0};
        if(input[0] && isMoveDependent) movementMatrix[input[0]] = 1;
        return movementMatrix
    }
    isNoCollision(input){
        return this.game.background.allBoundaries.every(boundaryArray =>{
            return boundaryArray.every(boundary => !boundary.isPlayerCollision(input))
        });
    }
}