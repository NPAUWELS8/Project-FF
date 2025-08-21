import React, {createContext, useState } from 'react';
import { games } from 'constants/GamesConstant'


export const AppContext = createContext();

const localStorageName = "gamemap"
const localStorageFirstTime = "firsttime";

export const AppContextProvider = (props)=>{

    function setGames(){
        const gameMap = new Map();
        games.forEach(game=>{
            gameMap.set(game.title,false)
        })

        const obj = Object.fromEntries(gameMap);
        const json = JSON.stringify(obj);

        localStorage.setItem(localStorageName, json)
        localStorage.setItem(localStorageFirstTime, true)
        

        return {gameMap, firstTime: true}
    }

    function getGames(){
        const storedGameObj = localStorage.getItem(localStorageName)
        const storedIsFirstTime = localStorage.getItem(localStorageFirstTime)

        if(storedGameObj){
            const parsedGameObj = JSON.parse(storedGameObj)
            const gameMap = new Map(Object.entries(parsedGameObj))

            return {gameMap, isFirstTime: storedIsFirstTime}
        } else{

            return setGames();
        }
    }

    const {gameMap, firstTime} = getGames();

    const [gamesFinished, setGamesFinished] = useState(gameMap);
    const [isFirstTime, setIsFirstTime] = useState(firstTime);
    const [isAfterGameComplete, setIsAfterGameComplete] = useState(false);
    const [lastGameFinished, setLastGameFinished] = useState();
    const [currentGame, setCurrentGame] = useState();
    const [isDisplayedBackButton,setIsDisplayedBackButton] = useState(true);

    function getGameFinishedCount(){
        const total = gamesFinished.size
        const count = gamesFinished.values().reduce((a,b)=>{
            if(b){
                a++
            }
            return a
        },0)

        return {count, total}
    }

    function getIsGameFinished(title){
        return gamesFinished.get(title)
    }

    function onGameFinished(game){
        setIsAfterGameComplete(true);
        setLastGameFinished(game);
        
        const newGamesFinished = new Map(gamesFinished);
        newGamesFinished.set(game, true);
        setGamesFinished(newGamesFinished);
        const obj = Object.fromEntries(newGamesFinished);
        const json = JSON.stringify(obj);

        localStorage.setItem(localStorageName, json)
    }

    return (
        <AppContext.Provider 
            value={{
                getGameFinishedCount,
                getIsGameFinished,
                onGameFinished,
                lastGameFinished,
                isFirstTime,
                setIsFirstTime,
                isAfterGameComplete,
                setIsAfterGameComplete,
                currentGame,
                setCurrentGame,
                isDisplayedBackButton,
                setIsDisplayedBackButton,
            }}
        >
            {props.children}
        </AppContext.Provider>
    )
}
