import { states } from "./playerStates.js"
import { InteractButton } from "./UI.js";

class InteractionObject{
    constructor(game, background, tileX, tileY, tilePx, zoomLevel){
        this.game = game;
        this.background = background;
        this.tileX = tileX;
        this.tileY = tileY;
        this.width = tilePx * zoomLevel;
        this.height = tilePx * zoomLevel;
        this.x = tileX * this.width + game.backgroundOffset.x;
        this.y = tileY * this.height + game.backgroundOffset.y;
    }
    update({x,y}, input, otherInput){
        this.x = this.tileX * this.width + x;
        this.y = this.tileY * this.height + y;
    }
}

export class Boundary extends InteractionObject{
    constructor(game, background, tileX, tileY, tilePx, zoomLevel){
        super(game, background, tileX, tileY, tilePx, zoomLevel)
        
    }
    update({x,y}, input, otherInput){
        super.update({x,y});
        this.handleCollision(input);
    }
    draw(ctx){
        ctx.fillStyle = "red";
        ctx.fillRect(this.x, this.y, this.width, this.height)
    }
    isPlayerCollision(input){
        return this.game.player.collisionHandle(this,this.game.player,this.game.player.getMovementMatrix(input))
    }
    handleCollision(input){
        if(this.isPlayerCollision(input)){
            if(input[0]){
                this.game.player.setPlayerStandState(input);
            }
        }
    }
}

export class EnterBoundary extends Boundary{
    constructor(game, background, tileX, tileY, tilePx, zoomLevel, {enter,handleOverlay}){
        super(game, background, tileX, tileY, tilePx, zoomLevel)
        this.enter = enter;
        this.handleOverlay = handleOverlay
    }
    #switchBackground(){
        this.game.player.frozen = true;
        this.handleOverlay(true);
        setTimeout(()=>{
            this.game.background = this.enter
            this.game.backgroundOffset = {...this.enter.enterOffset}
            this.game.player.setState(states[this.enter.enterState])
            this.game.player.topMargin = this.enter.playerTopMargin;
            this.game.boundaries = this.enter.boundaries;
            this.game.enterBoundary = this.enter.enterBoundaries;
            setTimeout(()=>{
                this.handleOverlay(false);
                this.game.player.frozen = false;
            },1000)
        },1000)
    }
    handleCollision(input){
        if(super.isPlayerCollision(input) && !this.game.player.frozen){
            if(input[0]){
                this.#switchBackground();
                this.game.player.setPlayerStandState(input);
            }
        }
    }
}

export class Interaction extends InteractionObject{
    constructor(game, background, tileX, tileY, tilePx, zoomLevel, {name, text, key}){
        super(game, background, tileX, tileY, tilePx, zoomLevel);
        this.name = name;
        this.text = text;
        this.key = key;
        this.firstInteraction = this.#getFirstInteraction();
        this.interactButton = this.#setInteractButton();
        this.showButton = false;
        this.interactionMargin = 5;
        this.keyFound = false;
    }
    update({x,y}, input, otherInput){
        super.update({x,y})
        this.#handleCollision(input, otherInput)
        this.interactButton.update({x,y})
    }
    draw(context){
        if(this.showButton) this.interactButton.draw(context);
    }
    toggleButton(){
        this.showButton = !this.showButton;
    }
    showText(){
        this.game.dialogue.displayText(this.text + " Press enter to continue.");
        this.toggleButton();
    }
    showKeyText(text){
        this.game.dialogue.displayText(text + " Press enter to continue");
        this.toggleButton();
        this.keyFound = true;
        this.game.keyFound = true;
     }
    hideText(){
        this.game.dialogue.hideText();
        this.toggleButton();
    }
    #getFirstInteraction(){
        let firstInteraction = this.background.interactions.filter((interaction)=> interaction.name === this.name)[0]
        return firstInteraction ? firstInteraction : this ;
    }
    #setInteractButton(){
        return this.firstInteraction === this ? new InteractButton(this.game, this.firstInteraction.tileX * this.width, this.firstInteraction.tileY * this.height) : this.firstInteraction.interactButton;
    }
    #isPlayerCollision(input){
        return this.game.player.collisionHandle(this,this.game.player,this.game.player.getMovementMatrix(input, false),this.interactionMargin);
    }
    #handleCollision(input, otherInput){
        if(this.#isPlayerCollision(input)) this.game.player.currentInteraction = this;
        else if(!this.#isPlayerCollision(input) && this.game.player.currentInteraction === this) this.game.player.currentInteraction = null;
        if(this.game.player.currentInteraction === this){
            if(otherInput.includes("Enter") && !this.game.dialogue.shown && this.game.dialogue.hideTime > 1000) {
                this.showText();
                this.game.player.frozen = true;
            }
            else if(otherInput.includes("Enter") && this.game.dialogue.shown && this.game.dialogue.time > 2000){
                this.hideText();
                if(this.key && !this.keyFound){
                    this.showKeyText("You found the key!");
                }
                else this.game.player.frozen = false;
            }
        }
    }
}

export class BoatInteraction extends Interaction {
    constructor(game, background, tileX, tileY, tilePx, zoomLevel, {name, text, congratsText, key}){
        super(game, background, tileX, tileY, tilePx, zoomLevel, {name, text, key});
        this.congratsText = congratsText;
    }
    showText(){
        this.toggleButton();
        if(!this.game.keyFound){
            this.game.dialogue.displayText(this.text + " Press enter to continue");
        } else{
            this.game.dialogue.displayText(this.congratsText);
            this.game.gameOver = true;
        }
    }
}
