import { useContext, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { AppContext } from 'contexts/AppContext'
import ControlsInfo from 'components/ControlsInfo'

const Navbar = () => {
    const context = useContext(AppContext);
    const {count, total} = context.getGameFinishedCount();
    const {currentGame} = context;
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
            <header className="header">
                <NavLink to="/" className="px-2 h-10 rounded-lg bg-white hover:bg-amber-50 items-center justify-center flex font-bold shadow-md">
                    <p className="magic-gradient_text">Home</p>
                </NavLink>
                <div className="flex text-lg gap-7 font-bold px-2 h-10 rounded-lg bg-white items-center justify-center shadow-md">
                    <h1 className="magic-gradient_text hover:cursor-default">
                        {`Games finished: ${count} / ${total}`}
                    </h1>
                </div>
                {currentGame && <div className="flex text-lg gap-7 font-bold px-2 h-10 rounded-lg bg-white items-center justify-center shadow-md hover:bg-amber-50">
                        <button
                            className="magic-gradient_text hover:cursor-pointer"
                            onClick={openControls}
                        >Controls</button>
                    
                </div>
                }
                {/* <nav className="flex text-lg gap-7 font-medium">
                    <NavLink to="/about" className={({isActive})=> isActive ? 'text-blue-500' : 'text-black'}>
                        About
                    </NavLink>
                    <NavLink to="/projects" className={({isActive})=> isActive ? 'text-blue-500' : 'text-black'}>
                        Projects
                    </NavLink>
                </nav> */}
                
            </header>
        </>
    )
}

export default Navbar