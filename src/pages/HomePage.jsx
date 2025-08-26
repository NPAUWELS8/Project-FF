import {useContext, useEffect, useState} from 'react'
import { AppContext } from 'contexts/AppContext';
import { Home } from '.';
import GeneralLoader from 'components/GeneralLoader'
import { useAppNavigate } from 'hooks';


const HomePage = () => {
    const [isCheckingReroutes, setIsCheckingReroutes] = useState(true);
    const context = useContext(AppContext);
    const navigate = useAppNavigate()
    const {signDate, house} = context;

    //check required reroutes before rendering actual homepage
    useEffect(()=>{
      if(!signDate){
        navigate("/intro");
      }
      else if(!house){
        navigate("/sort");
      }
      else setIsCheckingReroutes(false);

    },[isCheckingReroutes])

    return (
      <>
      {isCheckingReroutes ? <GeneralLoader/> : <Home/>}
      </>
    )
}

export default HomePage