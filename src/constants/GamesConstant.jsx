import { PianoGame, RpgGame, SudokuGame, MemoryGame  } from "games"
import { AppContext } from "contexts/AppContext";
import { LockOpenIcon, SparklesIcon, PuzzlePieceIcon, PlayIcon, RocketLaunchIcon, TrophyIcon, StarIcon, LightBulbIcon, CheckCircleIcon } from '@heroicons/react/24/solid'
import * as data from 'constants/houses.json' with {type: "json" }

import { Link } from 'react-router-dom';
import { useContext } from "react";

export const videoIds = [
    "Pih2mlC1duE",
    "_vMIr3_Lbjg",
    "0MTkODK1hzg",
    "acY_V1stn54",
    "ywH2C6KVFno",
    "kXHNAWshbSc",
    "9yF0BMb5OT0",
    "QejkDjEgbr0",
    "h87prLIH7YE"
]

const houses = data.default.houses

const InfoBox = ({text, link, btnText, title})=>{
    const context = useContext(AppContext);
    
    function onClickHandle(){
        context.setIsAfterGameComplete(false);
    }

    const iconArray = [
        // (<LockOpenIcon aria-hidden="true" className="size-6 text-amber-600" />),
        (<SparklesIcon aria-hidden="true" className="size-6 text-amber-600" />),
        (<PuzzlePieceIcon aria-hidden="true" className="size-6 text-amber-600" />),
        (<PlayIcon aria-hidden="true" className="size-6 text-amber-600" />),
        (<RocketLaunchIcon aria-hidden="true" className="size-6 text-amber-600" />),
        (<TrophyIcon aria-hidden="true" className="size-6 text-amber-600" />)
    ]
    
    return (
    <div className="info-box neo-brutalism-magic">
        <p className="font-medium sm:text-xl text-center hover:cursor-default">{text}</p>
        {context.getIsGameFinished(title) ? <div className="bg-white border-3 border-amber-500 mx-auto flex w-[90%] items-center justify-center gap-3 rounded-lg px-6 py-3 text-center font-semibold text-amber-500 sm:w-1/2"><CheckCircleIcon aria-hidden="true" className="size-6 text-amber-600" /><p>COMPLETED!</p></div> :
        <Link to={link} onClick={onClickHandle} className="neo-brutalism-white-button neo-btn-magic bg-white hover:bg-amber-50 hover:scale-110 active:bg-amber-100 active:scale-95">
            {btnText}
            {iconArray[Math.floor(Math.random()* iconArray.length)]}
        </Link>
        }
    </div>
    )
}

class InfoBoxes{
    constructor(){
        this.boxCount = 0;
        this.firstRadial = 4.25;
        this.areaPercentage = 0.5; //the percentage of the radial area that the box will be shown
        this.boxes = [];
        this.games = [];
        this.maxRadial = 2 * Math.PI;
        this.radial = 0;
        this.area = 0;
    }
    addGame(obj){
        const game = new Game(obj);
        this.games.push(game);
        this.boxes.push(game);
    }
    addBox(obj){
        this.boxes.push(new Box(obj))
    }
    #addCount(){
        this.boxCount = this.boxes.reduce((acc, _game, _index)=> acc + 1, this.boxCount);
    }
    addRadialDivision(){
        this.#calculateRadialDivision();
        this.boxes.forEach((box, index) =>{
            if(index === 0){
                box.lowRange = this.firstRadial;
            }
            else{
                box.lowRange = this.#normalizeRotation(this.firstRadial + (this.radial * index));
                
            }
            box.highRange = this.#normalizeRotation(box.lowRange + this.area);
            box.index = index + 1;
        })
    }
    #calculateRadialDivision(){
        this.#addCount();
        this.radial = this.maxRadial / this.boxCount;
        this.area = this.radial * this.areaPercentage;
    }
    #normalizeRotation(rotation){
        return rotation % (2 * Math.PI);
    }
   
}

class Box {
    constructor({infoBox}){
        this.infoBox = infoBox;
    }
}

const Controls = ({controlArray}) =>{
    const controls = controlArray.map((control,index)=>
        // <div key={index} className="flex flex-row">{icon}<p><b>{control.key}</b>{`: ${control.action}`}</p></div>
        <p key={index} className="parchment-p text-3xl"><b>{control.key}</b>{`: ${control.action}`}</p>
    )
    return <>{controls}</>
}

const BasicControls = ({controlArray,icon}) =>{
    const controls = controlArray.map((control,index)=>
        <div key={index} className="flex flex-row">{icon}<p><b>{control.key}</b>{`: ${control.action}`}</p></div>
    )
    return <>{controls}</>
}

const IntroText = ({introArray}) =>{
    const intro = introArray.map((introText, index)=>{
        const splitArray = introText.split("\n");
        const newText = splitArray.map((text, index, array)=>{
            if(index === 0){
                return (<p key={index}>{text}<br/></p>)
            }
            else {
                return (<p key={index} className="ml-20">{text}
                            {index < array.length -1 && <br/>}
                        </p>)
            }
        })
        return (<div key={index} className="parchment-descr text-4xl">{newText}</div>)
    }
    )

    return <>{intro}</>
}

class Game{
    constructor({trial, trialText, title, introArray, infoBoxText, link, infoBoxBtnText, controlArray, element, listIcon, url}){
        this.trial = trial;
        this.trialTitle = trial.split(" ").slice(2).join(" ").toUpperCase();
        this.trialText = trialText;
        this.title = title;
        this.introText = <IntroText
                introArray={introArray}
            />;
        this.infoBox = <InfoBox
                text={infoBoxText}
                link={link}
                btnText={infoBoxBtnText}
                title={title}
            />;
        this.controls = <Controls
                controlArray = {controlArray}
            />
        this.basicControls = <BasicControls
                controlArray = {controlArray}
                icon = {listIcon}
            />
        this.url = url
        this.gamePowerHouse = this.#addGamePowerHouse(houses)
        this.element = (extraProps) => element(this, extraProps);
        
    }
    #addGamePowerHouse(array){
        const result = array.filter((house)=>house.powerGameUrl === this.url)[0]
        return result ? result.name : null;
    }
}

