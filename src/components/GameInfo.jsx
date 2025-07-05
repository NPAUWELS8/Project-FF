import {useState} from 'react'
import YouTube from 'react-youtube'
import {useGSAP} from '@gsap/react'
import gsap from 'gsap'
//TODO: Fix continue button. Currently the mouse doesn't change when hovering over the button.
//TODO: For piano game and rpg game, make sure the page doesn't scroll whilst pressing down button when playing the game

const GameInfo = ({title, introText, controls, game}) => {
  const [gameStarted, setGameStarted] = useState(false)

  useGSAP(()=>{},[])

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
      <section className="bg-slate-950 max-container hover:cursor-default">
        <div className="absolute -top-[10%] left-0 w-full h-full">
          {/* <div className="bg-black absolute top-0 left-0 w-full h-[10%]"></div> */}
          <YouTube
            id=""
            className="z-0"
            videoId="_vMIr3_Lbjg"
            opts={{
              height: window.screen.height,
              width: window.screen.width,
              playerVars: {
                autoplay: 1,
                controls:0,
                mute:1,
                start: 35,
                disablekb:1,
                modestbranding: 1
            }
            }}
          />
          <div className="absolute top-0 left-0 w-full h-full z-10"></div>
        </div>
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