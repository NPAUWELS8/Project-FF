import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { Home, About, Projects, Contact, Games, Reveal } from './pages'
import Navbar from './components/Navbar';
import { AppContextProvider } from './contexts/AppContext';

const App = () => {
    return (
        <main className="bg-slate-300/20 h-full">
            <Router basename='/Project-FF'>
                <AppContextProvider>
                    <Navbar/>
                    <Routes>
                        //TODO: delete unnecessary pages and their related jsx component(s) from the project
                        <Route path="/" element={<Home/>} />
                        <Route path="/about" element={<About/>} />
                        <Route path="/reveal" element={<Reveal/>}/>
                        <Route path="/projects" element={<Projects/>} />
                        <Route path="/contact" element={<Contact/>} />
                        <Route path="/games/:game" element={<Games/>}/>
                    </Routes>
                </AppContextProvider>
            </Router>
        </main>
    )
}

export default App