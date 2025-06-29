import { useContext, useEffect, useRef, useState } from 'react'
import { playPiano } from './gameplay/piano/piano';
import { useNavigate } from 'react-router-dom';

import { AppContext } from 'contexts/AppContext'

const PianoGame = ({title}) => {
    const navigate = useNavigate()
    const context = useContext(AppContext);
    const pianoRef = useRef();
    const [won, setWon] = useState(false);
    const [gameOver, setGameOver] = useState(false)

    function onSuccess(){
      context.onGameFinished(title)
      navigate('/');
    }
    function onRetry(){
      playPiano(pianoRef.current, setGameOver, setWon);
    }

    useEffect(()=>{
        playPiano(pianoRef.current, setGameOver, setWon);
    },[])
  return (
    <div>
      <canvas ref={pianoRef} className="h-[500px] w-[1333px]">PianoGame</canvas>
      {gameOver && won && <button onClick={onSuccess} className="btn-magic m-12">Continue</button> }
      {gameOver && !won && <button onClick={onRetry} className="btn-magic m-12">Retry</button> }
    </div>
  )
}

export default PianoGame