export class InputHandler{
    constructor(game){
        this.game = game;
        this.game.otherKeys.add("Enter");
        this.movementKeys = [];
        this.otherKeys = [];
        window.addEventListener('keydown',e =>{
            if(this.game.isValidKey(e.code) || this.game.isValidOtherKey(e.code)) e.preventDefault()
            if(this.game.isValidKey(e.code) && !this.movementKeys.includes(e.code)){
                this.movementKeys.push(e.code);
            } else if(this.game.isValidOtherKey(e.code) && !this.otherKeys.includes(e.code)){
                this.otherKeys.push(e.code);
            }
        })
        window.addEventListener('keyup', e =>{
            if(this.game.isValidKey(e.code)){
                this.movementKeys.splice(this.movementKeys.indexOf(e.code),1);
            } else if(this.game.isValidOtherKey(e.code)){
                this.otherKeys.splice(this.otherKeys.indexOf(e.code),1);
            }
        })
    }
}

class MovementKey{
    constructor(axis, operation, state, standState){
        this.axis = axis;
        this.operation = operation;
        this.state = state;
        this.standState = standState;
    }
}

export class MovementObject{
    constructor(game, player){
        this.game = game;
        this.player = player;
    }
    addMovementKeys(code, axis, operation, State, StandState){
        const state = new State(this.game);
        const standState = new StandState(this.game);
        this[code] = new MovementKey(axis, operation, state, standState);
        this.game.keys.add(code);
        this.player.states.push(state, standState)
    }
}