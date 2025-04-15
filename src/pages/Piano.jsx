import React from 'react'
import GameInfo from '../components/GameInfo'

const Piano = () => {
  return (
    <GameInfo
    title="Piano"
    introText="This is the pianogame."
    controls={`Use following keys...
        Key 1:
        Key 2:
        blabla bla`}
    />
  )
}

export default Piano