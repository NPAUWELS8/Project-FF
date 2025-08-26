import { useEffect, useRef, useState, useCallback, useContext } from 'react'
import { AppContext } from 'contexts/AppContext'
import { playRpg } from './gameplay/rpg/rpg';

import FadingDiv from './gameplay/rpg/fadingDiv';
import TextBoxContainer from './gameplay/rpg/TextBoxContainer';
import { useAppNavigate } from 'hooks';

const GameCanvas = ({setGameOver, handleUpdateText, handleDisplayText, handleOverlay, gameSize}) => {
    const rpgRef = useRef();

    useEffect(()=>{
        playRpg(rpgRef.current, setGameOver, handleUpdateText, handleDisplayText, handleOverlay, gameSize);
    },[])

    const [gameWidth, gameHeight] = gameSize;

    return (
        <canvas ref={rpgRef} className={`aspect-${gameWidth}/${gameHeight} max-w-full`}></canvas>
    )
}


const RpgGame = ({title}) => {
    const navigate = useAppNavigate()
    
    const context = useContext(AppContext);
    
    const [gameOver, setGameOver] = useState(false);
    const [gameText, setGameText] = useState([]);
    const [gameTextDisplay, setGameTextDisplay] = useState(false);
    const [overlay, setOverlay] = useState(false);

    const gameSize = [840,480]; //max-w-840px max-h-480px --> adding the classes here to be picked up by Tailwind
    const [gameWidth, gameHeight] = gameSize;

    const handleUpdateText = useCallback((text) => {
        setGameText(text);
      }, []);

    const handleDisplayText = useCallback((isDisplayed) => {
        setGameTextDisplay(isDisplayed);
        context.setIsDisplayedBackButton(!isDisplayed);
    },[])

    const handleOverlay = useCallback((overlay)=>{
        setOverlay(overlay);
    },[])

    function onSuccess(){
        context.onGameFinished(title)
        navigate('/');
        document.location.reload();
    }

  return (
    <div className="flex justify-center mx-auto min-h-[calc(100vh-80px)] px-8 !pt-[75px] pb-12 sm:p-16">
        <div className={`max-w-[${gameWidth}px] w-full`}>
            <div className={`max-w-[${gameWidth}px] w-full max-h-[${gameHeight}] relative border-4 border-black`}>
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
            </div>
            {gameOver && <button onClick={onSuccess} className="btn-magic mt-12">Continue</button> }
            <TextBoxContainer
                gameText={gameText}
                gameTextDisplay={gameTextDisplay}
            />
        </div>
    </div>
  )
}

export default RpgGame