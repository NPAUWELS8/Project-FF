import React, { useContext } from 'react'
import { Link } from 'react-router-dom';
import { arrow } from '../assets/icons';

import { AppContext } from 'contexts/AppContext';

import { boxes } from 'constants/GamesConstant'

const WelcomeBack = ({text}) =>{

    return (
        <div className="info-box neo-brutalism-magic">
            <p className="font-medium sm:text-xl text-center hover:cursor-default">{text}</p>
            🚀
        </div>
    )
}

const GameCompletion = ({text}) =>{

    return (
        <div className="info-box neo-brutalism-magic">
            <p className="font-medium sm:text-xl text-center hover:cursor-default">{text}</p>
        </div>
    )
}
//TODO: update the game completion text to include the actual game.
//TODO: add different texts from which one will be selected at random.
const HomeInfo = ({currentStage}) => {
    const context = useContext(AppContext);
    if(currentStage === 1 && context.isAfterGameComplete){
        return (<GameCompletion text="Congrats on completing game X!"/>)
    } else if(currentStage === 1 && !context.isFirstTime){
        return (<WelcomeBack text="Welcome Back!"/>)
    } else {
        const box = boxes.find(box=>box.index === currentStage)
        const info = box.infoBox
        return info || null;
    }
}

export default HomeInfo