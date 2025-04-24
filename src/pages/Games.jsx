import React from 'react'
import GameInfo from 'components/GameInfo'
import { games } from 'constants/GamesConstant'
import { useParams } from 'react-router-dom';

const Game = () => {
    const params = useParams();
    const {title, introText, controls, element} = games.find((el)=> el.url === params.game);


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