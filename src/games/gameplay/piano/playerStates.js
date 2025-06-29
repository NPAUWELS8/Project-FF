import{jump, landing, dizzy, hit, air_move, dive_land, rolling, melee} from 'assets/piano'

import { Dust, Fire, Splash } from './particles.js'
import { animations } from './characterAnimations.js'

export const states = {
}

export const keyMap = {
}

class State {
    constructor(state, game){
        this.state = state;
        this.game = game;
        this.speedModifier = 1;
        this.drain = false;
        this.minEnergy = 0;
    }
    addEnum(index){
        states[this.state] = index;
        if(this.key){
            keyMap[this.state] = this.key;
        }
    }
    addKeyToGame(){
        if(this.key && !this.game.keys.includes(this.key)){
            this.game.keys.push(this.key)
        }
    }
    enter(){
        this.game.player.character.updateFrame(this.animation);
        if(this.enterSound) {
            if(this.enterSound.ended) {
                if(this.currentTime) this.enterSound.currentTime = this.currentTime;
                this.enterSound.play();
            }
            else {
                this.enterSound.load();
                if(this.currentTime) this.enterSound.currentTime = this.currentTime;
                this.enterSound.play();
            }
        }
        if(this.recurringSound) this.recurringSound.play();
    }
    exit(){
        if(this.exitSound) {
            if(this.exitSound.ended) this.exitSound.play();
            else {
                this.exitSound.load();
                this.exitSound.play();
            }
        }
        if (this.recurringSound) {
            this.recurringSound.load();
            this.recurringSound.currentTime = this.currentTime;
        }
    }
    handleInput(input){
        if(this.game.standStill){
            this.game.player.setState(states.HIT);
            if(this.game.honeyPots > 0) this.game.honeyPots--
            else this.game.player.loseLife();
        }
    }
}

export class Sitting extends State {
    constructor(game){
        super('SITTING', game);
        this.speedModifier = 0;
        this.animation = game.characterAnimations[animations.SIT];
        this.key = 'ArrowDown'
    }
    handleInput(input){
        if(input.includes('ArrowLeft') || input.includes('ArrowRight')){
            this.game.player.setState(states.RUNNING);
        } else if(input.includes(keyMap.ROLLING)){
            this.game.player.setState(states.ROLLING);
        }
    }
}

export class Running extends State {
    constructor(game){
        super('RUNNING', game);
        this.animation = game.characterAnimations[animations.RUN];
    }
    handleInput(input){
        super.handleInput(input);
        this.game.particles.unshift(new Dust(this.game, this.game.player.x + this.game.player.width * 0.5, this.game.player.y + this.game.player.height));
        if(input.includes(keyMap.SITTING)){
            this.game.player.setState(states.SITTING);
        } else if (input.includes(keyMap.JUMPING)){
            this.game.player.setState(states.JUMPING);
        } else if(input.includes(keyMap.ROLLING)){
            this.game.player.setState(states.ROLLING);
        } else if(input.includes(keyMap.ATTACKING)){
            this.game.player.setState(states.ATTACKING);
        } else if(input.includes(keyMap.IDLE)){
            this.game.player.setState(states.IDLE);
        } else if(input.includes(keyMap.DASHING)){
            this.game.player.setState(states.DASHING);
        } else if(!this.game.player.onGround() && !this.game.player.onPlatform()) this.game.player.setState(states.FALLING);
    }
}

export class Jumping extends State {
    constructor(game){
        super('JUMPING', game);
        this.animation = game.characterAnimations[animations.JUMP];
        this.key = "ArrowUp"
        this.enterSound = new Audio();
        this.enterSound.src = jump;
    }
    enter(){
        if(this.game.player.onGround() || this.game.player.onPlatform()) this.game.player.vy -= 27;
        super.enter();
    }
    handleInput(input){
        super.handleInput(input);
        if(this.game.player.vy > this.game.player.weight){
            this.game.player.setState(states.FALLING);
        } else if(input.includes(keyMap.ROLLING)){
            this.game.player.setState(states.ROLLING);
        } else if (input.includes(keyMap.DIVING)){
            this.game.player.setState(states.DIVING);
        }
    }
}