const infoBoxes = new InfoBoxes();
infoBoxes.addBox({
    infoBox: (
        <div className="hover:cursor-default neo-brutalism-magic py-4 px-8 text-white mx-5">
            <div className="sm:text-xl sm:leading-snug text-center">
                <h1>
                Hi, Welcome to <span className="font-semibold">FF</span> 🧹
                </h1>
            </div>
            <br/>
            To fly around the house:
            <br/>
            1. Drag the screen with your mouse
            <br/>
            2. Or use the left and right arrows.
            <br/>
            <br/>
            You'll find games along the way. 🧹
        </div>
    )
})
//TODO: add extra intro information and dubbel check controlarray on completeness of information
infoBoxes.addGame({
    trial: "Trial of Patience",
    trialText: "For even the strongest magic falters without understanding.",
    title: "1 2 3 Piano",
    introArray: [
        "Collect honey pots whilst avoiding bees and the turning picture.\nYou have 180 seconds and 3 lives to collect 5 honey pots and complete the challenge.",
        "Make sure you're not moving when the picture is turned (press 'Z').\nYou can start moving again when it's moving upwards. Floor will take away a collected honey pot if you're moving while she's looking.",
        "Bees can't hit you while you are:\n1) Rolling ('Space')\n2) Diving ('Arrow Down')\n3) Doing a slash ('E')\n4) Or doing a dash ('A')"
    ],
    infoBoxText: "This game is a twist on the '1, 2, 3 piano' game.",
    link: "/games/piano",
    infoBoxBtnText: "1, 2, 3, let's play!",
    controlArray: [
        {key: "Arrow Left", action: "Move left"},
        {key: "Arrow Right", action: "Move right"},
        {key: "Arrow Up", action: "Jump"},
        {key: "Arrow Down", action: "Dive"},
        {key: "Space", action: "Roll"},
        {key: "E", action: "Slash"},
        {key: "A", action: "Dash"},
        {key: "Z", action: "Stand Idle"},
    ],
    listIcon: (<StarIcon aria-hidden="true" className="size-6 text-amber-600 mr-5" />),
    element: ({title, gamePowerHouse}, extraProps) => (<PianoGame title={title} gamePowerHouse={gamePowerHouse} extraProps={extraProps}/>),
    url: "piano"
})

infoBoxes.addGame({
    trial: "Trial of the Seeker",
    trialText: "You must search with perseverance and heart, for that which is precious is not always in plain sight.",
    title: "Find My Phone",
    introArray:["Floor and Niels want to leave the island by boat...\nHowever, Floor just realized she lost her phone. Look for the phone before finding the boat." ,"Tip: You can enter the house."],
    infoBoxText:"Floor lost her phone, help her find it!",
    link:"/games/findmyphone",
    infoBoxBtnText:"Let's go looking!",
    controlArray: [
        {key: "Arrow Left", action: "Move left"},
        {key: "Arrow Right", action: "Move right"},
        {key: "Arrow Up", action: "Move Up"},
        {key: "Arrow Down", action: "Move Down"},
    ],
    listIcon: (<PlayIcon aria-hidden="true" className="size-6 text-amber-600 mr-5"/>),
    element: ({title, gamePowerHouse}, extraProps) => (<RpgGame title={title} gamePowerHouse={gamePowerHouse} extraProps={extraProps}/>),
    url: "findmyphone"
})

infoBoxes.addGame({
    trial: "Trial of Puzzles",
    trialText:"Your wits shall be tested, for the Philosofloor’s Stone reveals itself only to those who can weave logic with imagination.",
    title: "Sudoku",
    introArray:["It's just a classic sudoku game."],
    infoBoxText:"Some people say Floor loves sudoku. Good luck!",
    link:"/games/sudoku",
    infoBoxBtnText:"Sudoku away!",
    controlArray:[
        {key: "Click empty square", action: "Start Typing"},
        {key: "Check button", action: "Check your solution"},
        {key: "Reset button", action: "Reset your solution"},
        {key: "Regenerate button", action: "Regenerate a completly new sudoku"},
    ],
    listIcon: (<PuzzlePieceIcon aria-hidden="true" className="size-6 text-amber-600 mr-5"/>),
    element: ({title, gamePowerHouse}, extraProps) => (<SudokuGame title={title} gamePowerHouse={gamePowerHouse} extraProps={extraProps}/>),
    url:"sudoku"
})
infoBoxes.addGame({
    trial: "Trial of Memories",
    trialText: "You will be asked to recall the moments that shaped your journey, for love is built upon the tapestry of shared pasts.",
    title: "Memory",
    introArray:["This is a Memory game. Subsequently click two equal cards to remove them from the game."],
    infoBoxText:"This will bring back old memories, you'll see!",
    link:"/games/memory",
    infoBoxBtnText:"Let's memorize!",
    controlArray:[
        {key: "Click a card", action: "Card turns around"},,
    ],
    listIcon: (<LightBulbIcon aria-hidden="true" className="size-6 text-amber-600 mr-5"/>),
    element: ({title, gamePowerHouse}, extraProps) => (<MemoryGame title={title} gamePowerHouse={gamePowerHouse} extraProps={extraProps}/>),
    url:"memory"
})


infoBoxes.addRadialDivision();
export const games = infoBoxes.games;
export const boxes = infoBoxes.boxes;
