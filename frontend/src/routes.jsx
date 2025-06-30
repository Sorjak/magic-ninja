import { Routes, Route } from 'react-router-dom';

import NewCard from './pages/NewCard.jsx';
import EditCard from './pages/EditCard.jsx';
import Cards from './pages/Cards.jsx';
import About from './pages/About.jsx';
import Rules from './pages/Rules.jsx';
import Admin from './pages/Admin.jsx';

export default function AppRoutes() {
    return (
        <Routes>
            <Route exact path="/" element={<About />} />
            <Route exact path="/rules" element={<Rules />} />
            <Route exact path="/cards" element={<Cards />} />
            <Route exact path="/card" element={<NewCard />} />
            <Route path="/card/:cardId" element={<EditCard />} />            
            <Route exact path="/admin" element={<Admin />} />
        </Routes>
    )
}