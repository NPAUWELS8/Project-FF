import React, {createContext, useState } from 'react';
import { games } from 'constants/GamesConstant'


export const AppContext = createContext();

const localStorageName = "gamemap"

function getGames(){
    const storedGameObj = localStorage.getItem(localStorageName)
    if(storedGameObj){
        const parsedGameObj = JSON.parse(storedGameObj)
        const parsedGameMap = new Map(Object.entries(parsedGameObj))
        return parsedGameMap
    } else{
        const gameMap = new Map();
        games.forEach(game=>{
            gameMap.set(game.title,false)
        })

        const obj = Object.fromEntries(gameMap);
        const json = JSON.stringify(obj);

        localStorage.setItem(localStorageName, json)

        return gameMap
    }
}

const gameMap = getGames();

console.log(gameMap);

export const AppContextProvider = (props)=>{
    const [gamesFinished, setGamesFinished] = useState(gameMap);

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
        const newGamesFinished = gamesFinished.set(game, true);
        setGamesFinished(newGamesFinished);
        const obj = Object.fromEntries(newGamesFinished);
        const json = JSON.stringify(obj);

        localStorage.setItem(localStorageName, json)
    }

    return (
        <AppContext.Provider 
            value={{
                getGameFinishedCount,
                onGameFinished
            }}
        >
            {props.children}
        </AppContext.Provider>
    )
}
