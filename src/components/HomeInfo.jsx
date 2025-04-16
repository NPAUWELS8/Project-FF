import React from 'react'
import { Link } from 'react-router-dom';
import { arrow } from '../assets/icons';

import { boxes } from 'constants/GamesConstant'

const InfoBox = ({text, link, btnText})=>(
    <div className="info-box neo-brutalism-blue">
        <p className="font-medium sm:text-xl text-center">{text}</p>
        <Link to={link} className="neo-brutalism-white neo-btn">
            {btnText}
            <img src={arrow} className="w-4 h-4 object-contain"/>
        </Link>
    </div>
)

const renderContent = {
    1: (
        <h1 className="sm:text-xl sm:leading-snug text-center neo-brutalism-blue py-4 px-8 text-white mx-5">
            Hi, I am <span className="font-semibold">Niels</span> 🧹
            <br/>
            A Floorie Lover.
        </h1>
    ),
    2: (
        <InfoBox
            text="Game 1 is nice game that you have to play because it's very nice and all."
            link="/about"
            btnText="Learn More"
        />
    ),
    3: (
        <InfoBox
            text="Game 2 is nice game that you have to play because it's very nice and all."
            link="/projects"
            btnText="Play"
        />
    ),
    4: (
        <InfoBox
            text="Game 3 is nice game that you have to play because it's very nice and all."
            link="/contact"
            btnText="Let's Play!"
        />
    )
}

const HomeInfo = ({currentStage}) => {
    const box = boxes.find(box=>box.index === currentStage)
    const info = box.infoBox
    console.log(info);
    return info || null;
}

export default HomeInfo