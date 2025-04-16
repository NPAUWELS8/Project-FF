import React from 'react'
import { Link } from 'react-router-dom';
import { arrow } from '../assets/icons';

import { boxes } from 'constants/GamesConstant'


const HomeInfo = ({currentStage}) => {
    const box = boxes.find(box=>box.index === currentStage)
    const info = box.infoBox
    console.log(info);
    return info || null;
}

export default HomeInfo