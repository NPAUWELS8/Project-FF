import {useState} from 'react'
import { useNavigate } from 'react-router-dom'

const GameInfo = ({title, introText, controls, game}) => {
  const [gameStarted, setGameStarted] = useState(false)
  const navigate = useNavigate();

  const handleButtonClick = ()=>{
    setGameStarted(true)
  }
  const goBack = ()=>{
    window.location.reload()
  }

  if(gameStarted){
    return (
      <div>
        {game}
        <button className="btn-magic-dark block mx-auto mb-5" onClick={goBack}>
          Go Back
        </button>
      </div>
    );
  } else{
    return (
      <section className="bg-slate-950 max-container">
        <h1 className="head-text-magic">
          <span className="magic-text font-semibold drop-shadow">{title}</span>
        </h1>
        <div className="mt-5 flex flex-col gap-3 text-slate-500">
            {introText}
        </div>
        <div className="mt-5">
          <h3 className="subhead-text-magic">
            <span className="magic-text font-semibold drop-shadow">Controls</span>
          </h3>
          <div className="mt-5 flex flex-col gap-3 text-slate-500">   
              {controls}
          </div>
          <div className="mt-5 flex flex-col gap-3 text-slate-500">
            You can also consult the controls by clicking the button in the top right corner.
          </div>
        </div>
        <button className="btn-magic mt-12" onClick={handleButtonClick}>Continue</button>
      </section>
    )
  }
}

export default GameInfo