import { Boundary } from "./interactionObjects.js"

export class Background {
    constructor(game, backGroundImage, foreGroundImage, zoomLevel, tilePx, enterOffset, enterState, playerTopMargin){
        this.game = game;
        this.width = 3360;
        this.height = 1920;
        this.backGroundImage = new Image();
        this.backGroundImage.src = backGroundImage;
        this.foreGroundImage = new Image();
        this.foreGroundImage.src = foreGroundImage;
        this.x = game.backgroundOffset.x
        this.y = game.backgroundOffset.y
        this.tilesX = 70;
        this.tilesY = 40;
        this.zoomLevel = zoomLevel;
        this.tilePx = tilePx;
        this.boundaries = [];
        this.enterBoundaries = [];
        this.interactions = [];
        this.keys = [];
        this.interactionArrays = [this.boundaries, this.enterBoundaries, this.interactions, this.keys];
        this.allBoundaries = []
        this._enterOffset = enterOffset
        this.enterState = enterState
        this.playerTopMargin  = playerTopMargin;
    }
    get enterOffset(){
        return this._enterOffset;
    }
    update({x,y}, input, otherInput){
        this.x = x;
        this.y = y;
        this.interactionArrays.forEach(interactionArray =>{
            if(interactionArray){
                interactionArray.forEach((interactionObject, index) =>{
                    interactionObject.update({x,y}, input, otherInput)
                })
            }
        })
    }
    drawBackground(context){
        context.drawImage(this.backGroundImage, this.x, this.y)
    }
    drawForeground(context){
        context.drawImage(this.foreGroundImage, this.x, this.y)
        this.interactions.forEach(interaction =>{
                interaction.draw(context)
        })
    }
    createInteractionObjects(array){
        array.forEach((category)=> {
            category.data.forEach((tile, index)=>{
                if(tile === category.addedInfo.tileCheck){
                    this[category.addedInfo.pushArray].push(new category.addedInfo.object(this.game, this, index % this.tilesX,  Math.floor(index / this.tilesX), this.tilePx, this.zoomLevel, category.addedInfo))
                }
            })
        })
        this.allBoundaries = this.interactionArrays.filter(array =>{
            return Boundary.prototype.isPrototypeOf(array[0])
        })
    }
}