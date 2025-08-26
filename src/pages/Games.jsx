import { useContext, useEffect } from 'react'
import GameInfo from 'components/GameInfo'
import { games } from 'constants/GamesConstant'
import { useParams } from 'react-router-dom';
import { AppContext } from 'contexts/AppContext';

const Game = () => {
    const {setCurrentGame} = useContext(AppContext);
    const params = useParams();
    const {title, trialTitle, introText, controls, element, gamePowerHouse} = games.find((el)=> el.url === params.game);

    useEffect(()=>{
      setCurrentGame(title);
    },[])


  return (
    <GameInfo
      title={title}
      trialTitle={trialTitle}
      introText={introText}
      controls={controls}
      game={element}
      gamePowerHouse={gamePowerHouse}
    />
  )
}

export default Game