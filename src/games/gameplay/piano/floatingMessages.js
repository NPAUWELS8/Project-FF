class FloatingObject {
    constructor(x, y, targetX, targetY){
        this.x = x;
        this.y = y;
        this.targetX = targetX;
        this.targetY = targetY;
        this.markedForDeletion = false;
        this.timer = 0;
        this.slowRate = 0.03;
        this.maxTime = 100;
    }
    update(){
        this.x += (this.targetX - this.x) * this.slowRate;
        this.y += (this.targetY - this.y) * this.slowRate;
        this.timer++
    }
}


export class FloatingMessage extends FloatingObject{
    constructor(value, x, y, targetX, targetY){
        super(x, y, targetX, targetY);
        this.value = value;
    }
    update(){
        super.update();
        if(this.timer > this.maxTime) this.markedForDeletion = true;
    }
    draw(context){
        context.font = '20px Bangers'
        context.fillStyle = 'white';
        context.fillText(this.value, this.x, this.y);
        context.fillStyle = 'black';
        context.fillText(this.value, this.x + 2, this.y + 2);
    }
}

export class FloatingImage extends FloatingObject {
    constructor(game, imageObject, x, y, targetX, targetY){
        super(x, y, targetX, targetY);
        this.game = game;
        this.image = imageObject.image;
        this.width = imageObject.width;
        this.height = imageObject.height;
        this.maxTime = 200;
    }
    update(){
        super.update()
        if(this.timer > this.maxTime) {
            this.markedForDeletion = true;
            this.game.honeyPots++;
        }
    }
    draw(context){
        context.drawImage(this.image, this.x, this.y, this.width, this.height);
    }
}