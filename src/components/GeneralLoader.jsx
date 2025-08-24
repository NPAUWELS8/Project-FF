const GeneralLoader = ({className}) => {
  return (
        <div className={`bg-black-200 z-[100] flex justify-center items-center fixed top-0 left-0 w-screen h-screen ${className}`}>
            <div className="loader">

            </div>
        </div>
  )
}

export default GeneralLoader