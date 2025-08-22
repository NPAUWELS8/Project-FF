import {useContext} from 'react'
import { AppContext } from 'contexts/AppContext';
import { Home, Intro } from '.';


const HomePage = ({setShowNavBar,toIntro, setToIntro}) => {
    const context = useContext(AppContext);

  return (
    <>
    {!context.isFirstTime && !toIntro? <Home/> : <Intro setShowNavBar={setShowNavBar} setIsFirstTime={context.setIsFirstTime} toIntro={toIntro} setToIntro={setToIntro} />}
    </>
  )
}

export default HomePage