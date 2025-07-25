import { PianoGame, RpgGame, SudokuGame, MemoryGame  } from "games"
import { AppContext } from "contexts/AppContext";
import { LockOpenIcon, SparklesIcon, PuzzlePieceIcon, PlayIcon, RocketLaunchIcon, TrophyIcon, StarIcon, LightBulbIcon, CheckCircleIcon } from '@heroicons/react/24/solid'

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


const InfoBox = ({text, link, btnText, title})=>{
    const context = useContext(AppContext);
    
    function onClickHandle(){
        context.setIsAfterGameComplete(false);
    }

    const iconArray = [
        (<LockOpenIcon aria-hidden="true" className="size-6 text-amber-600" />),
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
        <Link to={link} onClick={onClickHandle} className="neo-brutalism-white neo-btn-magic">
            {btnText}
            {iconArray[Math.floor(Math.random()*iconArray.length + 1)]}
        </Link>
        }
    </div>
    )
}

class InfoBoxes{
    constructor(){
        this.boxCount = 0;
        this.firstRadial = 4.25;
        this.areaPercentage = 0.35; //the percentage of the radial area that the box will be shown
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
        this.boxCount = this.boxes.reduce((acc, game, index)=> acc + 1, this.boxCount);
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

//TODO: fix longer control explanation to get smaller than other control explanations when screen is very small (e.g. for the sudoku game)
const Controls = ({controlArray,icon}) =>{
    const controls = controlArray.map((control,index)=>
        // <div key={index} className="flex flex-row">{icon}<p><b>{control.key}</b>{`: ${control.action}`}</p></div>
        <p key={index} className="parchment-p text-3xl"><b>{control.key}</b>{`: ${control.action}`}</p>
    )
    return <>{controls}</>
}

const IntroText = ({introArray}) =>{
    const intro = introArray.map((introText, index)=>
        <p key={index} className="parchment-descr text-4xl">{introText}</p>
    )

    return <>{intro}</>
}

class Game{
    constructor({title, introArray, infoBox, controlArray, element, listIcon, url}){
        this.title = title;
        this.introText = <IntroText
                introArray={introArray}
            />;
        this.infoBox= infoBox(this.title);
        this.controls = <Controls
                controlArray = {controlArray}
                icon = {listIcon}
            />
        this.element = element(this.title);
        this.url = url
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
infoBoxes.addGame({
    title: "Piano",
    introArray: ["Collect honey pots whilst avoiding bees and the turning picture.","You have 75 second to complete the challenge."],
    infoBox: (title) => (
        <InfoBox
            text="This game is a twist on the '1, 2, 3 piano' game."
            link="/games/piano"
            btnText="1, 2, 3, let's play!"
            title={title}
        />
    ),
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
    element: (title) => (<PianoGame title={title}/>),
    url: "piano"
})

infoBoxes.addGame({
    title: "RPG",
    introArray:["In this game, you'll have to look for the key."],
    infoBox:(title) => (
        <InfoBox 
        text="Floor lost her key, help her find it!"
        link="/games/rpg"
        btnText="Let's go looking!"
        title={title}
        />
    ),
    controlArray: [
        {key: "Arrow Left", action: "Move left"},
        {key: "Arrow Right", action: "Move right"},
        {key: "Arrow Up", action: "Move Up"},
        {key: "Arrow Down", action: "Move Down"},
    ],
    listIcon: (<PlayIcon aria-hidden="true" className="size-6 text-amber-600 mr-5"/>),
    element: (title) => (<RpgGame title={title}/>),
    url: "rpg"
})

infoBoxes.addGame({
    title: "Sudoku",
    introArray:["It's just a classic sudoku game."],
    infoBox:(title) => (
        <InfoBox 
        text="Some people say Floor loves sudoku. Good luck!"
        link="/games/sudoku"
        btnText="Sudoku away!"
        title={title}
        />
    ),
    controlArray:[
        {key: "Click empty square", action: "Start Typing"},
        {key: "Check button", action: "Check your solution"},
        {key: "Reset button", action: "Reset your solution"},
        {key: "Regenerate button", action: "Regenerate a completly new sudoku"},
    ],
    listIcon: (<PuzzlePieceIcon aria-hidden="true" className="size-6 text-amber-600 mr-5"/>),
    element: (title) => (<SudokuGame title={title}/>),
    url:"sudoku"
})
infoBoxes.addGame({
    title: "Memory",
    introArray:["This is a Memory game. Subsequently click two equal cards to remove them from the game."],
    infoBox:(title) => (
        <InfoBox 
        text="This will bring back old memories, you'll see!"
        link="/games/memory"
        btnText="Let's memorize!"
        title={title}
        />
    ),
    controlArray:[
        {key: "Click a card", action: "Card turns around"},,
    ],
    listIcon: (<LightBulbIcon aria-hidden="true" className="size-6 text-amber-600 mr-5"/>),
    element: (title) => (<MemoryGame title={title}/>),
    url:"memory"
})


infoBoxes.addRadialDivision();
export const games = infoBoxes.games;
export const boxes = infoBoxes.boxes;
