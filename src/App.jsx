import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { Home, About, Projects, Contact, Piano } from './pages'
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
                        <Route path="/about" element={<Piano/>} />
                        <Route path="/projects" element={<Projects/>} />
                        <Route path="/contact" element={<Contact/>} />
                    </Routes>
                </AppContextProvider>
            </Router>
        </main>
    )
}

export default App