import { useRef, useEffect } from 'react'
import { useAnimations, useGLTF } from '@react-three/drei';

import broomstickScene from 'assets/3d/broomstick.glb'

const Broomstick = ({isRotating, ...props}) => {
    const ref = useRef(null)
    const {scene, animations} = useGLTF(broomstickScene);
    const { actions } = useAnimations(animations, ref);

    useEffect(()=>{
        if(isRotating){
            actions['Animation'].play();
        } else{
            actions['Animation'].stop();
        }
    },[actions, isRotating])

  return (
    <mesh ref={ref} {...props}>
        <primitive object={scene}/>
    </mesh>
  )
}

export default Broomstick