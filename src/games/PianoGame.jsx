import { useEffect, useRef } from 'react'
import { playPiano } from './gameplay/piano/piano';


const PianoGame = ({gameOver, setGameOver}) => {
    const pianoRef = useRef();

    useEffect(()=>{
        playPiano(pianoRef.current);
    },[])
  return (
    <canvas ref={pianoRef} className="h-[500px] w-[1333px]">PianoGame</canvas>
  )
}

export default PianoGame