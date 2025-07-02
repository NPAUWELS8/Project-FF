import { useContext, useEffect } from 'react'
import GameInfo from 'components/GameInfo'
import { games } from 'constants/GamesConstant'
import { useParams } from 'react-router-dom';
import { AppContext } from 'contexts/AppContext';

const Game = () => {
    const {setCurrentGame} = useContext(AppContext);
    const params = useParams();
    const {title, introText, controls, element} = games.find((el)=> el.url === params.game);
    
    useEffect(()=>{
      setCurrentGame(title);
    },[])


  return (
    <GameInfo
      title={title}
      introText={introText}
      controls={controls}
      game={element}
    />
  )
}

export default Game