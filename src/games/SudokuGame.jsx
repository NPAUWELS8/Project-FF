import { useEffect, useRef, useState } from 'react'
import { sudoku } from './gameplay/sudoku'

import Modal from 'components/Modal'

const SudokuGame = () => {
  const containerRef = useRef(null)
  const checkRef = useRef(null)
  const resetRef = useRef(null)
  const regenRef = useRef(null)
  const solveRef = useRef(null)
  const [isSuccess, setIsSuccess] = useState(false)

  useEffect(()=>{
    sudoku(containerRef.current, checkRef.current, solveRef.current, resetRef.current, regenRef.current)
  },[])
  return (
    <>
      <Modal
        isSuccess = {isSuccess}
      />
      <h1>Sudoku Challenge</h1>
      <div
        ref={containerRef}
        className={`grid grid-cols-9 grid-rows-9 justify-center items-center w-[576px] h-[576px]`}
      >
      </div>
      <button
        className="btn-magic m-12"
        ref={checkRef}
      >Check</button>
      <button
        className="btn-magic m-12"
        ref={resetRef}
      >Reset</button>
      <button
        className="btn-magic m-12"
        ref={regenRef}
      >Regenerate</button>
      <button
        className="btn-magic m-12"
        ref={solveRef}
        style={{display:"none"}}
      >Solve</button>
    </>
  )
}

export default SudokuGame