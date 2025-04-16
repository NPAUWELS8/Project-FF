import {useState} from 'react'

import { PianoGame } from '../games'
import { games } from 'constants/GamesConstant'

const GameInfo = ({title, introText, controls, game}) => {
  const [gameStarted, setGameStarted] = useState(false)

  const handleButtonClick = ()=>{
    setGameStarted(true)
  }
  if(gameStarted){
    return game;
  } else{
    return (
      <section className="max-container">
        <h1 className="head-text">
          <span className="blue-gradient_text font-semibold drop-shadow">{title}</span>
        </h1>
        <div className="mt-5 flex flex-col gap-3 text-slate-500">
          <p>
            {introText}
          </p>
        </div>
        <div className="mt-5">
          <h3 className="subhead-text">
            <span className="blue-gradient_text font-semibold drop-shadow">Controls</span>
          </h3>
          <div className="mt-5 flex flex-col gap-3 text-slate-500">
            <p>
              {controls}
            </p>
          </div>
        </div>
        <button className="btn mt-12" onClick={handleButtonClick}>Continue</button>
      </section>
    )
  }
}

export default GameInfo