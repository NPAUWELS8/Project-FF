/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Author: Paul (https://sketchfab.com/paul_paul_paul)
License: CC-BY-4.0 (http://creativecommons.org/licenses/by/4.0/)
Source: https://sketchfab.com/3d-models/free-skybox-in-the-cloud-b270497defe24f9cb497b9a075eeb28f
Title: FREE - SkyBox In The Cloud
*/

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