import { Background } from "./background.js"
import { Player } from "./player.js"
import { Dialogue } from "./UI.js"
import { InputHandler } from './input.js'
import { Boundary, EnterBoundary, Interaction, BoatInteraction } from './interactionObjects.js'
import * as data from './collisions/island_boundary.json' with {type: "json" }
import * as data2 from './collisions/interior_boundary.json' with {type: "json"}

import { intBgMap, intFgMap, outBgMap, outFgMap } from 'assets/rpg'

export function playRpg(canvas, setGameOver, handleUpdateText, handleDisplayText, handleOverlay, gameSize){
    const [gameWidth, gameHeight] = gameSize
    const ctx = canvas.getContext('2d');
    canvas.width = gameWidth;
    canvas.height = gameHeight;
    const dataObject = data.default
    const dataObject2 = data2.default

    class RPGGame{
        constructor(width, height){
            this.width = width;
            this.height = height;
            this.keys = new Set();
            this.otherKeys = new Set();
            this.player = new Player(this)
            this.backgroundOffset = {x: -1120, y: -620}
            this.islandBackground = new Background(this, outBgMap, outFgMap, 4, 12, {x:-1345 + this.width/2, y: -820 + this.height/2 + this.player.height/2}, "STANDDOWN", 30);
            this.houseBackground = new Background(this, intBgMap, intFgMap, 3, 16,{x:-1344 + this.width/2, y: -864 + this.height/2 + this.player.height/2}, "STANDRIGHT", 45);
            this.houseMap = [
                {
                    name: "Tv",
                    text: "Test tv Test tv Test tv Test tv Test tv Test tv Test tv Test tv Test tv Test tv Test tv ",
                    tileCheck: 1210,
                    object: Interaction,
                    pushArray: "interactions"
                },
                {
                    name: "Bed",
                    text: "Test bed",
                    tileCheck: 1210,
                    object: Interaction,
                    pushArray: "interactions"
                },
                {
                    name: "Computer",
                    text: "Test Computer",
                    tileCheck: 1210,
                    object: Interaction,
                    pushArray: "interactions"
                },
                {
                    name: "Sofa",
                    text: "Test Sofa",
                    tileCheck: 1210,
                    object: Interaction,
                    pushArray: "interactions"
                },
                {
                    name: "Bookshelve",
                    text: "Test Bookshelve",
                    key: true,
                    tileCheck: 1210,
                    object: Interaction,
                    pushArray: "interactions"
                },
                {
                    name: "Exit house",
                    enter: this.islandBackground,
                    tileCheck: 1210,
                    object: EnterBoundary,
                    pushArray: "enterBoundaries",
                    handleOverlay: handleOverlay
                },
                {
                    name: "Collision",
                    tileCheck: 1210,
                    object: Boundary,
                    pushArray: "boundaries"
                }
            ]
            this.house = createInteractions(dataObject2.layers, this.houseMap);
            this.islandMap = [
                {
                    name: "Enter house",
                    enter: this.houseBackground,
                    tileCheck: 1025,
                    object: EnterBoundary,
                    pushArray: "enterBoundaries",
                    handleOverlay: handleOverlay
                },
                {
                    name: "Collision",
                    tileCheck: 1025,
                    object: Boundary,
                    pushArray: "boundaries"
                },
                {
                    name: "Boat",
                    text: "Test Boat",
                    congratsText: "You made it to the island!",
                    tileCheck: 1025,
                    object: BoatInteraction,
                    pushArray: "interactions"
                }
            ]
            this.island = createInteractions(dataObject.layers, this.islandMap);
            this.background = this.islandBackground;
            this.islandBackground.createInteractionObjects(this.island)
            this.boundaries = this.islandBackground.boundaries
            this.enterBoundary = this.islandBackground.enterBoundaries
            this.houseBackground.createInteractionObjects(this.house);
            this.input = new InputHandler(this);
            this.gameOver = false;
            this.dialogue = new Dialogue(this.game, handleUpdateText, handleDisplayText)
            this.keyFound = false;
        }
        update(deltaTime){
            this.time += deltaTime;
            this.player.update(this.input.movementKeys, deltaTime, this.input.otherKeys)
            this.background.update(this.backgroundOffset, this.input.movementKeys, this.input.otherKeys);
            this.dialogue.update(deltaTime);
        }
        draw(context){
            this.background.drawBackground(context);
            this.player.draw(context);
            this.background.drawForeground(context);
        }
        isValidKey(input){
            return this.keys.has(input);
        }
        isValidOtherKey(input){
            return this.otherKeys.has(input);
        }
    }

    const game =  new RPGGame(canvas.width, canvas.height);

    let lastTime = 0;

    function animate(timeStamp){
        if(!lastTime) lastTime = timeStamp;
        const deltaTime = timeStamp - lastTime;
        lastTime = timeStamp;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        game.update(deltaTime);
        game.draw(ctx);
        if (!game.gameOver) requestAnimationFrame(animate)
        else{
            setGameOver(true);
        }
    }
    requestAnimationFrame(animate);
}

function createInteractions(array, objArray){
    const interactions = array.filter(layer => objArray.find(textObject => textObject.name === layer.name))
    const interactionMap = interactions.map(interaction => interaction.name)
    objArray.forEach(obj => interactions[interactionMap.indexOf(obj.name)].addedInfo = obj)
    return interactions
}