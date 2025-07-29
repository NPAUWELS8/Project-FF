import { useRef } from 'react'
import { useGLTF } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'

import skyScene from 'assets/3d/nightsky.glb'

const NightSky = ({isRotating, rotationResult, ...props}) => {
    const skyRef = useRef();
    const { nodes, materials } = useGLTF(skyScene)

    useFrame((_,delta)=>{
        skyRef.current.rotation.y = rotationResult.current;
    })

    return (
        <group {...props} dispose={null}>
        <mesh
            ref={skyRef}
            geometry={nodes.pack1_Background_0.geometry}
            material={materials.Background}
            scale={5}
        />
        </group>
    )
}

export default NightSky