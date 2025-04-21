import { PianoGame, RpgGame, SudokuGame  } from "games"

import { Link } from 'react-router-dom';
import { arrow } from 'assets/icons';

const InfoBox = ({text, link, btnText})=>(
    <div className="info-box neo-brutalism-blue">
        <p className="font-medium sm:text-xl text-center">{text}</p>
        <Link to={link} className="neo-brutalism-white neo-btn">
            {btnText}
            <img src={arrow} className="w-4 h-4 object-contain"/>
        </Link>
    </div>
)

class InfoBoxes{
    constructor(){
        this.boxCount = 0;
        this.firstRadial = 4.25;
        this.areaPercentage = 0.25;
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
    constructor({title, introText, infoBox, controls, element}){
        this.title = title;
        this.introText = introText;
        this.infoBox= infoBox;
        this.controls = controls;
        this.element = element;
    }
}

const infoBoxes = new InfoBoxes();
infoBoxes.addBox({
    infoBox: (
        <h1 className="sm:text-xl sm:leading-snug text-center neo-brutalism-blue py-4 px-8 text-white mx-5">
            Hi, I am <span className="font-semibold">Niels</span> 🧹
            <br/>
            A Floorie Lover.
        </h1>
    )
})
infoBoxes.addGame({
    title: "Piano",
    introText: 'This is a pianogame',
    infoBox:(
        <InfoBox
            text="Game 1 is nice game that you have to play because it's very nice and all."
            link="/piano"
            btnText="Learn More"
        />
    ),
    controls: 'do this, then that, blaaa blaaa blaaa',
    element: (<PianoGame/>)
})

infoBoxes.addGame({
    title: "RPG",
    introText:"This is an RPG game.",
    infoBox:(
        <InfoBox 
        text="Game 2 is even nicer, believe me!"
        link="/rpg"
        btnText="Play it bassie!"
        />
    ),
    controls:"Do this, then do the next thing and so on!",
    element: (<RpgGame/>)
})

infoBoxes.addGame({
    title: "Sudoku",
    introText:"This is a Sudoku game.",
    infoBox:(
        <InfoBox 
        text="Game 3 is crazy. You will love it!"
        link="/sudoku"
        btnText="Sudoku away!"
        />
    ),
    controls:"Do this, then do the next thing and so on!",
    element: (<SudokuGame/>)
})


infoBoxes.addRadialDivision();
export const games = infoBoxes.games;
export const boxes = infoBoxes.boxes;

