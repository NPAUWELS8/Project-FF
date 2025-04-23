import { useEffect, useRef, useState } from 'react'
import { generateRandomSudoku } from './gameplay/sudoku'

import Modal from 'components/Modal'

const SudokuGame = () => {
  const [open, setOpen] = useState(false)
  const containerRef = useRef(null)
  const checkRef = useRef(null)
  const resetRef = useRef(null)
  const regenRef = useRef(null)
  const solveRef = useRef(null)
  const [isSuccess, setIsSuccess] = useState(false)

  const obj = generateRandomSudoku()

  const [sudokuValues, setSudokuValues] = useState(obj.array);
  const [shownValues, setShownValues] = useState(obj.shownValues);
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
      <h1>Sudoku Challenge</h1>
      <div
        ref={containerRef}
        className={`grid grid-cols-9 grid-rows-9 justify-center items-center w-[576px] h-[576px]`}
      >
        {values.map((value, index) => (
          <input
          className= {`border-1 ${(index % 9 === 2 || index % 9 ===5) ? "border-r-3" : ""} ${(Math.floor(index / 9) === 2 || Math.floor(index / 9) ===5) ? "border-b-3" : ""} aspect-square text-center w-[64px]`}
          key={index}
          value={value}
          type="text"
          onChange={e => onInputChange(e.target.value, index)}></input>
        ))}
      </div>
      <button
        className="btn-magic m-12"
        ref={checkRef}
        onClick={checkValues}
      >Check</button>
      <button
        className="btn-magic m-12"
        ref={resetRef}
        onClick={resetValues}
      >Reset</button>
      <button
        className="btn-magic m-12"
        ref={regenRef}
        onClick={regenerateSudoku}
      >Regenerate</button>
      <button
        className="btn-magic m-12"
        ref={solveRef}
        onClick={solveSudoku}
        style={{display:"none"}}
      >Solve</button>
    </div>
  )
}

export default SudokuGame