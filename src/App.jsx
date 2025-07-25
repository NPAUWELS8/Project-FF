import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { Home, Games, Reveal } from './pages'
import Navbar from './components/Navbar';
import { AppContextProvider } from './contexts/AppContext';

const App = () => {
    //TODO: delete unnecessary pages and their related jsx component(s) from the project
    return (
        <main className="bg-slate-300/20 flex-1">
            <Router basename='/Project-FF'>
                <AppContextProvider>
                    <Navbar/>
                    <Routes>
                        <Route path="/" element={<Home/>} />
                        <Route path="/reveal" element={<Reveal/>}/>
                        <Route path="/games/:game" element={<Games/>}/>
                    </Routes>
                </AppContextProvider>
            </Router>
        </main>
    )
}

export default App