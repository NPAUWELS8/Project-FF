import { forwardRef, useContext, useEffect, useImperativeHandle, useRef, useState } from 'react'
import { AppContext } from 'contexts/AppContext'
import { scrollTo } from 'functions/functions'

import Modal from 'components/Modal'

class MemoryGrid {
  constructor(){
    this.initialImageArray = [];
    this.imageArray = [];
    this.images = [];
    this.colors = ["blue", "red", "green"];
    this.startNum = 2;
    this.endNum = 16;
  }
  #addImage(src, doubleKey, color){
    this.images.push(new MemoryImage(src, doubleKey, color))
  }
  createImageArray(){
    const imageArray = []
    for(let i = this.startNum; i <= this.endNum;i++){
      imageArray.push({number: i, color: "normal"})
    }
    this.initialImageArray = imageArray;
    this.imageArray = imageArray.map((value, index)=>index);
    console.log(this.imageArray);
  }
  addImages(){
    this.initialImageArray.forEach((card, index)=>{
      const {number, color} = card;
      const zero = Math.floor(number/10) >= 1 ? "" : "0";
      const imageSrc =  "/memory/IMG-20241218-WA00"+ zero + number + ".jpg";
      memoryGrid.#addImage(imageSrc,number, color);
      memoryGrid.#addImage(imageSrc,number, color);
    })
  }
  addColors(){
    for(let i=0;i< this.colors.length;i++){
      const random = Math.floor(Math.random() * this.imageArray.length)
      const value = this.imageArray[random]
      this.initialImageArray[value].color = this.colors[i];
      console.log(this.initialImageArray[value]);
      this.imageArray.splice(random,1);
    }
  }
  shuffle(){
    this.images.sort(()=>{
        return 1/2 - Math.random();
    })
  }
}

class MemoryImage {
  constructor(src, doubleKey, color){
    this.src = src;
    this.doubleKey = doubleKey;
    this.display = true;
    this.color = color;
  }
}

const memoryGrid = new MemoryGrid();
memoryGrid.createImageArray();
memoryGrid.addColors();
memoryGrid.addImages();

console.log(memoryGrid.images)

memoryGrid.shuffle();


const MemoryCard = forwardRef(({display, imgSource, color, house, doubleKey, setTurnedDoubleKey, count, setCount, turnedDoubleKey, removeCards, returnCards, setIsSuccess, setOpen}, ref) => {
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

    function getBorderColor(color){
      const map = {
        "red": "border-red-500",
        "green": "border-green-500",
        "blue": "border-blue-500"
      }

      if(map[color]) return `border-5 ${map[color]}`
      else return ""
    }

    return (
      <div className={`memory-card ${turned ? "is-flipped" : ""}`}>
        <div
          className={`card__inner ${turned ? "is-flipped": ""} ${isGone ? "is-gone": ""} ${isDisplayed ? "": "is-not-displayed"}`}
          onClick={onClickHandle}
        >
          <div className={`${ house === "Dulci" ? getBorderColor(color) : ""} card__face card__face--front flex w-full h-full justify-center items-center`}>
            <h2 className="text-[clamp(0.75rem,3vw,2.5rem)] text-white">Memory</h2>
          </div>
          <div className="card__face card__face--back hover:cursor-not-allowed">
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
  const {house, onGameFinished} = context;
  const cardRefs = useRef(null)
  if(cardRefs.current === null){
    cardRefs.current = new Array()
  }

  const [turnedDoubleKey, setTurnedDoubleKey] = useState(null);
  const [count, setCount] = useState(30)
  const [images, setImages] = useState(memoryGrid.images)
  const [open, setOpen] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  useEffect(()=>{
    //scroll back up after clicking continue in game info page
    scrollTo({
      scrollId: 'game-container',
      duration: 0,
      offset: 0
    })
  },[])

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
    <div className="pt-24 pb-50 overflow-hidden flex flex-col items-center">
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
              color={image.color}
              house={house}
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