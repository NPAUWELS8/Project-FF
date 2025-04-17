import { useEffect, useRef, useState, useCallback } from 'react'
import { playRpg } from './gameplay/rpg/rpg';

import FadingDiv from './gameplay/rpg/fadingDiv';
import TextBoxContainer from './gameplay/rpg/TextBoxContainer';

const GameCanvas = ({setGameOver,setWon, handleUpdateText, handleDisplayText}) => {
    const rpgRef = useRef();

    useEffect(()=>{
        playRpg(rpgRef.current, setGameOver, setWon, handleUpdateText, handleDisplayText);
    },[])

    return (
        <canvas ref={rpgRef} className="h-[480px] w-[840px]"></canvas>
    )
}


const RpgGame = () => {
    const [won, setWon] = useState(false);
    const [gameOver, setGameOver] = useState(false)
    const [gameText, setGameText] = useState([]);
    const [gameTextDisplay, setGameTextDisplay] = useState(false);

    const handleUpdateText = useCallback((text) => {
        setGameText(text);
      }, []);

    const handleDisplayText = useCallback((isDisplayed) => {
        setGameTextDisplay(isDisplayed);
    },[])

  return (
    <div>
        <FadingDiv/>
        <GameCanvas 
            setGameOver={setGameOver}
            setWon={setWon}
            handleUpdateText={handleUpdateText}
            handleDisplayText={handleDisplayText}
        />
        {gameOver && won && <button className="btn-magic mt-12">Continue</button> }
        {gameOver && !won && <button className="btn-magic mt-12">Retry</button> }
        <TextBoxContainer/>
    </div>
  )
}

export default RpgGame