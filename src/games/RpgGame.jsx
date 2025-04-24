import { useEffect, useRef, useState, useCallback } from 'react'
import { playRpg } from './gameplay/rpg/rpg';

import FadingDiv from './gameplay/rpg/fadingDiv';
import TextBoxContainer from './gameplay/rpg/TextBoxContainer';

const GameCanvas = ({setGameOver, handleUpdateText, handleDisplayText, handleOverlay, gameSize}) => {
    const rpgRef = useRef();

    useEffect(()=>{
        playRpg(rpgRef.current, setGameOver, handleUpdateText, handleDisplayText, handleOverlay, gameSize);
    },[])

    const [gameWidth, gameHeight] = gameSize;

    return (
        <canvas ref={rpgRef} className={`"w-[${gameWidth}px] h-[${gameHeight}px]"`}></canvas>
    )
}


const RpgGame = ({title}) => {
    const [gameOver, setGameOver] = useState(false);
    const [gameText, setGameText] = useState([]);
    const [gameTextDisplay, setGameTextDisplay] = useState(false);
    const [overlay, setOverlay] = useState(false);

    const gameSize = [840,480]

    const handleUpdateText = useCallback((text) => {
        setGameText(text);
      }, []);

    const handleDisplayText = useCallback((isDisplayed) => {
        setGameTextDisplay(isDisplayed);
    },[])

    const handleOverlay = useCallback((overlay)=>{
        setOverlay(overlay);
    },[])

    function onSuccess(){
        
    }

  return (
    <div className="mx-auto min-h-[calc(100vh-80px)] max-w-5xl px-8 !pt-[75px] pb-12 sm:p-16">
        <FadingDiv
            overlay={overlay}
            gameSize={gameSize}
        />
        <GameCanvas 
            setGameOver={setGameOver}
            handleUpdateText={handleUpdateText}
            handleDisplayText={handleDisplayText}
            handleOverlay={handleOverlay}
            gameSize={gameSize}
        />
        {gameOver && <button className="btn-magic mt-12">Continue</button> }
        <TextBoxContainer
            gameText={gameText}
            gameTextDisplay={gameTextDisplay}
        />
    </div>
  )
}

export default RpgGame