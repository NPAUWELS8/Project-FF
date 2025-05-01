import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react'

//TODO: Check if you can ensure rerendering the page doesn't put you back on top of the page again (when finding a double)

class MemoryGrid {
  constructor(){
    this.images = []
  }
  addImage(src, doubleKey){
    this.images.push(new MemoryImage(src, doubleKey))
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
  const imageSrc =  "/memory/IMG-20241218-WA00"+ zero + i + ".jpg";
  memoryGrid.addImage(imageSrc,i);
  memoryGrid.addImage(imageSrc,i);
}


const MemoryCard = forwardRef(({display, imgSource, doubleKey, setTurnedDoubleKey, count, setCount, turnedDoubleKey, removeCards, returnCards}, ref) => {
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
    }

    function doubleNotFound(){
      setTurned(true)
      setTurnedDoubleKey("")
      setTimeout(()=>{
        returnCards(doubleKey, turnedDoubleKey)
      }, 1000)
    }

    //TODO: Fix proper width for the images
    return (
      <div className={`memory-card ${turned ? "is-flipped" : ""}`}>
        <div
          className={`card__inner ${turned ? "is-flipped": ""} ${isGone ? "is-gone": ""} ${isDisplayed ? "": "is-not-displayed"}`}
          onClick={onClickHandle}
        >
          <div className="card__face card__face--front">
            <h2>Memory</h2>
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
  const cardRefs = useRef(null)
  if(cardRefs.current === null){
    cardRefs.current = new Array()
  }

  const [turnedDoubleKey, setTurnedDoubleKey] = useState(null);
  const [count, setCount] = useState(30)
  const [images, setImages] = useState(memoryGrid.images)

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
    <div className="mt-24 overflow-hidden">
      <div id="cardCount"  className="top-bar">
        <p>Memory cards left</p>
        <p id="count">{count}</p>
      </div>
      <div className="grid grid-cols-5 mr-24 ml-12" id="container">
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
          />
        ))}
      </div>
    </div>
  )
}

export default MemoryGame