export class Falling extends State {
    constructor(game){
        super('FALLING', game);
        this.animation = game.characterAnimations[animations.FALL];
        this.exitSound = new Audio();
        this.exitSound.src = landing;
    }
    handleInput(input){
        if(this.game.player.onGround() || this.game.player.onPlatform()){
            this.game.player.setState(states.RUNNING);
        } else if (input.includes(keyMap.DIVING)){
            this.game.player.setState(states.DIVING);
        }
    }
}

export class Rolling extends State {
    constructor(game){
        super('ROLLING',game);
        this.speedModifier = 2;
        this.animation = game.characterAnimations[animations.ROLL];
        this.key = "Space"
        this.invincible = true;
        this.drain = true;
        this.continuousDrain = true;
        this.drainSpeed = 5;
        this.minEnergy = 20;
        this.recurringSound = new Audio();
        this.recurringSound.src = rolling;
        this.recurringSound.loop = true;
        this.recurringSound.volume = 0.2;
        this.currentTime = 0.2;
        this.recurringSound.currentTime = this.currentTime;
    }
    handleInput(input){
        super.handleInput(input);
        this.game.particles.unshift(new Fire(this.game, this.game.player.x + this.game.player.width * 0.5, this.game.player.y + this.game.player.height * 0.5));
        if(!input.includes(keyMap.ROLLING) && this.game.player.onGround()){
            this.game.player.setState(states.RUNNING);
        } else if(!input.includes(keyMap.ROLLING) && !this.game.player.onGround()){
            this.game.player.setState(states.FALLING);
        } else if(input.includes(keyMap.ROLLING) && input.includes(keyMap.JUMPING) && (this.game.player.onGround() || this.game.player.onPlatform())){
            this.game.player.vy -= 27;
        } else if (input.includes(keyMap.DIVING) && !this.game.player.onGround() && !this.game.player.onPlatform()){
            this.game.player.setState(states.DIVING);
        } else if(this.game.player.energy - this.drainSpeed <= 0){
            this.game.player.setState(states.RUNNING);
        }
    }
}

export class Diving extends State {
    constructor(game){
        super('DIVING',game);
        this.speedModifier = 0;
        this.animation = game.characterAnimations[animations.ROLL];
        this.key = "ArrowDown";
        this.invincible = true;
        this.drain = true;
        this.drainSpeed = 10;
        this.exitSound = new Audio();
        this.exitSound.src = dive_land;
        this.exitSound.volume = 0.5;
        this.enterSound = new Audio();
        this.enterSound.src = air_move;
        this.enterSound.volume = 0.2;
    }
    enter(){
        super.enter();
        this.game.player.vy = 15;
    }
    handleInput(input){
        super.handleInput(input);
        this.game.particles.unshift(new Fire(this.game, this.game.player.x + this.game.player.width * 0.5, this.game.player.y + this.game.player.height * 0.5));
        if(!input.includes(keyMap.ROLLING) && (this.game.player.onGround() || this.game.player.onPlatform())){
            this.game.player.setState(states.RUNNING);
            for(let i = 0; i < 30;i++){
                this.game.particles.unshift(new Splash(this.game, this.game.player.x + this.game.player.width * 0.5, this.game.player.y + this.game.player.height))
            }
        } else if(input.includes(keyMap.ROLLING) && (this.game.player.onGround() || this.game.player.onPlatform())){
            this.game.player.setState(states.ROLLING);
            for(let i = 0; i < 30;i++){
                this.game.particles.unshift(new Splash(this.game, this.game.player.x + this.game.player.width * 0.5, this.game.player.y + this.game.player.height))
            }
        }
    }
}

