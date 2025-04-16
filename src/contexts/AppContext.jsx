import React, {createContext, useState } from 'react';
export const AppContext = createContext();

export const AppContextProvider = (props)=>{
    const [gamesFinished, setGamesFinished] = useState([]);
    return (
        <AppContext.Provider 
            value={{
                gamesFinished,
                setGamesFinished
            }}
        >
            {props.children}
        </AppContext.Provider>
    )
}
