import React from 'react'
import GameInfo from 'components/GameInfo'
import { games } from 'constants/GamesConstant'

const {title, introText, controls, element} = games.find((el)=> el.title === "Piano");

const Piano = () => {
  return (
    <GameInfo
      title={title}
      introText={introText}
      controls={controls}
      game={element}
    />
  )
}

export default Piano