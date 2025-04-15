export class InputHandler{
    constructor(game){
        this.game = game;
        this.game.keys.push('ArrowLeft');
        this.game.keys.push('ArrowRight');
        this.keys = [];
        window.addEventListener('keydown',e =>{
            if(this.game.isValidKey(e.code) && !this.keys.includes(e.code)){
                this.keys.push(e.code);
            } else if (e.code === "KeyD") this.game.debug = !this.game.debug;
        })
        window.addEventListener('keyup', e =>{
            if(this.game.isValidKey(e.code)){
                this.keys.splice(this.keys.indexOf(e.code),1);
            }
        })
    }
}