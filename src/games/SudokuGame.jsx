import { useContext, useState } from 'react'
import { generateRandomSudoku } from './gameplay/sudoku'
import { AppContext } from 'contexts/AppContext'

import Modal from 'components/Modal'

const SudokuGame = ({title, gamePowerHouse}) => {
  const context = useContext(AppContext);
  const {onGameFinished, house} = context
  const isPowerUp = house === gamePowerHouse;
  const [open, setOpen] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const obj = generateRandomSudoku()

  const [sudokuValues, setSudokuValues] = useState(obj.array);
  const [shownValues, setShownValues] = useState(obj.shownArray);
  const [powerUpValues, setPowerUpValues] = useState(obj.powerUp.array);
  const [powerUpRow, setPowerUpRow] = useState(obj.powerUp.randomRow);
  const [powerUpCol, setpowerUpCol] = useState(obj.powerUp.randomColumn);
  const [values, setValues] = useState(obj.shownArray);
  const [powerUpUsed, setPowerUpUsed] = useState(false);

  const isPowerUpCell = (index) => {
    const row = Math.floor(index / 9);
    const column = index % 9;
    return row === powerUpRow || column === powerUpCol;
  }

  function onInputChange(value, index){
    const newValues = [...values]
    newValues[index] = value;
    setValues(newValues);
  }

  function checkValues(){
    setOpen(true);
    setIsSuccess(values.every((value, index) => value === sudokuValues[index]))
  }

  function resetValues(){
    setValues(shownValues);
    setPowerUpUsed(false);
  }

  function solveSudoku(){
    setValues(sudokuValues);
  }

  function powerUp(){
    setValues(powerUpValues)
    setPowerUpUsed(true);
  }

  function regenerateSudoku(){
    const obj = generateRandomSudoku();
    setSudokuValues(obj.array);
    setShownValues(obj.shownArray);
    setValues(obj.shownArray);
    setPowerUpValues(obj.powerUp.array);
    setPowerUpRow(obj.powerUp.randomRow);
    setpowerUpCol(obj.powerUp.randomColumn);
    setPowerUpUsed(false);
  }

  return (
    <div
    className="pt-24 pb-30"
    >
      <Modal
        open={open}
        setOpen={setOpen}
        isSuccess = {isSuccess}
        onGameFinished={onGameFinished}
        gameTitle={title}
      />
      <h1 className="head-text-magic flex justify-center">
          <span className="magic-text font-semibold drop-shadow">Sudoku Challenge</span>
      </h1>
      <div className="w-full max-w-screen-sm xl:max-w-[60vh] bg-white mx-auto">
        <div
          className="grid grid-cols-9 aspect-square"
        >
          {values.map((value, index) =>{
          if(shownValues[index] !=="" || (isPowerUpCell(index) && powerUpUsed)){
            return (
              <input
              className= {`font-bold ${isPowerUpCell(index) && powerUpUsed ? "bg-orange-300" : "bg-slate-200" }  border-1 ${(index % 9 === 2 || index % 9 ===5) ? "border-r-3" : ""} ${(Math.floor(index / 9) === 2 || Math.floor(index / 9) ===5) ? "border-b-3" : ""} aspect-square text-center w-full h-full text-[clamp(0.75rem,2.5vw,1.25rem)]`}
              key={index}
              value={value}
              type="text"
              readOnly
              onChange={e => onInputChange(e.target.value, index)}></input>
            )
          } else{
            return (
              <input
              className= {`border-1 ${(index % 9 === 2 || index % 9 ===5) ? "border-r-3" : ""} ${(Math.floor(index / 9) === 2 || Math.floor(index / 9) ===5) ? "border-b-3" : ""} aspect-square text-center w-full h-full text-[clamp(0.75rem,2.5vw,1.25rem)]`}
              key={index}
              value={value}
              type="text"
              onChange={e => onInputChange(e.target.value, index)}></input>
            )
          }
          
          })}
        </div>
      </div>
      <div className="flex justify-center items-center flex-col sm:flex-row">
        <button
          className="btn-magic mx-2 my-5"
          onClick={checkValues}
        >Check</button>
        <button
          className="btn-magic mx-2 my-5"
          onClick={resetValues}
        >Reset</button>
        <button
          className="btn-magic mx-2 my-5"
          onClick={regenerateSudoku}
        >Regenerate</button>
        {isPowerUp && !powerUpUsed && <button
          className="btn-magic mx-2 my-5"
          onClick={powerUp}
        >Use Power Up!</button>}
        <button
          className="btn-magic mx-2 my-5"
          onClick={solveSudoku}
          style={{display:"none"}}
        >Solve</button>
      </div>
    </div>
  )
}

export default SudokuGame