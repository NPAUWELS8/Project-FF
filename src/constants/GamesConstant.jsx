import { PianoGame, RpgGame, SudokuGame, MemoryGame  } from "games"
import { AppContext } from "contexts/AppContext";
import { LockOpenIcon } from '@heroicons/react/24/solid'

import { Link } from 'react-router-dom';
import { arrow } from 'assets/icons';
import { useContext } from "react";

const InfoBox = ({text, link, btnText})=>{
    const context = useContext(AppContext);
    
    function onClickHandle(){
        context.setIsAfterGameComplete(false);
    }
    
    return (
    <div className="info-box neo-brutalism-magic">
        <p className="font-medium sm:text-xl text-center hover:cursor-default">{text}</p>
        <Link to={link} onClick={onClickHandle} className="neo-brutalism-white neo-btn-magic">
            {btnText}
            <LockOpenIcon aria-hidden="true" className="size-6 text-amber-600" />
        </Link>
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

class Game{
    constructor({title, introText, infoBox, controls, element, url}){
        this.title = title;
        this.introText = introText;
        this.infoBox= infoBox;
        this.controls = controls;
        this.element = element;
        this.url = url
    }
}

const infoBoxes = new InfoBoxes();
infoBoxes.addBox({
    infoBox: (
        <h1 className="hover:cursor-default sm:text-xl sm:leading-snug text-center neo-brutalism-magic py-4 px-8 text-white mx-5">
            Hi, I am <span className="font-semibold">Niels</span> 🧹
            <br/>
            An Awesome React developer?
        </h1>
    )
})
infoBoxes.addGame({
    title: "Piano",
    introText: 'This is a pianogame',
    infoBox:(
        <InfoBox
            text="Game 1 is nice game that you have to play because it's very nice and all."
            link="/games/piano"
            btnText="Learn More"
        />
    ),
    controls: 'do this, then that, blaaa blaaa blaaa',
    element: (<PianoGame title="Piano"/>),
    url: "piano"
})

infoBoxes.addGame({
    title: "RPG",
    introText:"This is an RPG game.",
    infoBox:(
        <InfoBox 
        text="Game 2 is even nicer, believe me!"
        link="/games/rpg"
        btnText="Play it bassie!"
        />
    ),
    controls:"Do this, then do the next thing and so on!",
    element: (<RpgGame title="RPG"/>),
    url: "rpg"
})

infoBoxes.addGame({
    title: "Sudoku",
    introText:"This is a Sudoku game.",
    infoBox:(
        <InfoBox 
        text="Game 3 is crazy. You will love it!"
        link="/games/sudoku"
        btnText="Sudoku away!"
        />
    ),
    controls:"Do this, then do the next thing and so on!",
    element: (<SudokuGame title="Sudoku"/>),
    url:"sudoku"
})
infoBoxes.addGame({
    title: "Memory",
    introText:"This is a Memory game.",
    infoBox:(
        <InfoBox 
        text="Game 4 brings back old memories, you'll see!"
        link="/games/memory"
        btnText="Let's memorize!"
        />
    ),
    controls:"Do this, then do the next thing and so on!",
    element: (<MemoryGame title="Memory"/>),
    url:"memory"
})


infoBoxes.addRadialDivision();
export const games = infoBoxes.games;
export const boxes = infoBoxes.boxes;

