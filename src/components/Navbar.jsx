import { useContext, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { AppContext } from 'contexts/AppContext'
import ControlsInfo from 'components/ControlsInfo'

const Navbar = () => {
    const context = useContext(AppContext);
    const {count, total} = context.getGameFinishedCount();
    const {currentGame, house, getImage} = context;
    const [open, setOpen] = useState(false);

    function openControls(){
        setOpen(true);
    }


    return (
        <>
            <ControlsInfo
                open={open}
                setOpen={setOpen}
                gameTitle={currentGame}
            />
            <div className="absolute left-5 top-2 z-20">
                {house && 
                    <div>
                        <img className="h-30" src={getImage(house)} alt="Crest"/>
                    </div>
                }
            </div>
            <header className="header">
                <NavLink to="/intro" className="px-2 h-10 rounded-lg bg-white hover:bg-amber-50 hover:scale-110 active:bg-amber-100 active:scale-95 items-center justify-center flex font-bold shadow-md">
                    <p className="magic-gradient_text">Letter of Acceptance</p>
                </NavLink>
                <NavLink to="/" reloadDocument className="px-2 h-10 rounded-lg bg-white hover:bg-amber-50 hover:scale-110 active:bg-amber-100 active:scale-95 items-center justify-center flex font-bold shadow-md">
                    <p className="magic-gradient_text">Home</p>
                </NavLink>
                <NavLink to="/sort" className="px-2 h-10 rounded-lg bg-white hover:bg-amber-50 hover:scale-110 active:bg-amber-100 active:scale-95 items-center justify-center flex font-bold shadow-md">
                    <p className="magic-gradient_text">Sorting</p>
                </NavLink>
                <div className="flex text-lg gap-7 font-bold px-2 h-10 rounded-lg bg-white items-center justify-center shadow-md">
                    <h1 className="magic-gradient_text hover:cursor-default">
                        {`Trials Finished: ${count} / ${total}`}
                    </h1>
                </div>
                {currentGame && <div className="flex text-lg gap-7 font-bold px-2 h-10 rounded-lg bg-white items-center justify-center shadow-md hover:bg-amber-50 hover:scale-110 active:bg-amber-100 active:scale-95">
                        <button
                            className="magic-gradient_text hover:cursor-pointer"
                            onClick={openControls}
                        >Controls</button>
                    
                </div>
                }                
            </header>
        </>
    )
}

export default Navbar