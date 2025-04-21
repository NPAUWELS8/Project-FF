/**@type {htmlCanvasElement} */
import { Player } from './player.js'
import { InputHandler } from './input.js'
import { Background } from './background.js'
import { Bee } from './enemies.js'
import { UI } from './UI.js'
import { Animation} from './characterAnimations.js'
import { states } from './playerStates.js'
import { TurningImage } from './turningImage.js'
import { PlatformA, PlatformB } from './platforms.js'
import { Bird, Fish } from './ornaments.js'

export function playPiano(canvas,setGameOver, setWon){
    // const container = document.getElementById('game-container')
    // container.innerHTML = "";
    // const canvas = document.createElement('canvas');
    // canvas.id = "canvas1";
    // container.append(canvas);
    const ctx = canvas.getContext('2d');
    canvas.width = 1333;
    canvas.height = 500;

    class PianoGame{
        constructor(width, height){
            this.width = width;
            this.height = height;
            this.groundMargin = 102;
            this.waterMargin = 40;
            this.speed = 0;
            this.maxSpeed = 3;
            this.background = new Background(this)
            this.characterAnimations = [
                new Animation('IDLE'),
                new Animation('SIT'),
                new Animation('RUN'),
                new Animation('JUMP'),
                new Animation('FALL'),
                new Animation('ROLL'),
                new Animation('HIT'),
                new Animation('DEAD'),
                new Animation('ATTACK'),
                new Animation('SMACK'),
                new Animation('DASH'),
            ]
            this.characterAnimations.forEach((animation, index)=>{
                animation.addEnum(index);
            })
            this.characters = [];
            this.keys = [];
            this.player = new Player(this);
            this.input = new InputHandler(this);
            this.UI = new UI(this);
            this.enemies = [];
            this.platforms = [];
            this.obtainables = [];
            this.turningImages = [];
            this.particles = [];
            this.collisions = [];
            this.floatingMessages = [];
            this.floatingImages = [];
            this.ornaments = [];
            this.maxParticles = 100;
            this.enemyTimer = 0;
            this.enemyInterval = 5000;
            this.platformTimer = 0;
            this.platformInterval = 5000;
            this.ornamentTimer = 0;
            this.ornamentInterval = 5000;
            this.debug = false;
            this.score = 0;
            this.winningScore = 10;
            this.fontColor = 'black';
            this.time = 0;
            this.maxTime = 75000;
            this.gameOver = false;
            this.lives = 3
            this.honeyPots = 0;
            this.honeyScore = 0;
            this.maxHoneyPots = 5;
            this.player.currentState = this.player.states[states[this.player.character.startingState]];
            this.player.currentState.enter();
            this.imageTimer = 0;
            this.imageInterval = (2 + Math.random() * 5) * 1000;
            this.standStill = false;
            this.winConditions = () => [
                this.honeyPots >= this.maxHoneyPots,
                this.score >= this.winningScore,
            ]
        }
        update(deltaTime){
            this.time += deltaTime;
            if(this.time > this.maxTime || this.honeyPots >= this.maxHoneyPots) this.gameOver = true;
            this.background.update();
            this.player.update(this.input.keys, deltaTime);
            //handle enemies
            if(this.enemyTimer > this.enemyInterval){
                this.addEnemy();
                this.enemyTimer = 0;
            } else{
                this.enemyTimer += deltaTime;
            }
            //handle platforms
            if (this.platformTimer > this.platformInterval){
                this.addPlatform();
                this.platformTimer = 0;
            } else{
                this.platformTimer += deltaTime;
            }
            if(this.particles.length > this.maxParticles) {
                this.particles.length = this.maxParticles;
            }
            //handle turning image
            if(this.turningImages.length === 0){
                if(this.imageTimer > this.imageInterval){
                    this.addTurningImage();
                    this.imageTimer = 0;
                    this.imageInterval = (2 + Math.random() * 5) * 1000;
                } else{
                    this.imageTimer += deltaTime;
                }
            }
            //handle ornaments
            if(this.ornamentTimer > this.ornamentInterval){
                this.addOrnament();
                this.ornamentTimer = 0;
            } else{
                this.ornamentTimer += deltaTime;
            }
            //handle arrays
            [
                this.enemies,
                this.platforms,
                this.obtainables,
                this.turningImages,
                this.collisions,
                this.particles,
                this.floatingMessages,
                this.floatingImages,
                this.ornaments
            ].forEach(array =>{
                array.forEach(element =>{
                    element.update(deltaTime);
                })
            })
            //filter out objects to be deleted
            this.enemies = this.enemies.filter(enemy => !enemy.markedForDeletion);
            this.particles = this.particles.filter(particle => !particle.markedForDeletion);
            this.collisions = this.collisions.filter(collision => !collision.markedForDeletion);
            this.floatingMessages = this.floatingMessages.filter(message => !message.markedForDeletion);
            this.turningImages = this.turningImages.filter(image => !image.markedForDeletion);
            this.platforms = this.platforms.filter(platform => !platform.markedForDeletion);
            this.obtainables = this.obtainables.filter(obtainable => !obtainable.markedForDeletion);
            this.floatingImages = this.floatingImages.filter(image => !image.markedForDeletion);
            this.ornaments = this.ornaments.filter(ornament => !ornament.markedForDeletion);
        }
        draw(context){
            this.background.draw(context);
            this.platforms.forEach(platform =>{
                platform.draw(context);
            })
            this.player.draw(context);
            this.enemies.forEach(enemy =>{
                enemy.draw(context);
            })
            this.obtainables.forEach(obtainable=>{
                obtainable.draw(context);
            })
            this.particles.forEach(particle =>{
                particle.draw(context);
            })
            this.collisions.forEach(collision =>{
                collision.draw(context);
            })
            this.turningImages.forEach((image)=>{
                image.draw(context);
            })
            this.floatingMessages.forEach(message =>{
                message.draw(context);
            })
            this.floatingImages.forEach(image =>{
                image.draw(context);
            })
            this.ornaments.forEach(ornament => {
                ornament.draw(context);
            })
            this.UI.draw(context);
        }
        addEnemy(){
            this.enemies.push(new Bee(this))
        }
        addTurningImage(){
            this.turningImages.push(new TurningImage(this));
        }
        isValidKey(input){
            return this.keys.includes(input);
        }
        addPlatform(){
            if (this.speed > 0 ) {
                if(Math.random() > 0.4) this.platforms.push(new PlatformA(this));
                else this.platforms.push(new PlatformB(this));
            };
        }
        addOrnament(){
            if(Math.random() > 0.5) this.ornaments.push(new Fish(this));
            else this.ornaments.push(new Bird(this));
        }
        won(){
            const win = this.winConditions().some(condition =>{
                return condition
            })
            return win
        }
    }
    const game =  new PianoGame(canvas.width, canvas.height);

    let lastTime = 0;

    function animate(timeStamp){
        if(!lastTime) lastTime = timeStamp;
        const deltaTime = timeStamp - lastTime;
        lastTime = timeStamp;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        game.update(deltaTime);
        game.draw(ctx);
        if (!game.gameOver) requestAnimationFrame(animate);
        else {
            if(game.won()){
                setGameOver(true);
                setWon(true);
            } else{
                setGameOver(true);
            }
        }
        // else{
        //     const button = document.createElement('button');
        //     button.innerText = 'Retry';
        //     button.classList.add('magic-button');
        //     if(game.won()) {
        //         button.innerText = 'Continue';
        //         button.id = 'continue'
        //     }
        //     else {
        //         button.id = 'retry-game'
        //         button.innerText = 'Retry';
        //     }
        //     container.append(button);
        // }
    }
    requestAnimationFrame(animate);
}