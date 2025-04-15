export const animations = {

}

export class Animation {
    constructor(animation){
        this.animation = animation;
    }
    addEnum(index){
        animations[this.animation] = index;
    }
    addCharacter(character, startFrameX, startFrameY, frameCount){
        this[character] = {startFrameX, startFrameY, frameCount};
    }
    addSound(character, frames, soundSrc){
        // const sound = new Audio();
        // sound.src = soundSrc;
        // this[character].soundPlay = {sound, frames};
        this[character]["soundPlay"] = {};
        frames.forEach(frame =>{
            const sound = new Audio();
            sound.defaultPlaybackRate = 1.45;
            sound.volume = 0.2
            sound.src = soundSrc;
            this[character].soundPlay[frame] = sound
        })
    }
}