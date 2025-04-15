import {layer1, layer2, layer3, layer4, layer5, layer6} from 'assets/piano'

class Layer {
    constructor(game, width, height, speedModifier, image){
        this.game = game;
        this.width = width;
        this.height = height;
        this.speedModifier = speedModifier;
        this.image = new Image();
        this.image.src = image;
        this.x = 0;
        this.y = 0;
    }
    update(){
        if(this.x < -this.width) this.x = 0;
        else this.x -= this.game.speed * this.speedModifier;
    }
    draw(context){
        context.drawImage(this.image, this.x, this.y, this.width, this.height)
        context.drawImage(this.image, this.x + this.width, this.y, this.width, this.height)
    }
}

export class Background {
    constructor(game){
        this.game = game;
        this.width = 1333;
        this.height = 500;
        this.layer1Image = layer6;
        this.layer2Image = layer5;
        this.layer3Image = layer4;
        this.layer4Image = layer3;
        this.layer5Image = layer2;
        this.layer6Image = layer1;
        this.layer1 = new Layer(this.game, this.width, this.height, 0, this.layer1Image)
        this.layer2 = new Layer(this.game, this.width, this.height, 0.2, this.layer2Image)
        this.layer3 = new Layer(this.game, this.width, this.height, 0.4, this.layer3Image)
        this.layer4 = new Layer(this.game, this.width, this.height, 0.8, this.layer4Image)
        this.layer5 = new Layer(this.game, this.width, this.height, 1, this.layer5Image)
        this.layer6 = new Layer(this.game, this.width, this.height, 1.2, this.layer6Image)
        this.backgroundLayers = [this.layer1, this.layer2, this.layer3, this.layer4, this.layer5, this.layer6];
    }
    update(){
        this.backgroundLayers.forEach(layer =>{
            layer.update();
        })
    }
    draw(context){
        this.backgroundLayers.forEach(layer =>{
            layer.draw(context);
        })
    }
}