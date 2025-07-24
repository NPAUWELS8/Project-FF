import { useState } from 'react'
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react'
import { ComputerDesktopIcon } from '@heroicons/react/24/outline'
import { useNavigate } from 'react-router-dom'
import { games } from 'constants/GamesConstant'



const ControlsElem = ({gameTitle, setOpen}) => {
  const navigate = useNavigate();

  const game = games.find((game)=>game.title === gameTitle)

  function onContinue(){
    // navigate('/');
    setOpen(false);
  }

  return (
    <DialogPanel
            transition
            className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all data-closed:translate-y-4 data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in sm:my-8 sm:w-full sm:max-w-lg data-closed:sm:translate-y-0 data-closed:sm:scale-95"
          >
            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              <div className="sm:flex sm:items-start">
                <div className="mx-auto flex size-12 shrink-0 items-center justify-center rounded-full bg-yellow-100 sm:mx-0 sm:size-10">
                  <ComputerDesktopIcon aria-hidden="true" className="size-6 text-amber-600" />
                </div>
                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                  <DialogTitle as="h3" className="text-base font-semibold text-amber-600">
                    Controls:
                  </DialogTitle>
                  <div className="mt-2">
                    {game.controls}
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
              <button
                type="button"
                onClick={() => onContinue()}
                className="inline-flex w-full justify-center rounded-md bg-amber-500 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-amber-400 sm:ml-3 sm:w-auto hover:cursor-pointer"
              >
                Continue.
              </button>
            </div>
          </DialogPanel>
  )
}

const ControlModal = ({open, setOpen, gameTitle}) => {
  return (
    <Dialog open={open} onClose={setOpen} className="relative z-10">
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-gray-500/75 transition-opacity data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in"
      />
      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <ControlsElem
            gameTitle={gameTitle}
            setOpen={setOpen}
          />
        </div>
      </div>
    </Dialog>
  )
}

export default ControlModal