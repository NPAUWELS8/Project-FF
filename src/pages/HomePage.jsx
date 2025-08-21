import {useContext} from 'react'
import { AppContext } from 'contexts/AppContext';
import { Home, Intro } from '.';


const HomePage = ({setShowNavBar}) => {
    const context = useContext(AppContext);

  return (
    <>
    {!context.isFirstTime ? <Home/> : <Intro setShowNavBar={setShowNavBar} setIsFirstTime={context.setIsFirstTime} />}
    </>
  )
}

export default HomePage