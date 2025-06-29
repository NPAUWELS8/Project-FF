import React, { useContext } from 'react'
import { Link } from 'react-router-dom';
import { arrow } from '../assets/icons';

import { AppContext } from 'contexts/AppContext';

import { boxes } from 'constants/GamesConstant'

const WelcomeBack = ({text}) =>{
    const context = useContext(AppContext);
    return (
        <div className="info-box neo-brutalism-magic">
            <p className="font-medium sm:text-xl text-center hover:cursor-default">{text}</p>
            🚀
            {
                context.isAllGamesFinished
                && 
                <Link 
                    to="/reveal"
                    className="neo-brutalism-white neo-btn-magic"
                >Reveal Location</Link>
            }
        </div>
    )
}

const GameCompletion = ({text}) =>{
    const context = useContext(AppContext);
    return (
        <div className="info-box neo-brutalism-magic">
            <p className="font-medium sm:text-xl text-center hover:cursor-default">{text}</p>
            {
                context.isAllGamesFinished
                && 
                <Link 
                    to="/reveal"
                    className="neo-brutalism-white neo-btn-magic"
                >Reveal Location</Link>
            }
        </div>
    )
}
const HomeInfo = ({currentStage}) => {
    const context = useContext(AppContext);
    if(currentStage === 1 && context.isAfterGameComplete){
        return (
                <GameCompletion text={`${generateText(context.lastGameFinished)} ${context.isAllGamesFinished ? "You have completed all games!" : "X Games remaining."}`}/>
        );
    } else if(currentStage === 1 && !context.isFirstTime){
        return (
                <WelcomeBack text={`Welcome Back! ${context.isAllGamesFinished ?  "You have already completed all games!" : "X more games are waiting for you!"}`}/>
        );
    } else {
        const box = boxes.find(box=>box.index === currentStage)
        const info = box.infoBox
        return info || null;
    }
}

function generateText(name){
    const texts = [
        `You have completed game "${name}"! Nice.`,
        `Congrats on completing game "${name}"!`,
        `That's another game checked off: "${name}". Keep it up!`
    ]

    return texts[Math.floor(Math.random() * texts.length)]
}

export default HomeInfo