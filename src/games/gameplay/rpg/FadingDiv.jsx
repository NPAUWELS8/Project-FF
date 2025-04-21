import React from 'react'

const FadingDiv = ({overlay, gameSize}) => {
  const [gameWidth, gameHeight] = gameSize

  return (
    <div
      className={`${overlay ? 'opacity-100' : 'opacity-0'} w-[${gameWidth}px] h-[480px] bg-black absolute transition-opacity duration-1000`}
    ></div>
  )
}

export default FadingDiv