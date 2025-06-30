import React, { useContext } from 'react'
import { Link } from 'react-router-dom';
import { arrow } from '../assets/icons';
import { MapPinIcon } from '@heroicons/react/24/solid'

import { AppContext } from 'contexts/AppContext';

import { boxes } from 'constants/GamesConstant'

const WelcomeBack = ({header, text, isShown}) =>{
    const context = useContext(AppContext);
    return (
        <div className="info-box neo-brutalism-magic">
            <div className="font-medium sm:text-xl hover:cursor-default">
                <h1 className="text-center bg-white text-amber-500 rounded-xl">{header}</h1>
                <br/>
                <p>{text}</p>
            </div>
            <br/>
            To fly around the house:
            <br/>
            1. Drag the screen with your mouse
            <br/>
            2. Or use the left and right arrows.
            <br/>
            <br/>
            You'll find games along the way. 🧹
            {
                isShown
                && 
                <Link 
                    to="/reveal"
                    className="neo-brutalism-white neo-btn-magic"
                >Reveal Location
                <MapPinIcon aria-hidden="true" className="size-6 text-amber-600" />
                </Link>
            }
        </div>
    )
}

const GameCompletion = ({header, text,isShown}) =>{
    const context = useContext(AppContext);

    return (
        <div className="info-box neo-brutalism-magic">
            <div className="font-medium sm:text-xl hover:cursor-default">
                <h1 className="text-center bg-white text-amber-500 rounded-xl">{header}</h1>
                <p>{text}</p>
            </div>
            <br/>
            To fly around the house:
            <br/>
            1. Drag the screen with your mouse
            <br/>
            2. Or use the left and right arrows.
            <br/>
            <br/>
            You'll find games along the way. 🧹
            {
                isShown
                && 
                <Link 
                    to="/reveal"
                    className="neo-brutalism-white neo-btn-magic"
                >Reveal Location
                <MapPinIcon aria-hidden="true" className="size-6 text-amber-600" />
                </Link>
            }
        </div>
    )
}
const HomeInfo = ({currentStage}) => {
    const context = useContext(AppContext);
    const {count, total} = context.getGameFinishedCount();

    if(currentStage === 1 && context.isAfterGameComplete){
        return (
                <GameCompletion 
                    header={`${generateText(context.lastGameFinished)}`}
                    text= {`${count === total ? "You have completed all games!" : (total-count) + " games remaining."}`}
                    isShown={count === total}
                />
        );
    } else if(currentStage === 1 && !context.isFirstTime){
        return (
                <WelcomeBack
                    header={`Welcome Back!`}
                    text={`${count === total ?  "You have already completed all games!" : (total-count) + " more games are waiting for you!"}`}
                    isShown={count ===  total}    
                />
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