import {useState, useEffect, useContext} from 'react'
import YouTube from 'react-youtube'
import { videoIds } from 'constants/GamesConstant'
import {useGSAP} from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/all'

import GeneralLoader from 'components/GeneralLoader'
import { hogwartsEmblem, hogwartsSeal } from 'assets/images'
import Button from 'components/Button'

import { AppContext } from 'contexts/AppContext';

gsap.registerPlugin(ScrollTrigger)

const GameInfo = ({title, trialTitle, introText, controls, game}) => {
  const context = useContext(AppContext);
  const [gameStarted, setGameStarted] = useState(false)
  const [isLoading, setIsLoading] = useState(true);
  const [randomVideo, setRandomVideo] = useState(videoIds[Math.floor(Math.random() * videoIds.length)]);
 
  const {isDisplayedBackButton} = context;

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
        toggleActions: "play none none reverse",
      }
    })
    // gsap.to("#parchment-container",{
    //   marginTop: 1,
    //   ease: 'power1.inOut',
    //   scrollTrigger:{
    //     trigger: "#video-section",
    //     start: "bottom center",
    //     end: "140% center",
    //     scrub:true,
    //   }
    // })

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
      <div className="game-container h-full min-h-screen relative">
        {game}
        <div className={`${isDisplayedBackButton ? 'flex' : 'hidden'} absolute bottom-5 mx-auto mb-5 w-full justify-center`}>
          <button className="btn-magic-dark hover:cursor-pointer" onClick={goBack}>
            Go Back
          </button>
        </div>
      </div>
    );
  } else{
    return (
      <>
        <section id="video-section" className="w-screen h-screen">
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
                TRIAL OF
              </h1>
              <h1 className="cinzel-epic absolute text-white bottom-10 right-20 z-40">
                {trialTitle}
              </h1>
            </div>
            <div className="absolute flex justify-center left-10 bottom-[10%] w-full xl:w-100 h-12">
            <Button
                className="w-[90%] md:w-[70%]"
                id="button"
                text="Continue"
                scrollId='parchment-section'
                offset={-window.innerHeight * 0.01}
            />
          </div>
          </div>
          <div className={`absolute top-0 left-0 w-full h-screen overflow-hidden -z-10`}>
            <h1 className="cinzel-epic absolute text-black top-40 left-20 z-40">
              TRIAL OF
            </h1>
            <h1 className="cinzel-epic absolute text-black bottom-10 right-20">
              {trialTitle}
            </h1>
          </div>
        </section>
        <section id="parchment-section" className="z-0 min-h-screen w-screen hover:cursor-default pt-[0.5px]">
          <div id="parchment-container" className="font-bilbo-swash-caps text-8xl mt-50">
            <div className="main-parchment">
              <div id="parchment" className="mt-5"></div>
              <div id="contain">
                <p className="inkTitle">{`${title} Game`}</p>
                <h1 className="text-6xl">Description</h1>
                {introText}
                <p id="labarum" className="-my-20"><img src={hogwartsEmblem}/></p>
                <h1 className="text-6xl">Controls</h1>
                {controls}
                <div className="mb-10 flex flex-row justify-between items-center">
                  <button className="btn-magic mt-12" onClick={handleButtonClick}>Continue</button>
                  <div>
                    <p className="cachet"><img src={hogwartsSeal}/></p>
                    <div id="signature" className="text-4xl">Game Overseer Nielske Pauwels<br />Keeper of Philosofloor's stone</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          </section>
        </>
    )
  }
}

export default GameInfo