export class Hit extends State {
    constructor(game){
        super('HIT',game);
        this.speedModifier = 0;
        this.animation = game.characterAnimations[animations.HIT];
        this.enterSound = new Audio();
        this.enterSound.src = dizzy
        this.enterSound.defaultPlaybackRate = 1.45;
        this.enterSound.volume = 0.2
    }
    handleInput(input){
        if(this.game.player.character.animationOver() && this.game.standStill){
            this.game.player.setState(states.IDLE);
        } else if(this.game.player.character.animationOver() && this.game.player.onGround()){
            this.game.player.setState(states.RUNNING);
        } else if(this.game.player.character.animationOver() && !this.game.player.onGround()){
            this.game.player.setState(states.FALLING);
        }
    }
    exit(){
        this.enterSound.pause();
        super.exit();
    }
}

export class Dead extends State {
    constructor(game){
        super('DEAD', game);
        this.animation = game.characterAnimations[animations.DEAD];
    }
    handleInput(input){
        if(this.game.player.character.animationOver()){
            this.game.gameOver = true;
        }
    }
}

export class Idle extends State {
    constructor(game){
        super('IDLE', game);
        this.speedModifier = 0;
        this.animation = game.characterAnimations[animations.IDLE];
        this.key = 'KeyW'
    }
    handleInput(input){
        if(input.includes('ArrowLeft') || input.includes('ArrowRight')){
            this.game.player.setState(states.RUNNING);
        } else if(input.includes(keyMap.ROLLING)){
            this.game.player.setState(states.ROLLING);
        }
    }
}

export class Attacking extends State {
    constructor(game){
        super('ATTACKING', game);
        this.animation = game.characterAnimations[animations.ATTACK];
        this.key = 'KeyQ'
        this.speedModifier = 2;
        this.invincible = true;
        this.drain = true;
        this.drainSpeed = 10;
        this.enterSound = new Audio();
        this.enterSound.src = melee;
    }
    handleInput(input){
        super.handleInput(input);
        if(this.game.player.character.animationOver()){
            this.game.player.setState(states.RUNNING)
        }
    }
}

export class Dashing extends State {
    constructor(game){
        super('DASHING', game);
        this.animation = game.characterAnimations[animations.DASH];
        this.key = 'KeyE';
        this.invincible = true;
        this.speedModifier = 3;
        this.drain = true;
        this.drainSpeed = 10;
        this.enterSound = new Audio();
        this.enterSound.src = air_move;
        this.enterSound.playbackRate = 0.5;
        this.enterSound.volume = 0.1;
        this.currentTime = 0.05;
        this.enterSound.currentTime = this.currentTime;
    }
    handleInput(input){
        super.handleInput(input);
        if(this.game.player.character.animationOver()){
            this.game.player.setState(states.RUNNING)
        }
    }
}

export class Smack extends State {
    constructor(game){
        super('SMACK', game);
        this.animation = game.characterAnimations[animations.SMACK];
        this.speedModifier = 0;
        this.enterSound = new Audio();
        this.enterSound.src = hit
    }
    handleInput(input){
        if(this.game.player.character.animationOver() && this.game.player.onGround()){
            this.game.player.setState(states.RUNNING);
        } else if(this.game.player.character.animationOver() && !this.game.player.onGround()){
            this.game.player.setState(states.FALLING);
        }
    }
}

export class RollFalling extends State {
    constructor(game){
        super('ROLL_FALLING', game);
        this.speedModifier = 0;
        this.animation = game.characterAnimations[animations.ROLL];
        this.invincible = true;
    }
    enter(){
        super.enter();
        this.game.player.vy = 1;
    }
    handleInput(input){
        super.handleInput(input);
        this.game.particles.unshift(new Fire(this.game, this.game.player.x + this.game.player.width * 0.5, this.game.player.y + this.game.player.height * 0.5));
        if(!input.includes(keyMap.ROLLING)){
            this.game.player.setState(states.FALLING);
        } else if(input.includes(keyMap.ROLLING) && (this.game.player.onGround() || this.game.player.onPlatform())){
            this.game.player.setState(states.ROLLING);
        }
    }
}