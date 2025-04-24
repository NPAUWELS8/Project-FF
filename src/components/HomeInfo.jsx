import React, { useContext } from 'react'
import { Link } from 'react-router-dom';
import { arrow } from '../assets/icons';

import { AppContext } from 'contexts/AppContext';

import { boxes } from 'constants/GamesConstant'

const WelcomeBack = () =>{

    return (<div>Welcome Back</div>)
}

const GameCompletion = () =>{

    return (<div>Congrats on completing the game!</div>)
}

const HomeInfo = ({currentStage}) => {
    const context = useContext(AppContext);
    if(currentStage === 1 && context.isAfterGameComplete){
        return (<GameCompletion/>)
    } else if(currentStage === 1 && !context.isFirstTime){
        return (<WelcomeBack/>)
    } else {
        const box = boxes.find(box=>box.index === currentStage)
        const info = box.infoBox
        return info || null;
    }
}

export default HomeInfo