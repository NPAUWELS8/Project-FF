import { Suspense, useState, useEffect, useRef, useContext } from 'react'
import { AppContext } from 'contexts/AppContext';
import { Canvas } from '@react-three/fiber'
import Loader from 'components/Loader'

// import Island from 'models/Island'
// import NightSky from 'models/NightSky'
// import Bird from 'models/Bird'
// import Broomstick from 'models/Broomstick'
import ModelWrapper from 'models/ModelWrapper'
import HomeInfo from 'components/HomeInfo'


import sakura from 'assets/sakura.mp3'
import { soundoff, soundon } from 'assets/icons'

const Home = () => {
  const {setCurrentGame} = useContext(AppContext);
  const audioRef = useRef(new Audio(sakura));
  audioRef.current.volume = 0.4;
  audioRef.current.loop = true;
  const [isRotating, setIsRotating] = useState(false)
  const [currentStage, setCurrentStage] = useState(1)
  const [isPlayingMusic, setIsPlayingMusic] = useState(false);

  useEffect(()=>{
      setCurrentGame(null);
    },[])

  useEffect(()=>{
    if(isPlayingMusic){
      audioRef.current.play()
    }
    return ()=>{
      audioRef.current.pause()
    }
  },[isPlayingMusic])

  const adjustIslandForScreenSize = ()=>{
    let screenScale = null;
    let screenPosition = [0,-6.5,-43];
    let rotation = [0.1,4.7,0]
    if(window.innerWidth < 768){
      screenScale = [0.9,0.9,0.9];
    } else {
      screenScale = [1,1,1];
    }
    return [screenScale,screenPosition,rotation];
  }
  const adjustBroomForScreenSize = ()=>{
    let screenScale, screenPosition;
    if(window.innerWidth < 768){
      screenScale = [0.5,0.5,0.5];
      screenPosition = [0,1,-15]
    } else {
      screenScale = [1,1,1];
      screenPosition = [0,1,-12];
    }
    return [screenScale,screenPosition];
  }
  const [islandScale, islandPosition,islandRotation] = adjustIslandForScreenSize();
  const [broomScale, broomPosition] = adjustBroomForScreenSize();
  return (
    <section className="w-full h-screen relative">
      <div className="absolute top-28 left-0 right-0 z-10 flex items-center justify-center">
        {currentStage && <HomeInfo currentStage={currentStage}/>}
      </div>
      <Canvas 
      className={`w-full h-screen bg-transparent ${isRotating ? 'cursor-grabbing' : 'cursor-grab'}`}
      camera={{near:0.1, far:1000}}
      >
        <Suspense fallback={<Loader/>}>
        <directionalLight position = {[1,1,1]} intensity={2}/>
        <ambientLight intensity={0.5}/>
        <hemisphereLight skyColor="#b1eff" groundColor="#000000"/>
        <ModelWrapper
          isRotating={isRotating}
          islandPosition={islandPosition}
          islandScale={islandScale}
          islandRotation={islandRotation}
          setIsRotating={setIsRotating}
          setCurrentStage={setCurrentStage}
          broomPosition={broomPosition}
          broomScale={broomScale}
        />
        </Suspense>
      </Canvas>
      {/* TODO: change music to new soundtrack and make it so it starts playing automatically but can be turned off with button. */}
      <div className="absolute bottom-2 left-2">
        <img 
          src={!isPlayingMusic ? soundoff : soundon}
          alt="sound"
          className="w-10 h-10 cursor-pointer object-contain"
          onClick={()=>setIsPlayingMusic(!isPlayingMusic)}
        />
      </div>
    </section>
  )
}

export default Home