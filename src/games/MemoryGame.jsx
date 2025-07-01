import { forwardRef, useContext, useEffect, useImperativeHandle, useRef, useState } from 'react'
import { AppContext } from 'contexts/AppContext'

import Modal from 'components/Modal'

class MemoryGrid {
  constructor(){
    this.images = []
  }
  addImage(src, doubleKey){
    this.images.push(new MemoryImage(src, doubleKey))
  }
  shuffle(){
    this.images.sort(()=>{
        return 1/2 - Math.random();
    })
  }
}

class MemoryImage {
  constructor(src, doubleKey){
    this.src = src;
    this.doubleKey = doubleKey;
    this.display = true;
  }
}

const memoryGrid = new MemoryGrid();

for(let i = 2; i <=16;i++){
  const zero = Math.floor(i/10) >= 1 ? "" : "0";
  const imageSrc =  "/Project-FF/memory/IMG-20241218-WA00"+ zero + i + ".jpg";
  memoryGrid.addImage(imageSrc,i);
  memoryGrid.addImage(imageSrc,i);
}
memoryGrid.shuffle();


const MemoryCard = forwardRef(({display, imgSource, doubleKey, setTurnedDoubleKey, count, setCount, turnedDoubleKey, removeCards, returnCards, setIsSuccess, setOpen}, ref) => {
    const [turned, setTurned] = useState(false)
    const [isGone, setIsGone] = useState(false);
    const [isDisplayed, setIsDisplayed] = useState(display);

    useImperativeHandle(ref, () => {
      return {
        handleTurned() {
          setTurned(false);
        },
        handleDisplayed(){
          setIsGone(true);
          setTimeout(()=>{
            setIsDisplayed(false);
          }, 1000)
        }
      };
    }, []);
    
    function onClickHandle(){
      if(turnedDoubleKey && !turned){
        if(doubleKey===turnedDoubleKey){
          doubleFound()
        } else{
          doubleNotFound()
        }
      } else{
        setTurnedDoubleKey(doubleKey)
        setTurned(true)
      }
    }

    function doubleFound(){
      setTurned(true)
      setTurnedDoubleKey("")
      setCount(count-2)
      setTimeout(()=>{
        removeCards(doubleKey);
      },1000)
      if(count - 2 <= 0){
        setIsSuccess(true)
        setOpen(true)
      }
    }

    function doubleNotFound(){
      setTurned(true)
      setTurnedDoubleKey("")
      setTimeout(()=>{
        returnCards(doubleKey, turnedDoubleKey)
      }, 1000)
    }

    return (
      <div className={`memory-card ${turned ? "is-flipped" : ""}`}>
        <div
          className={`card__inner ${turned ? "is-flipped": ""} ${isGone ? "is-gone": ""} ${isDisplayed ? "": "is-not-displayed"}`}
          onClick={onClickHandle}
        >
          <div className="card__face card__face--front flex w-full h-full place-content-center">
            <h2 className="text-[clamp(0.75rem,3vw,1.5rem)] text-white">Memory</h2>
          </div>
          <div className="card__face card__face--back">
            <img
              src={imgSource}
            />
          </div>
        </div>
      </div>
    )
 })

const MemoryGame = ({title}) => {
  const context = useContext(AppContext);
  const cardRefs = useRef(null)
  if(cardRefs.current === null){
    cardRefs.current = new Array()
  }

  const [turnedDoubleKey, setTurnedDoubleKey] = useState(null);
  const [count, setCount] = useState(30)
  const [images, setImages] = useState(memoryGrid.images)
  const [open, setOpen] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const onGameFinished = context.onGameFinished

  function removeCards(doubleKey){
    cardRefs.current.forEach((card)=>{
      if(card[1]===doubleKey){
        card[0].handleDisplayed()
      }
    })
  }

  function returnCards(doubleKey, turnedDoubleKey){
    cardRefs.current.forEach((card)=>{
      if(card[1]===doubleKey || card[1] === turnedDoubleKey){
        card[0].handleTurned()
      }
    })
  }

  return (
    <div className="mt-24 overflow-hidden flex flex-col items-center">
      <Modal
        open={open}
        setOpen={setOpen}
        isSuccess = {isSuccess}
        onGameFinished={onGameFinished}
        gameTitle={title}
      />
      <div id="cardCount"  className="flex flex-col w-[90%] backdrop-opacity-75 rounded-[15px] justify-center text-center top-bar text-white m-[1vw] px-10 py-1 text-[clamp(0.75rem,3vw,1.5rem)]">
        <p>Memory cards left</p>
        <p id="count">{count}</p>
      </div>
      <div className="w-full max-w-screen px-4 mx-auto">
        <div className="grid grid-cols-5 justify-items-center aspect-square" id="container">
          {images.map((image, index)=>(
            <MemoryCard
              key={index}
              ref={(element) => cardRefs.current[index] = [element, image.doubleKey]}
              display = {image.display}
              imgSource={image.src}
              doubleKey={image.doubleKey}
              setTurnedDoubleKey={setTurnedDoubleKey}
              count={count}
              setCount={setCount}
              turnedDoubleKey={turnedDoubleKey}
              removeCards={removeCards}
              returnCards={returnCards}
              setIsSuccess={setIsSuccess}
              setOpen={setOpen}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default MemoryGame