import { useRef, useEffect } from 'react';
import { useGLTF } from '@react-three/drei'
import { useFrame, useThree } from '@react-three/fiber'
import { a } from '@react-spring/three'

import { boxes } from 'constants/GamesConstant'


import islandScene from 'assets/3d/island.glb'

const Island = ({isRotating, setIsRotating, setCurrentStage, rotationResult, ...props}) => {
    const islandRef = useRef();
    const { nodes, materials } = useGLTF(islandScene)

    useFrame(()=>{
      islandRef.current.rotation.y = rotationResult.current;
    })


  return (
    <a.group ref={islandRef} {...props} >
      <mesh
        geometry={nodes.polySurface944_tree_body_0.geometry}
        material={materials.PaletteMaterial001}
      />
      <mesh
        geometry={nodes.polySurface945_tree1_0.geometry}
        material={materials.PaletteMaterial001}
      />
      <mesh
        geometry={nodes.polySurface946_tree2_0.geometry}
        material={materials.PaletteMaterial001}
      />
      <mesh
        geometry={nodes.polySurface947_tree1_0.geometry}
        material={materials.PaletteMaterial001}
      />
      <mesh
        geometry={nodes.polySurface948_tree_body_0.geometry}
        material={materials.PaletteMaterial001}
      />
      <mesh
        geometry={nodes.polySurface949_tree_body_0.geometry}
        material={materials.PaletteMaterial001}
      />
      <mesh
        geometry={nodes.pCube11_rocks1_0.geometry}
        material={materials.PaletteMaterial001}
      />
    </a.group>
  )
}

export default Island;