import { hogwartsEmblem, hogwartsSeal } from 'assets/images'
import { useLayoutEffect } from 'react';

const Intro = ({setShowNavBar, setIsFirstTime}) => {

    useLayoutEffect(()=>{
        setShowNavBar(false);
    })

    function handleButtonClick(){
        setShowNavBar(true)
        setIsFirstTime(false)
    }

    return (
        <section id="parchment-section" className="z-0 min-h-screen w-screen hover:cursor-default">
            <div id="parchment-container" className="font-bilbo-swash-caps text-8xl">
                <div className="main-parchment">
                    <div id="parchment" className="mt-5"></div>
                    <div id="contain">
                    <p className="inkTitle">Letter Of Invitation</p>
                    <h1 className="text-6xl">Intro</h1>
                    Intro
                    <p id="labarum" className="-my-20"><img src={hogwartsEmblem}/></p>
                    <h1 className="text-6xl">Description</h1>
                    description
                        <div className="mb-10 flex flex-row justify-between items-center">
                            <button className="btn-magic mt-12" onClick={handleButtonClick}>Continue</button>
                            <div>
                                <p className="cachet"><img src={hogwartsSeal}/></p>
                                <div id="signature" className="text-4xl">Game Overseer Nielske Pauwels<br />Keeper of Philosofloor's stone</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Intro