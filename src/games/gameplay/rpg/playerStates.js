export const states = {};

class State {
    constructor(state, game){
        this.name = state;
        this.game = game;
        this.startFrameX = 0;
    }
    addEnum(index){
            states[this.name] = index;
        }
    enter(){
        this.game.player.updateFrame(this.frameY, this.startFrameX, this.spriteCount)
    }
    handleInput(input){
            if(input[0] && !this.game.player.frozen){
                this.game.player.setPlayerState(input)
            }
    }
}

export class RunUp extends State {
    constructor(game){
        super("RUNUP", game);
        this.spriteCount = 4;
        this.frameY = 0;
        this.startFrameX = 1;
    }
    handleInput(input){
        if(input[0] !== "ArrowUp") this.game.player.setState(states.STANDUP)
    }
}

export class StandUp extends State{
    constructor(game){
        super("STANDUP", game);
        this.spriteCount = 1;
        this.frameY = 0;
    }
}

export class RunDown extends State {
    constructor(game){
        super("RUNDOWN", game);
        this.spriteCount = 4;
        this.frameY = 1;
        this.startFrameX = 1;
    }
    handleInput(input){
        if(input[0] !== "ArrowDown") this.game.player.setState(states.STANDDOWN)
    }
}

export class StandDown extends State {
    constructor(game){
        super("STANDDOWN", game);
        this.spriteCount = 1;
        this.frameY = 1;
    }
}

export class RunLeft extends State {
    constructor(game){
        super("RUNLEFT", game);
        this.spriteCount = 4;
        this.frameY = 2;
        this.startFrameX = 1;
    }
    handleInput(input){
        if(input[0] !== "ArrowLeft") this.game.player.setState(states.STANDLEFT)
    }
}

export class StandLeft extends State {
    constructor(game){
        super("STANDLEFT", game);
        this.spriteCount = 1;
        this.frameY = 2;
    }
}

export class RunRight extends State {
    constructor(game){
        super("RUNRIGHT", game);
        this.spriteCount = 4;
        this.frameY = 3;
        this.startFrameX = 2;
    }
    handleInput(input){
        if(input[0] !== "ArrowRight") this.game.player.setState(states.STANDRIGHT)
    }
}

export class StandRight extends State {
    constructor(game){
        super("STANDRIGHT", game);
        this.spriteCount = 1;
        this.frameY = 3;
        this.startFrameX = 1;
    }

}