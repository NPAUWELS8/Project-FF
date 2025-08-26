import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { HomePage, Games, Reveal, SortHouse, House, Intro } from './pages'
import Navbar from './components/Navbar';
import { AppContextProvider } from './contexts/AppContext';
import { useState } from 'react';

const App = () => {
    const [showNavBar, setShowNavBar] = useState(true);

    //TODO: See if you can find reason for app not working on safari.

    return (
        <main className="bg-slate-300/20 flex-1">
            <Router basename='/'>
                <AppContextProvider>
                    {showNavBar && <Navbar/>}
                    <Routes>
                        <Route path="/" element={<HomePage/>}/>
                        <Route path="/reveal" element={<Reveal/>}/>
                        <Route path="/games/:game" element={<Games/>}/>
                        <Route path="/sort" element={<SortHouse/>}/>
                        <Route path="/house" element={<House/>}/>
                        <Route path="/intro" element={<Intro setShowNavBar={setShowNavBar}/>}/>
                    </Routes>
                </AppContextProvider>
            </Router>
        </main>
    )
}

export default App