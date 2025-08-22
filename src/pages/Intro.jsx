import { hogwartsEmblem, hogwartsSeal } from 'assets/images'
import { useLayoutEffect, useContext } from 'react';
import { games } from 'constants/GamesConstant'
import gsap from 'gsap'
import { AppContext } from 'contexts/AppContext';
import { useImagePreloader } from 'hooks';
import GeneralLoader from 'components/GeneralLoader';

const preloadImages = ["assets/images/background.jpeg","assets/images/background-noise.png", hogwartsSeal, hogwartsEmblem]

const Intro = ({setShowNavBar, setIsFirstTime, toIntro, setToIntro}) => {
    const context = useContext(AppContext);
    const imagesLoaded = useImagePreloader(preloadImages);

    useLayoutEffect(()=>{
        setShowNavBar(false);
    })

    function handleSignClick(){
        const tl = gsap.timeline({
            onComplete: ()=>{
                setShowNavBar(true)
                setIsFirstTime(false)
                setToIntro(false);
            },
            onStart: ()=>{
                const date = new Date().toLocaleDateString();
                context.setSignedDate(date);
            }
        });
        tl
        .to("#sign-date",{
            duration: 1,
            color:"black"
        })
        .to("#sign-name",{
            duration: 2,
            color: "black"
        })
        
    }

    function handleContinueClick(){
        setShowNavBar(true)
        setToIntro(false);
    }

    return (
        <section id="parchment-section" className="z-0 min-h-screen w-screen hover:cursor-default">
            <div id="parchment-container" className={`font-bilbo-swash-caps text-8xl ${imagesLoaded ? "opacity-100" : "opacity-0"}`}>
                <div className="main-parchment">
                    <div id="parchment" className="mt-5"></div>
                    <div id="contain">
                        <p className="inkTitle">Letter Of Invitation</p>
                        <h1 className="text-6xl mb-20">Acceptance</h1>
                        <div className="text-4xl">
                            <p className="mb-10">Dear Floorie,</p>
                            <p className="mb-5">It gives me great pleasure to inform you that you have been chosen as the bearer of the Philosofloor’s Stone, a most ancient and powerful artifact that takes the humble form of a ring.</p>
                            <p>This treasured object is no ordinary jewel; it signifies the eternal bond of loyalty, courage, and love.</p>
                        </div>
                        <p id="labarum" className="-my-20"><img src={hogwartsEmblem}/></p>
                        <h1 className="text-6xl mb-20">Trials</h1>
                        <div className="text-4xl">
                            <p className="pb-5">However, such an honor cannot be bestowed without trial. In order to prove yourself worthy of wearing the Stone, you must face a series of challenges designed to test the very qualities it represents:</p>
                            {games.map((game, index)=>
                                <p className="py-2"><b>{index + 1}. {game.trial}</b> - {game.trialText}</p>
                            )}
                            <p className="pt-20">Upon completing these trials, the Stone shall accept you as its rightful bearer, and your acceptance into its mysteries shall be complete.</p>
                            <p>We await your success with great anticipation, and trust that you will rise to the occasion with the courage and heart befitting a true romantasist.</p>
                        </div>
                        <div className="mb-10 flex flex-row justify-between items-center">
                            <div>
                                <p id="sign-name" className={`${toIntro ? "" : "text-transparent"}`}>Floor Bartier</p>
                                <p id="sign-date" className={`${toIntro ? "" : "text-transparent"} text-5xl pt-5`}>{context.signDate}</p>
                                {toIntro ? <button className="btn-magic mt-12" onClick={handleContinueClick}>Continue</button> : <button className="btn-magic mt-12" onClick={handleSignClick}>Sign</button>}
                            </div>
                            <div>
                                <p className="cachet"><img src={hogwartsSeal}/></p>
                                <div id="signature" className="text-4xl">Game Overseer Nielske Pauwels<br />Keeper of Philosofloor's stone</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <GeneralLoader className={`${imagesLoaded ? "hidden" : ""}`}/>
        </section>
    )
}

export default Intro