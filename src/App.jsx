import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { Home, About, Projects, Contact, Piano, Rpg, Sudoku } from './pages'
import Navbar from './components/Navbar';
import { AppContextProvider } from './contexts/AppContext';

const App = () => {
    return (
        <main className="bg-slate-300/20 h-full">
            <Router>
                <Navbar/>
                <AppContextProvider>
                    <Routes>
                        <Route path="/" element={<Home/>} />
                        <Route path="/piano" element={<Piano/>} />
                        <Route path="/about" element={<About/>} />
                        <Route path="/projects" element={<Projects/>} />
                        <Route path="/contact" element={<Contact/>} />
                        <Route path="/rpg" element={<Rpg/>}/>
                        <Route path="/sudoku" element={<Sudoku/>}/>
                    </Routes>
                </AppContextProvider>
            </Router>
        </main>
    )
}

export default App