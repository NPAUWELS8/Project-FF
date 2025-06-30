import { PianoGame, RpgGame, SudokuGame, MemoryGame  } from "games"
import { AppContext } from "contexts/AppContext";
import { LockOpenIcon, SparklesIcon, PuzzlePieceIcon, PlayIcon, RocketLaunchIcon, TrophyIcon, StarIcon, LightBulbIcon, CheckCircleIcon } from '@heroicons/react/24/solid'

import { Link } from 'react-router-dom';
import { arrow } from 'assets/icons';
import { useContext } from "react";

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

const Controls = ({controlArray,icon}) =>{
    const controls = controlArray.map((control,index)=>
        <div key={index} className="flex flex-row">{icon}<p><b>{control.key}</b>{`: ${control.action}`}</p></div>
    )
    return <>{controls}</>
}

class Game{
    constructor({title, introText, infoBox, controlArray, element, listIcon, url}){
        this.title = title;
        this.introText = introText;
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
        <h1 className="hover:cursor-default sm:text-xl sm:leading-snug text-center neo-brutalism-magic py-4 px-8 text-white mx-5">
            Hi, Welcome to <span className="font-semibold">FF</span> 🧹
            <br/>
            An Awesome Game!
        </h1>
    )
})
infoBoxes.addGame({
    title: "Piano",
    introText: (<p>Collect honey pots whilst avoiding bees and the turning picture.</p>),
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
    introText:"In this game, you'll have to look for the key.",
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
    introText:"It's just a classic sudoku game.",
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
    introText:"This is a Memory game. Subsequently click two equal cards to remove them from the game.",
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

