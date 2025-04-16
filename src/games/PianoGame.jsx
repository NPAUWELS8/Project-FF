import { useEffect, useRef, useState } from 'react'
import { playPiano } from './gameplay/piano/piano';


const PianoGame = () => {
    const pianoRef = useRef();
    const [won, setWon] = useState(false);
    const [gameOver, setGameOver] = useState(false)

    useEffect(()=>{
        playPiano(pianoRef.current, setGameOver, setWon);
    },[])
  return (
    <div>
      <canvas ref={pianoRef} className="h-[500px] w-[1333px]">PianoGame</canvas>
      {gameOver && won && <button className="btn">Continue</button> }
      {gameOver && !won && <button className="btn">Retry</button> }
    </div>
  )
}

export default PianoGame