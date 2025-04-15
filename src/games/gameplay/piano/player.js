import { Sitting, Running, Jumping, Falling, Rolling, Diving, Hit, Dead, Idle, Attacking, Dashing, Smack, RollFalling  } from './playerStates.js'
import { CollisionAnimation } from './collisionAnimation.js'
import { FloatingMessage, FloatingImage } from './floatingMessages.js';
import { Dog, HoneyBear} from './characters.js'
import { states } from './playerStates.js'
export class Player{
    constructor(game){
        this.game = game;
        this.width = 100
        this.height = 91.3
        this.x = 0;
        this.y = this.game.height - this.height - this.game.groundMargin;
        this.vy = 0;
        this.weight = 1;
        // this.image = player; //get image element by id
        this.frameX = 0;
        this.frameY = 0;
        this.maxFrame;
        this.fps = 20;
        this.frameInterval = 1000 / this.fps;
        this.frameTimer = 0;
        this.speed = 0;
        this.maxSpeed = 10;
        this.maxEnergy = 100;
        this.energy = this.maxEnergy;
        this.energyFillTime  = 5
        this.energyInterval = 1000 / this.energyFillTime;
        this.energyFillTimer = 0;
        this.states = [new Sitting(this.game), new Running(this.game), new Jumping(this.game), new Falling(this.game), new Rolling(this.game), new Diving(this.game), new Hit(this.game), new Dead(this.game), new Idle(this.game), new Attacking(this.game), new Dashing(this.game), new Smack(this.game), new RollFalling(this.game)];
        this.states.forEach((state,index) =>{
            state.addEnum(index);
            state.addKeyToGame();
        })
        this.currentState = null;
        // this.character = new Dog(this.game, this, "SITTING")
        this.character = new HoneyBear(this.game, this, "IDLE");
        this.sideDetectionStateRules = () => [
            this.currentState !== this.states[states.IDLE],
            this.currentState !== this.states[states.ROLL_FALLING],
            this.currentState !== this.states[states.FALLING]
        ]
    }
    update(input, deltaTime){
        this.energyHandling(deltaTime);
        this.checkCollisions();
        this.currentState.handleInput(input);
        //horizontal movement
        this.x += this.speed;
        if(input.includes('ArrowRight') && this.currentState !== this.states[states.HIT]) this.speed = this.maxSpeed;
        else if(input.includes('ArrowLeft') && this.currentState !== this.states[states.HIT]) this.speed = -this.maxSpeed;
        else this.speed = 0;
        //horizontal boundaries;
        if (this.x < 0 ) this.x = 0;
        if (this.x > this.game.width - this.width) this.x = this.game.width - this.width;
        //vertical movement
        this.y += this.vy;
        if (this.inRoof()) this.headBump(0 - this.character.topMargin);
        else if(!this.onGround()) this.vy += this.weight;
        else this.vy = 0;
        //vertical boundaries
        if (this.y > this.game.height - this.height - this.game.groundMargin) this.y = this.game.height - this.height - this.game.groundMargin;
        //platform boundaries
        this.checkPlatform()
        //sprite animation
        this.character.update(deltaTime);
    }
    draw(context){
        // if(this.game.debug) context.strokeRect(this.x, this.y, this.character.width, this.character.height);
        if(this.game.debug) this.drawDebug(context, this.character.returnCoordinates(this.x, this.y));
        this.character.draw(context);
    }
    drawDebug(context, {x, y, width, height}){
        context.strokeRect(x, y, width, height);
    }
    onGround(){
        return this.y >= this.game.height - this.height - this.game.groundMargin;
    }
    onPlatform(){
        return this.game.platforms.some((platform) =>{
            return platform.onPlatformDetection(this.vy, this.character.returnCoordinates(this.x, this.y));
        })
    }
    inRoof(){
        return this.y < 0 - this.character.topMargin;
    }
    setState(state){
        //check if animation for state exists for this character
        const isExisting = this.states[state].animation[this.character.name];
        if(isExisting && this.states[state].minEnergy < this.energy){
            this.currentState = this.states[state]
            this.game.speed = this.game.maxSpeed * this.currentState.speedModifier;
            this.currentState.enter();
        }
    }
    headBump(y){
        this.vy = 1;
        this.y = y;
    }
    loseLife(){
        this.game.lives--;
        if(this.game.lives <= 0 ) this.setState(states.DEAD) 
    }
    checkCollisions(){
        this.game.enemies.forEach(enemy =>{
            if(this.collisionHandle(enemy, this.character.returnCoordinates(this.x, this.y))){
                enemy.markedForDeletion = true;
                this.game.collisions.push(new CollisionAnimation(this.game, enemy.x + enemy.width * 0.5, enemy.y + enemy.height * 0.5))
                if(this.currentState.invincible){
                    this.game.score++
                    this.game.floatingMessages.push(new FloatingMessage('+1',enemy.x, enemy.y, 150, 50))
                } else{
                    if(Math.random()<0.5) this.setState(states.HIT);
                    else this.setState(states.SMACK);
                    this.game.score -=1;
                    this.loseLife();
                }
            }
        })
        this.game.obtainables.forEach(obtainable => {
            if(this.collisionHandle(obtainable, this.character.returnCoordinates(this.x, this.y))){
                obtainable.markedForDeletion = true;
                this.game.collisions.push(new CollisionAnimation(this.game, obtainable.x + obtainable.width * 0.5, obtainable.y + obtainable.height * 0.5))
                this.game.score += obtainable.score;
                this.game.floatingImages.push(new FloatingImage(this.game, obtainable, obtainable.x, obtainable.y, this.game.UI.honeyPots.getX(this.game.honeyScore), this.game.UI.honeyPots.y))
                this.game.honeyScore++
            }
        })
    }
    collisionHandle(object, {x, y, width, height}){
        return  object.x < x + width &&
                object.x + object.width > x &&
                object.y < y + height &&
                object.y + object.height > y
    }
    inPlatformStateCheck(){
        return this.sideDetectionStateRules().every(rule => rule)
    }
    checkPlatform(){
        this.game.platforms.forEach((platform) => {
            if(platform.inPlatformDetection(this.inPlatformStateCheck(), this.character.returnCoordinates(this.x, this.y))){
                if(this.currentState === this.states[states.ROLLING] && !this.onGround()) this.setState(states.ROLL_FALLING);
                else if(this.currentState !== this.states[states.ROLLING] && !this.onGround()) this.setState(states.FALLING)
                else this.setState(states.IDLE);
                return
            }

            //walk on platform
            if (platform.onPlatformDetection(this.vy, this.character.returnCoordinates(this.x, this.y))) {
                this.vy = 0;
                this.y = platform.top - this.character.height;
                return;
            }
            
            //jump into platform
            if (platform.underPlatformDetection(this.vy, this.character.returnCoordinates(this.x, this.y))) {
                this.headBump(platform.y + platform.height - this.character.topMargin);
            };
          });
    }
    energyHandling(deltaTime){
        if(this.currentState.drain && !this.currentState.continuousDrain && this.character.animationOver()) this.drainEnergy();
        else if(this.currentState.continuousDrain) this.contDrainEnergy(deltaTime);
        else if(!this.currentState.drain) this.fillEnergy(deltaTime);
    }
    drainEnergy(){
        if(this.energy - this.currentState.drainSpeed < 0) this.energy = 0;
        else this.energy -= this.currentState.drainSpeed;
    }
    contDrainEnergy(deltaTime){
        if(this.energyFillTimer >= this.energyInterval){
            if(this.energy > 0 ){
                this.energy -= this.currentState.drainSpeed;
                this.energyFillTimer = 0;
            }
        } else this.energyFillTimer += deltaTime
    }
    fillEnergy(deltaTime){
        if(this.energyFillTimer >= this.energyInterval){
            if(this.energy < this.maxEnergy){
                this.energy++
                this.energyFillTimer = 0;
            }
        } else this.energyFillTimer += deltaTime
    }
}