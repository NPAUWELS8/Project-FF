import { HoneyPot } from './obtainables.js'
import { lives, honeypot} from 'assets/piano'

export class UI {
    constructor(game){
        this.game = game;
        this.fontSize = 30;
        this.fontFamily = 'Bangers';
        this.margin = 20;
        this.livesImage = new Image();
        this.livesImage.src = lives;
        this.honeypotImage = new Image();
        this.honeypotImage.src = honeypot;
        this.lives = new Lives(this.margin, 95, this.livesImage)
        this.honeyPots = new HoneyPots(this.margin, 120, this.honeypotImage);
        this.score = new TextObject(this.game, this, 1, 50, 'Score');
        this.time = new TextObject(this.game, this, 1, 80, 'Time');
        this.energyBar = new EnergyBar(this.game, this.margin, 150);
    }
    draw(context){
        context.save()
        context.font = `${this.fontSize}px ${this.fontFamily}`;
        context.textAlign = 'left';
        //score
        this.score.draw(context, this.game.score);
        //timer
        this.time.draw(context, (this.game.time * 0.001).toFixed(1));
        //energy bar
        this.energyBar.draw(context);
        //lives
        for (let i = 0; i < this.game.lives;i++){
            context.drawImage(this.lives.image, this.lives.getX(i), this.lives.y, this.lives.width, this.lives.height);
        }
        //honey pots
        for (let i = 0; i < this.game.honeyPots; i++){
            context.drawImage(this.honeyPots.image, this.honeyPots.getX(i), this.honeyPots.y, this.honeyPots.width, this.honeyPots.height)
        }
        //game over message
        context.fillStyle = this.game.fontColor;
        if (this.game.gameOver){
            if(this.game.won()){
                this.endText(context, 'You Win!', "Winnie's enjoying a good cup of honey!");
            } else{
                this.endText(context, 'Bad luck, Honey!', "Winnie's not happy.");
            }
            
        }
        context.restore()
    }
    endText(context, title, text){
        context.textAlign = 'center';
        context.font = `${this.fontSize * 2}px ${this.fontFamily}`;
        context.fillText(title, this.game.width * 0.5, this.game.height * 0.5 - 20);
        context.font = `${this.fontSize * 0.7}px ${this.fontFamily}`;
        context.fillText(text, this.game.width * 0.5, this.game.height * 0.5 + 20);
    }
}

class TextObject {
    constructor(game, ui, sizeRatio, y, title){
        this.game = game;
        this.sizeRatio = sizeRatio;
        this.ui = ui
        this.fontSize = this.ui.fontSize * this.sizeRatio;
        this.x = this.ui.margin;
        this.y = y;
        this.title = title;
        this.fillStyle = this.game.fontColor
        this.shadowX = this.x + 2;
        this.shadowY = this.y + 2;
    }
    draw(context, text){
        context.fillStyle = 'black';
        context.font = `${this.fontSize}px ${this.fontFamily}`;
        context.fillText(`${this.title}: ${text}`, this.x, this.y);
        context.fillStyle = 'white'
        context.fillText(`${this.title}: ${text}`, this.shadowX, this.shadowY);
    }
}

class UIObject {
    constructor(xMargin, y, image) {
        this.xMargin = xMargin;
        this.y = y;
        this.width = 25;
        this.height = 25;
        this.image = image;
    }
    getX(count){
        return this.width * count + this.xMargin
    }
}

class HoneyPots extends UIObject {
    constructor(xMargin, y, image) {
        super(xMargin, y, image)
        this.object = new HoneyPot();
        this.width = this.object.width;
        this.height = this.object.height;
    }
}

class Lives extends UIObject{
    constructor (xMargin, y, image){
        super(xMargin, y, image)
    }
}
class EnergyBar {
    constructor(game, x, y) {
        this.game = game;
        this.y = y;
        this.x = x;
        this.border = 2
        this.barX = x + this.border;
        this.barY = y + this.border;
        this.barHeight = 10;
        this.borderColor = 'white';
        this.barColor = 'black';
        this.width = this.game.player.energy + this.border * 2;
        this.height = this.barHeight + this.border * 2;
        this.refill = 5
    }
    draw(context){
        context.fillStyle = this.borderColor;
        context.fillRect(this.x, this.y, this.width, this.height);
        context.fillStyle = this.barColor;
        context.fillRect(this.barX, this.barY, this.game.player.energy, this.barHeight);
    }

}