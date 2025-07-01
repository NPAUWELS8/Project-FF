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
    <div className="mx-auto min-h-[calc(100vh-80px)] px-8 !pt-[75px] pb-12 sm:p-16">
      <div className="flex justify-center max-w-screen ">
        <canvas ref={pianoRef} className="aspect-1333/500 max-w-full">PianoGame</canvas>
      </div>
      {gameOver && won && <button onClick={onSuccess} className="btn-magic mt-12">Continue</button> }
      {gameOver && !won && <button onClick={onRetry} className="btn-magic mt-12">Retry</button> }
    </div>
  )
}

export default PianoGame