import { useRef, useEffect } from 'react'
import { useAnimations,useGLTF } from '@react-three/drei'
import { useFrame } from '@react-three/fiber';

import birdScene from '../assets/3d/bird.glb'

const Bird = () => {
    const birdRef = useRef(null);
    const { scene, animations } = useGLTF(birdScene)
    const {actions} = useAnimations(animations, birdRef)

    useEffect(()=>{
        actions['Take 001'].play()
    },[])

    useFrame(({clock, camera})=>{
        birdRef.current.position.y = Math.sin(clock.elapsedTime) * 0.2 + 2;
        if(birdRef.current.position.x > camera.position.x + 20){
            birdRef.current.rotation.y = Math.PI;
        } else if(birdRef.current.position.x < camera.position.x - 20){
            birdRef.current.rotation.y = 0;
        }
        if(birdRef.current.rotation.y === 0 ) {
            birdRef.current.position.x += 0.05;
            birdRef.current.position.z -= 0.01;
        } else {
            birdRef.current.position.x -= 0.05;
            birdRef.current.position.z += 0.01;
        }
    })

    return (
        <mesh ref={birdRef} position={[-1,1,1]} scale={[0.003,0.003,0.003]}>
            <primitive object= {scene} />
        </mesh>
    )
}

export default Bird