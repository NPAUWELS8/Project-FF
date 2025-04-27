import { useRef, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber'

import { boxes } from 'constants/GamesConstant'


import Island from 'models/Island'
import NightSky from 'models/NightSky'
import Bird from 'models/Bird'
import Broomstick from 'models/Broomstick'

const ModelWrapper = ({isRotating, islandPosition, islandScale, islandRotation, setIsRotating, setCurrentStage, broomPosition, broomScale}) => {

    const {gl, viewport} = useThree();
    const lastX = useRef(0);
    const rotationSpeed = useRef(0);
    const dampingFactor = 0.95
    const rotationResult = useRef(islandRotation[1]);

    const handlePointerDown = (e) => {
      e.stopPropagation();
      e.preventDefault();
      setIsRotating(true);

      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      lastX.current = clientX
    }
    const handlePointerUp = (e) => {
      e.stopPropagation();
      e.preventDefault();
      setIsRotating(false);
    }
    const handlePointerMove = (e) => {
      e.stopPropagation();
      e.preventDefault();

      if(isRotating){
        const clientX = e.touches ? e.touches[0].clientX : e.clientX;
        const delta = (clientX - lastX.current) / viewport.width;
        
        rotationResult.current += delta * 0.01 * Math.PI;

        lastX.current = clientX;

        rotationSpeed.current = delta * 0.01 * Math.PI
      }
    }

    const handleKeyDown = (e)=>{
      if(e.key === 'ArrowLeft'){
        if(!isRotating) setIsRotating(true);
        rotationResult.current += 0.01 * Math.PI;
        rotationSpeed.current = 0.0125;
      } else if(e.key ==='ArrowRight'){
        if(!isRotating) setIsRotating(true);
        rotationResult.current -= 0.01 * Math.PI;
        rotationSpeed.current = -0.0125;
      }
    }

    const handleKeyUp = (e)=>{
      if(e.key === 'ArrowLeft' || e.key === 'ArrowRight') setIsRotating(false);    
    }

    useFrame(()=>{
      if(!isRotating){
        rotationSpeed.current *= dampingFactor;

        if(Math.abs(rotationSpeed.current) < 0.001) rotationSpeed.current = 0;
        rotationResult.current += rotationSpeed.current;
      } else {
        const rotation = rotationResult.current;

          /**
         * Normalize the rotation value to ensure it stays within the range [0, 2 * Math.PI].
         * The goal is to ensure that the rotation value remains within a specific range to
         * prevent potential issues with very large or negative rotation values.
         *  Here's a step-by-step explanation of what this code does:
         *  1. rotation % (2 * Math.PI) calculates the remainder of the rotation value when divided
         *     by 2 * Math.PI. This essentially wraps the rotation value around once it reaches a
         *     full circle (360 degrees) so that it stays within the range of 0 to 2 * Math.PI.
         *  2. (rotation % (2 * Math.PI)) + 2 * Math.PI adds 2 * Math.PI to the result from step 1.
         *     This is done to ensure that the value remains positive and within the range of
         *     0 to 2 * Math.PI even if it was negative after the modulo operation in step 1.
         *  3. Finally, ((rotation % (2 * Math.PI)) + 2 * Math.PI) % (2 * Math.PI) applies another
         *     modulo operation to the value obtained in step 2. This step guarantees that the value
         *     always stays within the range of 0 to 2 * Math.PI, which is equivalent to a full
         *     circle in radians.
         */
        const normalizedRotation =
        ((rotation % (2 * Math.PI)) + 2 * Math.PI) % (2 * Math.PI);

        // Set the current stage based on the island's orientation

        const box = boxes.filter((box)=> normalizedRotation >= box.lowRange && normalizedRotation <= box.highRange)[0]
        if(box) setCurrentStage(box.index);
        else setCurrentStage(null);
        
      }
    })

    useEffect(()=>{
      const canvas = gl.domElement;
      canvas.addEventListener('pointerdown', handlePointerDown);
      canvas.addEventListener('pointerup', handlePointerUp);
      canvas.addEventListener('pointermove', handlePointerMove);
      document.addEventListener('keydown', handleKeyDown);
      document.addEventListener('keyup', handleKeyUp);

      return () =>{
        canvas.removeEventListener('pointerdown', handlePointerDown);
        canvas.removeEventListener('pointerup', handlePointerUp);
        canvas.removeEventListener('pointermove', handlePointerMove);
        document.removeEventListener('keydown', handleKeyDown);
        document.removeEventListener('keyup', handleKeyUp);
      }
    },[gl,handlePointerDown,handlePointerUp,handlePointerMove, handleKeyDown, handleKeyUp])
  
    return (
    <>
        <Bird/>
        <NightSky
            isRotating={isRotating}
            position={[0,0,-5]}
            rotationResult={rotationResult}
            rotation={islandRotation}
        />
        <Island
            position={islandPosition}
            scale={islandScale}
            rotation={islandRotation}
            isRotating={isRotating}
            setIsRotating={setIsRotating}
            setCurrentStage={setCurrentStage}
            rotationResult={rotationResult}
        />
        <Broomstick
            isRotating={isRotating}
            position={broomPosition}
            scale={broomScale}
            rotation={[0, 20, 0]}
        />
    </>
  )
}

export default ModelWrapper