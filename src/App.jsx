import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { HomePage, Games, Reveal, SortHouse } from './pages'
import Navbar from './components/Navbar';
import { AppContextProvider } from './contexts/AppContext';
import { useState } from 'react';

const App = () => {
    const [showNavBar, setShowNavBar] = useState(true);
    const [toIntro, setToIntro] = useState(false);

    //TODO: See if you can find reason for app not working on safari.

    return (
        <main className="bg-slate-300/20 flex-1">
            <Router basename='/'>
                <AppContextProvider>
                    {showNavBar && <Navbar setToIntro={setToIntro}/>}
                    <Routes>
                        <Route path="/" element={<HomePage setShowNavBar={setShowNavBar} toIntro={toIntro} setToIntro={setToIntro} />}/>
                        <Route path="/reveal" element={<Reveal/>}/>
                        <Route path="/games/:game" element={<Games/>}/>
                        <Route path="/sort" element={<SortHouse/>}/>
                    </Routes>
                </AppContextProvider>
            </Router>
        </main>
    )
}

export default App