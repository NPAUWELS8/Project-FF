import { useContext, useEffect, useRef, useState } from 'react'
import { playPiano } from './gameplay/piano/piano';
import { useNavigate } from 'react-router-dom';

import { AppContext } from 'contexts/AppContext'

const PianoGame = ({title}) => {
    const navigate = useNavigate()
    const context = useContext(AppContext);
    const {house} = context;
    const pianoRef = useRef();
    const [won, setWon] = useState(false);
    const [gameOver, setGameOver] = useState(false)

    function onSuccess(){
      context.onGameFinished(title)
      navigate('/');
      document.location.reload();
    }
    function onRetry(){
      playPiano(pianoRef.current, setGameOver, setWon, house);
    }

    useEffect(()=>{
        playPiano(pianoRef.current, setGameOver, setWon, house);
    },[])
  return (
    <div className="mx-auto max-w-[1333px] px-8 !pt-[75px] pb-12 sm:p-16">
      <div className="flex justify-center max-w-screen border-4 border-black">
        <canvas ref={pianoRef} className="aspect-1333/500 max-w-full">PianoGame</canvas>
      </div>
      {gameOver && won && <button onClick={onSuccess} className="btn-magic mt-12">Continue</button> }
      {gameOver && !won && <button onClick={onRetry} className="btn-magic mt-12">Retry</button> }
    </div>
  )
}

export default PianoGame