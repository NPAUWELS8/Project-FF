import { useContext, useState } from 'react'
import { generateRandomSudoku } from './gameplay/sudoku'
import { AppContext } from 'contexts/AppContext'

import Modal from 'components/Modal'

const SudokuGame = ({title}) => {
  const context = useContext(AppContext);
  const onGameFinished = context.onGameFinished

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
    className="mt-24"
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
      <div className="w-full max-w-screen-sm px-4 mx-auto">
        <div
          className="grid grid-cols-9 aspect-square"
        >
          {values.map((value, index) =>{
          if(shownValues[index] !==""){
            return (
              <input
              className= {`font-bold bg-slate-200 border-1 ${(index % 9 === 2 || index % 9 ===5) ? "border-r-3" : ""} ${(Math.floor(index / 9) === 2 || Math.floor(index / 9) ===5) ? "border-b-3" : ""} aspect-square text-center w-full h-full text-[clamp(0.75rem,2.5vw,1.25rem)]`}
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