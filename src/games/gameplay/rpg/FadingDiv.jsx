import React from 'react'

const FadingDiv = ({overlay, gameSize}) => {
  const [gameWidth, gameHeight] = gameSize

  return (
    <div
      className={`${overlay ? 'opacity-100' : 'opacity-0'} inset-0 bg-black absolute transition-opacity duration-1000`}
    ></div>
  )
}

export default FadingDiv