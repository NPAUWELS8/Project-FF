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
//TODO: update the game completion text to include the actual game.
//TODO: add different texts from which one will be selected at random.
const HomeInfo = ({currentStage}) => {
    const context = useContext(AppContext);
    if(currentStage === 1 && context.isAfterGameComplete){
        return (
                <GameCompletion text={`Congrats on completing game X! ${context.isAllGamesFinished ? "You have completed all games!" : "X Games remaining."}`}/>
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

export default HomeInfo