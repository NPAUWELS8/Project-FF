import React, {createContext, useState } from 'react';
import { games } from 'constants/GamesConstant'


export const AppContext = createContext();

const localStorageName = "gamemap"

export const AppContextProvider = (props)=>{

    function getGames(){
        const storedGameObj = localStorage.getItem(localStorageName)
        if(storedGameObj){
            const parsedGameObj = JSON.parse(storedGameObj)
            const gameMap = new Map(Object.entries(parsedGameObj))
            return {gameMap, isFirstTime:false}
        } else{
            const gameMap = new Map();
            games.forEach(game=>{
                gameMap.set(game.title,false)
            })
    
            const obj = Object.fromEntries(gameMap);
            const json = JSON.stringify(obj);
    
            localStorage.setItem(localStorageName, json)
    
            return {gameMap, isFirstTime:true}
        }
    }
    const {gameMap, isFirstTime} = getGames();
    console.log(isFirstTime)

    const [gamesFinished, setGamesFinished] = useState(gameMap);
    const [isAfterGameComplete, setIsAfterGameComplete] = useState(false);

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

    function onGameFinished(game){
        setIsAfterGameComplete(true);

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
                onGameFinished,
                isFirstTime,
                isAfterGameComplete,
                setIsAfterGameComplete
            }}
        >
            {props.children}
        </AppContext.Provider>
    )
}
