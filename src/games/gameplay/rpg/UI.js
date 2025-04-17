class TextBox{
    constructor(game,text, x, y){
        this.game = game;
        this.text = text;
        this.baseX = x;
        this.baseY = y;
        this.x = x + this.game.backgroundOffset.x;
        this.y = y + this.game.backgroundOffset.y;
        this.width = 210;
        this.height = 30;
        

    }
    update({x,y}){
        this.x = this.baseX + x;
        this.y = this.baseY + y;
    }
    draw(context){
        context.save();
        const rect = new Path2D();
        context.fillStyle = "white";
        rect.roundRect(this.x-10, this.y-20, this.width, this.height,[10,40])
        context.fill(rect)
        context.fillStyle = "black";
        context.font = "20px monogram";
        context.fillText(this.text, this.x, this.y);
        context.restore();
    }
}

export class InteractButton extends TextBox{
    constructor(game, x, y) {
        super(game, "Press 'Enter' to interact.", x, y)
        this.interaction = "Enter";
    }
}

export class Dialogue{
    constructor(game, handleUpdateText, handleDisplayText){
        this.game = game;
        this.intervalRef;
        this.time = 0;
        this.hideTime = 0;
        this.shown = false;
        this.handleUpdateText = handleUpdateText
        this.handleDisplayText = handleDisplayText
    }
    displayText(text){
        this.hideTime = 0;
        this.shown = true;
        this.handleDisplayText(true);
        let currentText = "";
        let index = 0;
        const intervalRef = setInterval(()=>{
            if(index < text.length){
                currentText += text[index];
                this.handleUpdateText(currentText);
                index++;
                return;
            }
            clearInterval(intervalRef);
        }, 50)
        this.intervalRef = intervalRef;
    }
    hideText(){
        this.shown = false;
        this.time = 0;
        this.handleDisplayText(false);
        this.handleUpdateText("")
        this.index = 0;
        clearInterval(this.intervalRef);
    }
    update(deltaTime){
        if(this.shown) this.time += deltaTime
        else this.hideTime += deltaTime;
    }
}