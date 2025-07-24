import {useState, useEffect} from 'react'
import YouTube from 'react-youtube'
import { videoIds } from 'constants/GamesConstant'
import {useGSAP} from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/all'

import GeneralLoader from 'components/GeneralLoader'
import { hogwartsEmblem } from 'assets/images'

gsap.registerPlugin(ScrollTrigger)

const GameInfo = ({title, introText, controls, game}) => {
  const [gameStarted, setGameStarted] = useState(false)
  const [isLoading, setIsLoading] = useState(true);
  const [randomVideo, setRandomVideo] = useState(videoIds[Math.floor(Math.random() * videoIds.length)]);

  function onStateChange(event){
    if(event.data === 1) setIsLoading(false); //this condition checks whether the video is playing
  }
  /* Possible values are:
    -1 (unstarted)
    0 (ended)
    1 (playing)
    2 (paused)
    3 (buffering)
    5 (video cued).
  */

  useGSAP(()=>{
    gsap.set("#video-container", {
      clipPath: "polygon(100% 34%, 21% 56%, 48% 77%, 0% 100%, 86% 76%, 55% 58%)",
      // borderRadius:" 0% 0% 40% 10%"
    })
    gsap.from("#video-container",{
      clipPath: "polygon(100% 0%, 0% 0%, 0% 77%, 0% 100%, 100% 100%, 100% 58%)",
      borderRadius: '0 0 0 0',
      ease: 'power1.inOut',
      scrollTrigger:{
        trigger: "#video-container",
        start: "center center",
        end: "bottom center",
        scrub: true
      }
    })

  },[isLoading]) //important to add isLoading to the dependencies, otherwise this animation doesn't work on initial load.

  const {width, height} = window.screen;

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
      <>
        <section className="w-screen h-screen">
          { isLoading && <GeneralLoader/>
          }
          <div id="video-container" className="h-screen">
            <div id="video-frame" className={`absolute -top-[10%] left-0 w-full overflow-hidden`}>
              {/* <div className="bg-black absolute top-0 left-0 w-full h-[10%]"></div> */}
              <YouTube
                id=""
                className="z-0"
                videoId={randomVideo}
                opts={{
                  height: height,
                  width: width,
                  playerVars: {
                    autoplay: 1,
                    controls:0,
                    mute:1,
                    start: 90,
                    disablekb:1,
                    modestbranding: 1
                }
                }}
                onStateChange={onStateChange}
              />
              
            </div>
            <div className="absolute top-0 left-0 w-full h-screen z-10">
              <h1 className="cinzel-epic absolute text-white top-40 left-20 z-40">
                {title}
              </h1>
              <h1 className="cinzel-epic absolute text-white bottom-10 right-20 z-40">
                GAME
              </h1>
            </div>
          </div>
          <div className={`absolute top-0 left-0 w-full h-screen overflow-hidden -z-10`}>
            <h1 className="cinzel-epic absolute text-black top-40 left-20 z-40">
              {title}
            </h1>
            <h1 className="cinzel-epic absolute text-black bottom-10 right-20">
              GAME
            </h1>
          </div>
        </section>
        <section className="z-0 min-h-screen w-screen bg-slate-950 hover:cursor-default">
            {/* <h1 className="head-text-magic">
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
          <button className="btn-magic mt-12" onClick={handleButtonClick}>Continue</button> */}
          <div id="parchment-container" className="font-bilbo-swash-caps text-6xl">
            <div className="main-parchment">
              <div id="parchment" className="mt-5"></div>
              <div id="contain">
                <p className="inkTitle">{title}</p>
                <h1>Description</h1>
                <p></p>
                <p id="labarum" className="-my-20"><img src={hogwartsEmblem}/></p>
                <h1>Controls</h1>
                <p className="parchment-p text-3xl">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor. Cras elementum ultrices diam. Maecenas ligula massa, varius a, semper congue, euismod non, mi. Proin porttitor, orci nec nonummy molestie, enim est eleifend mi, non fermentum diam nisl sit amet erat. Duis semper. Duis arcu massa, scelerisque vitae, consequat in, pretium a, enim. Pellentesque congue. Ut in risus volutpat libero pharetra tempor. Cras vestibulum bibendum augue. Praesent egestas leo in pede. Praesent blandit odio eu enim. Pellentesque sed dui ut augue blandit sodales. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Aliquam nibh. Mauris ac mauris sed pede pellentesque fermentum. Maecenas adipiscing ante non diam sodales hendrerit.</p>
                <p className="parchment-p text-3xl">Ut velit mauris, egestas sed, gravida nec, ornare ut, mi. Aenean ut orci vel massa suscipit pulvinar. Nulla sollicitudin. Fusce varius, ligula non tempus aliquam, nunc turpis ullamcorper nibh, in tempus sapien eros vitae ligula. Pellentesque rhoncus nunc et augue. Integer id felis. Curabitur aliquet pellentesque diam. Integer quis metus vitae elit lobortis egestas. Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Morbi vel erat non mauris convallis vehicula. Nulla et sapien. Integer tortor tellus, aliquam faucibus, convallis id, congue eu, quam. Mauris ullamcorper felis vitae erat. Proin feugiat, augue non elementum posuere, metus purus iaculis lectus, et tristique ligula justo vitae magna.</p>
                <p className="cachet"><img src="https://i.postimg.cc/4NBYNqCR/22.png"/></p>
                <div id="signature" className="text-4xl">Imperator Caesar Flavius Constantinus<br />Pius Felix Invictus Augustus</div>
              </div>
            </div>

            {/* <svg>
              <filter id="wavy2">
                <feTurbulence x="0" y="0" baseFrequency="0.02" numOctaves="5" seed="1" />
                <feDisplacementMap in="SourceGraphic" scale="20" />
              </filter>
            </svg> */}
          </div>
          </section>
        </>
    )
  }
}

export default GameInfo