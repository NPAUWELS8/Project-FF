import { useEffect, useRef, useState } from 'react'
import { generateRandomSudoku } from './gameplay/sudoku'

import Modal from 'components/Modal'

const SudokuGame = () => {
  const [open, setOpen] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const obj = generateRandomSudoku()

  const [sudokuValues, setSudokuValues] = useState(obj.array);
  const [shownValues, setShownValues] = useState(obj.shownArray);
  const [values, setValues] = useState(obj.shownArray)

  function onInputChange(value, index){
    console.log(value);
    const newValues = [...values]
    newValues[index] = value;
    console.log(newValues);
    setValues(newValues);
  }

  function checkValues(){
    setOpen(true);
    setIsSuccess(values.every((value, index) => value === sudokuValues[index]))
  }

  function resetValues(){
    setValues(shownValues);
  }

  function solveSudoku(){
    setValues(sudokuValues);
  }

  function regenerateSudoku(){
    const obj = generateRandomSudoku();
    setSudokuValues(obj.array);
    setShownValues(obj.shownArray);
    setValues(obj.shownArray);
  }

  return (
    <div
    className="mt-24 ml-12"
    >
      <Modal
        open={open}
        setOpen={setOpen}
        isSuccess = {isSuccess}
      />
      <h1 className="head-text-magic">
          <span className="magic-text font-semibold drop-shadow">Sudoku Challenge</span>
      </h1>
      <div
        className={`grid grid-cols-9 grid-rows-9 justify-center items-center w-[576px] h-[576px]`}
      >
        {values.map((value, index) =>{
        if(shownValues[index] !==""){
          return (
            <input
            className= {`font-bold border-1 ${(index % 9 === 2 || index % 9 ===5) ? "border-r-3" : ""} ${(Math.floor(index / 9) === 2 || Math.floor(index / 9) ===5) ? "border-b-3" : ""} aspect-square text-center w-[64px]`}
            key={index}
            value={value}
            type="text"
            readOnly
            onChange={e => onInputChange(e.target.value, index)}></input>
          )
        } else{
          return (
            <input
            className= {`border-1 ${(index % 9 === 2 || index % 9 ===5) ? "border-r-3" : ""} ${(Math.floor(index / 9) === 2 || Math.floor(index / 9) ===5) ? "border-b-3" : ""} aspect-square text-center w-[64px]`}
            key={index}
            value={value}
            type="text"
            onChange={e => onInputChange(e.target.value, index)}></input>
          )
        }
        
        })}
      </div>
      <button
        className="btn-magic m-12"
        onClick={checkValues}
      >Check</button>
      <button
        className="btn-magic m-12"
        onClick={resetValues}
      >Reset</button>
      <button
        className="btn-magic m-12"
        onClick={regenerateSudoku}
      >Regenerate</button>
      <button
        className="btn-magic m-12"
        onClick={solveSudoku}
        style={{display:"none"}}
      >Solve</button>
    </div>
  )
}

export default SudokuGame