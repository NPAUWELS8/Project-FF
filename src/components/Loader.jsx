import { Html } from '@react-three/drei'
import { useEffect } from 'react';

const Loader = ({setShowInfo}) => {
  
  useEffect(()=>{

    return ()=>{
      setShowInfo(true);
    }
  },[])

  return (
    <Html>
        <div className="flex justify-center items-center">
            <div className="loader">

            </div>
        </div>
    </Html>
  )
}

export default Loader